# 실물 사진 교체 폴더

`generate_ssd_survival_pptx.py`는 부품 이미지를 이 폴더에서 먼저 찾는다. 같은 이름의 파일(`nand`, `dram`, `hbm`, `ssd`, `server` + `.png`/`.jpg`)을 넣고 스크립트를 다시 돌리면 그 사진이 덱에 들어간다.

- 없으면 `../survival/render_*.png`(3D 렌더, `scripts/render_parts/`로 생성)를 쓴다.
- 권장: 삼성 반도체 공식 제품 이미지(배경 제거 PNG). 사진은 배경이 흰색이거나 투명해야 슬라이드 배경과 이어진다.
- 작업 환경에서 외부 이미지 호스트 접근이 막혀 있어 2026-09-28 기준 덱은 3D 렌더로 만들었다.

## 들어 있는 사진

| 파일 | 쓰는 곳 | 출처 |
|---|---|---|
| `bonding.jpg` | `generate_uncertainty_3c_pptx.py` 전략 1(Bonding 기반 DRAM · NAND 통합 제조) | Samsung Semiconductor 뉴스룸 "Samsung Unveils Next-Gen 3D-Memory Vision at FMS 2026"(2026-08-05) 기사 사진 `1604x900-article-06.png`의 V10 Bonding V-NAND 전시 모형 부분을 잘라 냄. 삼성 공식 보도 이미지라 사내 덱 용도로 쓰고, 대외 배포 전에는 원본 사용 조건을 확인한다 |
