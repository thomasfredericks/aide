# Plaquette Nano : Configuration

## Configuration pour PlatformIO

### 0. Préalable(s)

- Suivre les instructions pour [démarrer un nouveau projet dans PlatformIO](/fabrication/platformio/nouveau/). 

### 1. Contenu à ajouter au fichier `platformio.ini`

#### Pour un `Arduino Nano ATmega328`

Contenu à ajouter au fichier `platformio.ini` :

```ini
[env:nanoatmega328]
platform = atmelavr
board = nanoatmega328
framework = arduino
monitor_speed = 115200
lib_deps =
```

#### Pour un `Arduino Nano R4`

Contenu à ajouter au fichier `platformio.ini` :

```ini
[env:nano_r4]
platform = renesas-ra
board = nano_r4
framework = arduino
monitor_speed = 115200
lib_deps =
```


- Un modèle pour `Arduino Nano R4` est disponible ici : [thomasofredericks/modele_platformio_nano_r4: Modèle de projet PlatformIO pour un Arduino Nano R4 - Codeberg.org](https://codeberg.org/thomasofredericks/modele_platformio_nano_r4)