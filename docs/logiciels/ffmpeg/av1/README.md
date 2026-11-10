# Codec AV1 avec FFmpeg

```bash
INPUT="input.mp4"
OUTPUT="output.webm"
CRF=30
PRESET=6
ffmpeg -i "$INPUT" -c:v libsvtav1 -crf $CRF -preset $PRESET -svtav1-params tune=0 -c:a libopus -b:a 128k "$OUTPUT"
```