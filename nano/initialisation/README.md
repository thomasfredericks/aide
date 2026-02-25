# Nano : Initialisation

## PlatformIO

### Préalable(s)

- [Installer PlatformIO dans Visual Studio Code](/platformio/installation/).
- [Identifier son modèle précis de Nano](../)

### Créer un nouveau projet

Suivre les instructions pour [démarrer un nouveau projet dans PlatformIO](/platformio/nouveau_projet/). Choisir le bon modèle de plaquette :
- `Arduino Nano ATmega168` 
- `Arduino Nano ATmega328` 
- `Arduino Nano R4` 

### Contenu du fichier `platformio.ini`

Pour un `Arduino Nano ATmega328` :
```ini
[env:nanoatmega328]
platform = atmelavr
board = nanoatmega328
framework = arduino
lib_deps =
```

Pour un `Arduino Nano R4` :
```ini
[env:nano_r4]
platform = renesas-ra
board = nano_r4
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