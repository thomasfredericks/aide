# Atom (Lite) et PlatformIO

## Configuration de `platformio.ini`

Le fichier `platformio.ini` doit être modifié ainsi :
- Pointer la ligne `platform =` vers la plateforme `espressif32` officielle (informations complémentaires [ici](/fabrication/platformio/pioarduino/espressif32/)).

```ini
[env:m5stack-atom]
platform = espressif32
board = m5stack-atom
framework = arduino
monitor_speed = 115200
```
