"""FDP 배치 파라미터 민감도 시뮬레이터 (덱 보충 슬라이드 · 위키 fdp-parameter-sensitivity-simulation.md).

목적: "FDP의 효과는 SSD 쪽 파라미터(RU 크기 · RUH 수)와 고객 SW의 분류가 응용마다 함께 맞아야 난다"를
      같은 모델 위에서 수치로 보인다. 실측이 아니라 모델이다(⚠️ 시뮬레이션).

모델
- 페이지 매핑 FTL. 물리 용량 = 논리 용량 L × (1 + OP). 지움 단위 = RU(R 페이지).
- 호스트는 응용의 "수명 등급"마다 객체를 쓴다. 등급 c = (용량 몫, 쓰기 몫, 객체 크기 U, 교체 방식).
  교체 방식 fifo = 오래된 객체부터 덮어씀(로그 구조), random = 임의 객체를 덮어씀(해시 버킷 · 컴팩션 선택).
  객체를 덮어쓰면 그 객체의 페이지가 통째로 무효가 된다(TRIM과 같은 효과).
- FDP: 등급 → 배치 핸들(RUH). 핸들마다 열린 RU가 따로 있다. 핸들이 등급보다 적으면 수명이 가까운 등급끼리 묶는다.
  오분류율 m: 객체 쓰기의 m 비율이 엉뚱한 핸들로 간다(고객 SW의 분류 품질).
- GC: 빈 RU가 예비치 아래로 내려가면 유효 페이지가 가장 적은 닫힌 RU를 고른다(greedy).
  유효 페이지는 같은 핸들의 GC 전용 RU로 옮긴다(persistently isolated).
- WAF = (호스트 기록 + GC 이동) ÷ 호스트 기록, 정상 상태 구간에서 측정.

사용: .venv/bin/python scripts/fdp_waf_sim.py  → outputs/presentation/assets/fdp_waf_sim.json
"""
import json
import os
import random
import sys
import time

import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "outputs", "presentation", "assets", "fdp_waf_sim.json")

# ---- 응용 모델: (이름, 용량 몫, 쓰기 몫, 객체 크기(페이지), 교체 방식)
APPS = {
    "cache": {
        "label": "플래시 캐시 (CacheLib형)",
        "classes": [("작은 객체", 0.05, 0.40, 1, "random"),
                    ("큰 객체", 0.95, 0.60, 16, "fifo")],
    },
    "lsm": {
        "label": "LSM DB (RocksDB형)",
        "classes": [("L0", 0.005, 0.25, 16, "fifo"),
                    ("L1", 0.045, 0.25, 16, "random"),
                    ("L2", 0.20, 0.25, 16, "random"),
                    ("L3", 0.75, 0.25, 16, "random")],
    },
    "kv": {
        "label": "KV 캐시 오프로드",
        "classes": [("인덱스", 0.02, 0.10, 1, "random"),
                    ("KV 블록", 0.98, 0.90, 64, "random")],
    },
    "tenant": {
        "label": "멀티테넌트 (8 등급)",
        "classes": [(f"T{k}", sh, 0.125, 4, "random")
                    for k, sh in enumerate([0.005, 0.01, 0.02, 0.04, 0.08, 0.15, 0.25, 0.445])],
    },
}


def lifetime_order(classes):
    """수명(용량 몫 ÷ 쓰기 몫) 짧은 순서의 등급 인덱스."""
    return sorted(range(len(classes)), key=lambda c: classes[c][1] / classes[c][2])


def group_handles(classes, n_handles):
    """핸들이 등급보다 적으면 수명이 가까운 등급끼리 연속 묶음으로 나눈다."""
    order = lifetime_order(classes)
    n = len(order)
    h_of = [0] * n
    for rank, c in enumerate(order):
        h_of[c] = min(n_handles - 1, rank * n_handles // n)
    return h_of


def simulate(app, R=16, op=0.12, n_handles=None, mis=0.0, L=32768, warm=3, meas=4, seed=1, reserve=None):
    rng = random.Random(seed)
    classes = APPS[app]["classes"]
    nc = len(classes)
    if n_handles is None:
        n_handles = nc
    h_of = group_handles(classes, n_handles)

    # 등급별 LBA 영역 · 객체 슬롯
    base, slots, U = [], [], []
    acc = 0
    for (_, share, _, u, _) in classes:
        k = max(1, int(L * share) // u)
        base.append(acc)
        slots.append(k)
        U.append(u)
        acc += k * u
    Lr = acc
    n_ru = int(Lr * (1 + op)) // R
    if reserve is None:
        reserve = 2
    lba_ru = [-1] * Lr
    lba_slot = [0] * Lr
    ru_valid = np.zeros(n_ru, dtype=np.int64)
    ru_state = np.zeros(n_ru, dtype=np.int8)      # 0 빈, 1 열림, 2 닫힘
    ru_lbas = [[] for _ in range(n_ru)]
    ru_handle = [0] * n_ru
    free = list(range(n_ru))
    free.reverse()
    open_host = [-1] * n_handles
    open_gc = [-1] * n_handles
    stats = {"host": 0, "gc": 0}
    big = np.int64(1 << 40)

    def take(h):
        r = free.pop()
        ru_state[r] = 1
        ru_lbas[r] = []
        ru_valid[r] = 0
        ru_handle[r] = h
        return r

    def invalidate(lba):
        r = lba_ru[lba]
        if r >= 0:
            ru_valid[r] -= 1
            lba_ru[lba] = -1

    def place(lba, r):
        lst = ru_lbas[r]
        lba_ru[lba] = r
        lba_slot[lba] = len(lst)
        lst.append(lba)
        ru_valid[r] += 1
        if len(lst) == R:
            ru_state[r] = 2

    def gc():
        while len(free) < reserve:
            masked = np.where(ru_state == 2, ru_valid, big)
            v = int(masked.argmin())
            if masked[v] >= R:
                raise RuntimeError("GC 불가: OP 부족")
            h = ru_handle[v]
            for idx, lba in enumerate(ru_lbas[v]):
                if lba_ru[lba] == v and lba_slot[lba] == idx:
                    g = open_gc[h]
                    if g < 0 or ru_state[g] == 2:
                        g = take(h)
                        open_gc[h] = g
                    ru_valid[v] -= 1
                    place(lba, g)
                    stats["gc"] += 1
            ru_state[v] = 0
            ru_valid[v] = 0
            ru_lbas[v] = []
            free.append(v)

    def host_write(lba, h):
        r = open_host[h]
        if r < 0 or ru_state[r] == 2:
            if len(free) <= reserve:
                gc()
            r = take(h)
            open_host[h] = r
        invalidate(lba)
        place(lba, r)
        stats["host"] += 1
        if len(free) < reserve:
            gc()

    # 동시 쓰기: 등급마다 쓰는 중인 객체가 하나씩 있고, 페이지 단위로 등급이 번갈아 들어온다(쓰기 몫 비례).
    # FDP가 없으면 한 RU에 여러 등급의 페이지가 섞이고, 핸들이 등급별이면 RU 안의 객체가 연속으로 놓인다.
    cum = np.cumsum([classes[c][2] for c in range(nc)]).tolist()
    cum[-1] = 1.0
    fifo_ptr = [0] * nc
    act_k = [-1] * nc      # 쓰는 중인 객체 슬롯
    act_i = [0] * nc       # 그 객체에서 다음에 쓸 페이지
    act_h = [0] * nc       # 그 객체가 가는 핸들(오분류 반영)

    def start_object(c, k):
        h = h_of[c]
        if mis > 0 and n_handles > 1 and rng.random() < mis:
            h = rng.choice([x for x in range(n_handles) if x != h_of[c]])
        b = base[c] + k * U[c]
        for i in range(U[c]):
            invalidate(b + i)      # 덮어쓰기 = 옛 객체 통째로 무효
        act_k[c], act_i[c], act_h[c] = k, 0, h

    def next_slot(c):
        if classes[c][4] == "fifo":
            k = fifo_ptr[c]
            fifo_ptr[c] = (k + 1) % slots[c]
            return k
        return rng.randrange(slots[c])

    def write_page(c):
        if act_k[c] < 0:
            start_object(c, next_slot(c))
        host_write(base[c] + act_k[c] * U[c] + act_i[c], act_h[c])
        act_i[c] += 1
        if act_i[c] == U[c]:
            act_k[c] = -1

    def pick():
        x = rng.random()
        c = 0
        while cum[c] < x:
            c += 1
        return c

    # 채우기: 등급마다 슬롯을 차례로 한 번씩, 페이지 단위로 섞어 쓴다
    fill_left = [slots[c] for c in range(nc)]
    fill_next = [0] * nc
    while any(fill_left) or any(k >= 0 for k in act_k):
        c = pick()
        if act_k[c] < 0:
            if fill_left[c] == 0:
                c = next((x for x in range(nc) if fill_left[x] or act_k[x] >= 0), None)
                if c is None:
                    break
                if act_k[c] < 0 and fill_left[c] == 0:
                    continue
            if act_k[c] < 0:
                start_object(c, fill_next[c])
                fill_next[c] += 1
                fill_left[c] -= 1
        write_page(c)

    def run(pages):
        start = stats["host"]
        while stats["host"] - start < pages:
            write_page(pick())

    run(warm * Lr)
    stats["host"] = 0
    stats["gc"] = 0
    run(meas * Lr)
    return (stats["host"] + stats["gc"]) / stats["host"]


def main():
    t0 = time.time()
    res = {"model": {"L_pages": 32768, "op": 0.12, "warm_x": 3, "meas_x": 4, "gc": "greedy, persistently isolated",
                     "apps": {k: {"label": v["label"], "classes": v["classes"]} for k, v in APPS.items()}},
           "baseline": {}, "ru_size": {}, "ruh_count": {}, "misclass": {}}
    # 기준: FDP 없음(핸들 1) 대 FDP(등급 수만큼), RU 16
    for app in APPS:
        res["baseline"][app] = {"no_fdp": round(simulate(app, R=16, n_handles=1), 3),
                                "fdp": round(simulate(app, R=16), 3)}
        print("baseline", app, res["baseline"][app], f"{time.time() - t0:.0f}s", flush=True)
    # ① RU 크기: 삭제 단위(객체 크기)가 다른 두 응용
    RU_LIST = [4, 8, 16, 32, 64, 128, 256]
    for app in ("lsm", "kv"):
        res["ru_size"][app] = {str(R): round(simulate(app, R=R, L=65536 if R >= 128 else 32768), 3) for R in RU_LIST}
        print("ru_size", app, res["ru_size"][app], f"{time.time() - t0:.0f}s", flush=True)
    # ② RUH 수: 수명 등급 수가 다른 세 응용
    for app in ("cache", "lsm", "tenant"):
        res["ruh_count"][app] = {str(h): round(simulate(app, R=4, n_handles=h), 3) for h in (1, 2, 4, 8)}
        print("ruh_count", app, res["ruh_count"][app], f"{time.time() - t0:.0f}s", flush=True)
    # ③ 오분류율: 고객 SW의 분류 품질
    for app in ("cache", "lsm"):
        R = 16 if app == "cache" else 16
        res["misclass"][app] = {str(m): round(simulate(app, R=R, mis=m / 100), 3) for m in (0, 5, 10, 20, 40)}
        print("misclass", app, res["misclass"][app], f"{time.time() - t0:.0f}s", flush=True)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(res, f, ensure_ascii=False, indent=1)
    print("저장:", OUT, f"{time.time() - t0:.0f}s")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "quick":
        for app in APPS:
            t = time.time()
            print(app, round(simulate(app, R=16, n_handles=1, L=8192), 3), round(simulate(app, R=16, L=8192), 3), f"{time.time() - t:.1f}s")
    else:
        main()
