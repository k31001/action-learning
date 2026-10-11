#!/bin/sh
# AI 생성 실사 플레이트(Figma generate_image, gemini-3.1-flash-image, 2026-10-11) 다운로드 → public/photos/*.jpg
# Figma 링크는 생성 후 7일(2026-10-18경)까지 유효. 받은 뒤엔 저장소의 jpg 가 원본이다.
set -e
cd "$(dirname "$0")/../public/photos"
get() { curl -sSfL -o "$1.png" "https://www.figma.com/api/mcp/asset/$2.png" && ffmpeg -v error -y -i "$1.png" -vf "scale=-2:1080,crop=1920:1080" -q:v 3 "$1.jpg" && rm "$1.png"; echo "$1.jpg"; }
get wafer-frost d7fb37cf-70bc-4aa2-89c6-27ebf686d206
get cleanroom 6bb67b0a-af1d-4936-bf34-d3635f2d8a15
get seedling f49862c1-6571-424f-be31-ca9fafdc281c
get hbm-package 77c9d9ca-cca0-499a-88c1-4354d82e65b4
echo '{"photos":true}' > ../../src/assets.json
