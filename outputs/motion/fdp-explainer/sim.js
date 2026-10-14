// KV 캐시 오프로딩 × FDP 쓰기 증폭 시뮬레이터 (⚠️ 단순화 모델 — 실측 아님)
//   NAND: 160블록 × 16페이지 = 2,560페이지, RU = 1블록. KV 티어 용량 2,350페이지(물리의 92%).
//   세션 16개가 동시에 KV 페이지를 쓴다(세션 길이 30~300페이지). 끝난 세션은 같은 슬롯의 새 세션으로 바뀐다.
//   KV 티어가 차면 가장 오래 안 쓰인 세션의 KV를 통째로 해제(TRIM)한다(LRU). 멀티턴 대화로 다시 불릴
//   세션은 재사용 여유만큼 더 오래 남는다 → 세션마다 수명이 다르다.
//   No FDP = 쓰기 스트림 1개 · FDP 8 RUH = RUH당 세션 슬롯 2개 · FDP 16 RUH = 슬롯 전용 RUH.
//   GC = 빈 블록이 예비치 아래면 유효 페이지가 가장 적은 닫힌 블록을 골라(greedy) GC 전용 블록으로 복사.
//   WAF = (호스트 쓰기 + GC 복사) ÷ 호스트 쓰기.
// 브라우저(index.html)와 node 양쪽에서 쓴다. 검증: node sim.js [끝 쓰기 수]
(function (root) {
  const P = { blocks: 160, pages: 16, cap: 2350, slots: 16, reserve: 2, lenMin: 30, lenMax: 300, reuse: 5, seed: 11 };

  function rng(seed) { // mulberry32
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  // 세션 이벤트 스트림 — 세 구성에 공통(같은 워크로드를 세 SSD에 동시에 쓴다)
  function workload(r) {
    const slots = [];
    let nextId = 0;
    const start = slot => ({ id: nextId++, slot, len: P.lenMin + Math.floor(r() * (P.lenMax - P.lenMin + 1)), done: 0 });
    for (let s = 0; s < P.slots; s++) slots.push(start(s));
    return {
      next() { // 슬롯 하나를 골라 그 세션이 1페이지 쓴다. 다 쓰면 슬롯에 새 세션.
        const s = Math.floor(r() * P.slots), cur = slots[s], ev = { slot: s, sid: cur.id };
        if (++cur.done >= cur.len) slots[s] = start(s);
        return ev;
      },
      slots,
    };
  }

  function makeSSD(nRuh) {
    const N = P.blocks, PG = P.pages;
    const slot = new Int8Array(N * PG).fill(-1);  // 페이지 → 세션 슬롯(색)
    const state = new Int8Array(N * PG);           // 0 빈칸 · 1 유효 · 2 무효
    const sidAt = new Int32Array(N * PG).fill(-1);
    const valid = new Int32Array(N), wp = new Int32Array(N);
    const erasedAt = new Int32Array(N).fill(-1e9); // GC로 지운 시각(쓰기 tick) — 화면 깜빡임용
    const erasedCopy = new Int32Array(N);          // 그때 옮긴 유효 페이지 수(0이면 통째로 무효였던 블록)
    const free = []; for (let b = N - 1; b >= 0; b--) free.push(b);
    const open = new Array(nRuh).fill(-1);
    let gcOpen = -1;
    const where = new Map(); // 세션 id → 페이지 위치 목록
    const ssd = { nRuh, slot, state, valid, wp, erasedAt, erasedCopy, host: 0, gc: 0, erase: 0 };

    const alloc = () => { const b = free.pop(); wp[b] = 0; valid[b] = 0; return b; };
    const place = (b, sid, sl) => {
      const p = b * PG + wp[b]++;
      slot[p] = sl; sidAt[p] = sid; state[p] = 1; valid[b]++;
      return p;
    };
    const isOpen = b => b === gcOpen || open.includes(b);
    function collect(tick) {
      while (free.length < P.reserve) {
        let best = -1, bv = PG;
        for (let b = 0; b < N; b++) if (wp[b] === PG && !isOpen(b) && valid[b] < bv) { bv = valid[b]; best = b; }
        if (best < 0) return false;
        erasedCopy[best] = bv;
        for (let i = 0; i < PG; i++) {
          const p = best * PG + i;
          if (state[p] === 1) {
            if (gcOpen < 0 || wp[gcOpen] === PG) gcOpen = alloc();
            const sid = sidAt[p], q = place(gcOpen, sid, slot[p]), arr = where.get(sid);
            arr[arr.indexOf(p)] = q;
            ssd.gc++;
          }
          slot[p] = -1; sidAt[p] = -1; state[p] = 0;
        }
        valid[best] = 0; wp[best] = 0; free.unshift(best); ssd.erase++; erasedAt[best] = tick;
      }
      return true;
    }
    ssd.write = (ev, tick) => {
      const h = ev.slot % nRuh;
      if (open[h] < 0 || wp[open[h]] === PG) { if (!collect(tick)) return false; open[h] = alloc(); }
      const p = place(open[h], ev.sid, ev.slot);
      if (!where.has(ev.sid)) where.set(ev.sid, []);
      where.get(ev.sid).push(p);
      ssd.host++;
      return true;
    };
    ssd.trim = sid => {
      for (const p of where.get(sid) || []) if (state[p] === 1) { state[p] = 2; valid[(p / PG) | 0]--; }
      where.delete(sid);
    };
    return ssd;
  }

  // 세 구성을 같은 워크로드로 함께 돌린다. step(n) = 호스트 쓰기 n회.
  function create() {
    const r = rng(P.seed), rb = rng(P.seed * 7919 + 1);
    const wl = workload(r);
    const ssds = [makeSSD(1), makeSSD(8), makeSSD(16)];
    const size = new Map(), last = new Map(), bonus = new Map(), live = [];
    const hist = []; // 쓰기 50회마다 [tick, gc×3]
    let used = 0, tick = 0;
    const key = id => last.get(id) + bonus.get(id);
    function evict() {
      let bi = 0; for (let i = 1; i < live.length; i++) if (key(live[i]) < key(live[bi])) bi = i;
      const old = live.splice(bi, 1)[0];
      used -= size.get(old); size.delete(old); last.delete(old); bonus.delete(old);
      for (const s of ssds) s.trim(old);
    }
    const sim = {
      P, ssds, hist, forced: 0,
      get used() { return used; }, get tick() { return tick; },
      step(n) {
        for (let k = 0; k < n; k++) {
          const ev = wl.next();
          if (!size.has(ev.sid)) {
            size.set(ev.sid, 0); live.push(ev.sid);
            bonus.set(ev.sid, Math.floor(rb() * rb() * P.reuse * P.cap)); // 재사용 여유(대부분 짧고 일부만 길다)
          }
          while (used >= P.cap) evict();
          // 열린 RU가 많아 GC로 빈 블록을 못 만들면 KV 티어가 세션 하나를 더 해제한다(드묾, forced로 집계)
          for (const s of ssds) while (!s.write(ev, tick)) { evict(); sim.forced++; }
          size.set(ev.sid, size.get(ev.sid) + 1); last.set(ev.sid, tick); used++; tick++;
          if (tick % 50 === 0) hist.push([tick, ...ssds.map(s => s.gc)]);
        }
      },
      slots: () => wl.slots,
      // 최근 window회 쓰기 구간의 WAF
      recentWaf(i, window) {
        let j = hist.length - 1; while (j > 0 && hist[j][0] > tick - window) j--;
        const h0 = hist[j] || [0, 0, 0, 0], dh = tick - h0[0];
        return dh > 0 ? 1 + (ssds[i].gc - h0[i + 1]) / dh : 1;
      },
    };
    return sim;
  }

  const api = { create, P };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.FDPSIM = api;

  if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
    const WARM = 4600, END = Number(process.argv[2] || 10500);
    const sim = create();
    sim.step(WARM);
    const g0 = sim.ssds.map(s => s.gc);
    sim.step(END - WARM);
    const n = END - WARM;
    console.log(JSON.stringify({ forced: sim.forced, host: n, gc: sim.ssds.map((s, i) => s.gc - g0[i]),
      waf: sim.ssds.map((s, i) => +(1 + (s.gc - g0[i]) / n).toFixed(3)) }));
  }
})(typeof window !== 'undefined' ? window : globalThis);
