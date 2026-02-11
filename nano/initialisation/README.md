# Nano : Initialisation

## PlatformIO

### Préalable(s)

- [Installer PlatformIO dans Visual Studio Code](/platformio/installation/).

### Créer un nouveau projet

Suivre les instructions pour [démarrer un nouveau projet dans PlatformIO](/platformio/nouveau_projet/) tout en choisissant comme modèle de plaquette : `Arduino Nano ATmega328`.

### Contenu du fichier `platformio.ini`

```ini
[env:nanoatmega328]
platform = atmelavr
board = nanoatmega328
framework = arduino
lib_deps =
```


## Le code minimal

```cpp
// Le code minimal

#include <Arduino.h> 

void setup() {
  
}

void loop() {
 
}
```