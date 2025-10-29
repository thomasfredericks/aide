# Audiovisuel : Compression

Dans un souci de moralité écologique, nous voulons que nos fichiers audiovisuels soient le plus compressés sans trop d'impact sur le matériel.

## Conversion pour un poids cible

### Calcul du débit en *kbps* en fonction d'un poids cible

Formule pour la conversion de MB en octets :
```bash
poids_en_octets = poids_en_mb  × 1024 × 1024 
```
Par exemple, pour un poids cible de `100 MB`, le `poids_en_octets` est de `100 × 1024 × 1024 octets` = `104 857 600`.

Formule pour la conversion de `poids_en_octets` et du `duree_secondes` en kbps :
```bash
kbps  = (poids_en_octets * 8) / duree_secondes / 1000
```

### Conversion avec FFMPEG :

Windows : 
```powershell
ffmpeg -y -i "$input" -c:v libx264 -b:v ${videoBitrate}k -pass 1 -an -f mp4 NUL
ffmpeg -y -i "$input" -c:v libx264 -b:v ${videoBitrate}k -pass 2 -c:a aac -b:a ${audioKbps}k "$output"
```

Linux/macOS :
```bash
ffmpeg -i input.mp4 -c:v libx264 -b:v 2670k -pass 1 -an -f mp4 /dev/null && \
ffmpeg -i input.mp4 -c:v libx264 -b:v 2670k -pass 2 -c:a aac -b:a 128k output.mp4
```