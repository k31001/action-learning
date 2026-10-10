# 삼성 데이터센터 SSD 제품 이미지 (형태 재현)

작업 환경에서 삼성 반도체 공식 이미지 호스트 접근이 막혀 있어(2026-10-10), 폼팩터 치수(U.2 · E3.S · E1.S · HHHL)를 따라 3D로 재현한 이미지다. **실물 사진이 아니다.** 덱 출처 줄에 "제품 이미지는 형태 재현"을 표기한다.

- 생성: `cd ../../scripts/render_parts && npm i && node render.mjs ../../assets/products drives ../../assets/products/products.json`
- 목록 · 라벨: `products.json` (id · 폼팩터 · 모델명 · 라벨 두 줄)
- 공식 제품 사진(배경 제거 PNG)을 같은 파일명으로 넣으면 덱 생성기가 그대로 쓴다.
- 모델 사양 근거: `sources/articles/ai-inference-ssd-requirements-samsung-lineup-2026-10.md` §B
