# Configuration Nano R4 PlatformIO

- [PlatformIO : plateforme Renesas RA ](https://docs.platformio.org/en/latest/platforms/renesas-ra.html#platform-renesas-ra)
- [PlatformIO : carte Arduino Nano R4 ](https://docs.platformio.org/en/latest/boards/renesas-ra/nano_r4.html)

## Contenu à ajouter au fichier `platformio.ini`

Contenu à ajouter au fichier `platformio.ini` :

```ini
[env:nano_r4]
platform = renesas-ra
board = nano_r4
framework = arduino
monitor_speed = 115200
lib_deps =
```
