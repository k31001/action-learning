# 로고 자산 (PPT 고객·파트너 타일용)

- 컬러 로고(nvidia·meta·google·microsoft·aws·openai·anthropic·micron·pytorch): GitHub `gilbarbara/logos` 저장소의 SVG를 PNG(폭 900px)로 렌더한 것. 각 로고의 저작권·상표권은 해당 기업에 있으며, 사내 보고용 식별 표시(nominative use)로만 사용한다. 대외 배포 덱은 각사 브랜드 가이드의 공식 로고로 교체한다.
- 단색 아이콘(vllm·linux·ceph·deepseek): `simple-icons` 패키지(CC0) SVG를 잉크색(#1A1A1A)으로 렌더.
- 공식 로고를 구하지 못한 기업(VAST Data·DDN·CoreWeave·WEKA·Solidigm·Kioxia·SanDisk·SK hynix)은 생성 스크립트가 워드마크 칩(테두리 상자 + 볼드 텍스트)으로 대체한다.
- 2026-09-28 추가(samsung · sk-hynix · huawei): npm `@iconify-json/logos`(gilbarbara/logos, CC0)의 samsung · sk-hynix와 `@iconify-json/simple-icons`(CC0)의 huawei(잉크색)를 headless Chromium으로 PNG 렌더(`scripts/render_parts/render.mjs logos`). 사내 보고용 식별 표시.
- 2026-10-07 추가(alibabacloud · baidu · bytedance): npm `@iconify-json/simple-icons`(CC0) 심볼을 잉크색(#1A1A1A)으로 headless Chromium PNG 렌더. 심볼만 있는 로고라 슬라이드에서는 회사 이름 글자와 함께 쓴다. Tencent는 simple-icons에 기업 심볼이 없어 쓰지 않았다. 사내 보고용 식별 표시.
