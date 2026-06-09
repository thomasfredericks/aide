# Plaquette Nano : Configuration

## PlatformIO

### Préalable(s)

- [Installer PlatformIO dans Visual Studio Code](../../platformio/installation/).
- Suivre les instructions pour [démarrer un nouveau projet dans PlatformIO](../../platformio/nouveau/). 

### Contenu à ajouter au fichier `platformio.ini`

Pour un `Arduino Nano ATmega328` :
```ini
[env:nanoatmega328]
platform = atmelavr
board = nanoatmega328
framework = arduino
monitor_speed = 115200
lib_deps =
```

Pour un `Arduino Nano R4` :
```ini
[env:nano_r4]
platform = renesas-ra
board = nano_r4
framework = arduino
monitor_speed = 115200
lib_deps =
```

## Modèle de projet pour PlatformIO

- Un modèle pour `Arduino Nano R4` est disponible ici : [thomasofredericks/modele_platformio_nano_r4: Modèle de projet PlatformIO pour un Arduino Nano R4 - Codeberg.org](https://codeberg.org/thomasofredericks/modele_platformio_nano_r4)