# Configuration Arduino Nano ATmega168/ATmega328 pour PlatformIO

## Contenu à ajouter au fichier `platformio.ini`

Contenu à ajouter au fichier `platformio.ini` :

```ini
[env:nanoatmega328]
platform = atmelavr
board = nanoatmega328
framework = arduino
monitor_speed = 115200
lib_deps =
```
