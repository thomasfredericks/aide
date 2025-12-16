# Initialisation de MicroOsc

## Installation

### Arduino IDE

Télécharger la bibliothèque `MicroOsc` dans le gestionnaire de bibliothèques d'Arduino.

### PlatformIO

Ajouter la ligne suivante à `lib_deps` dans `platformio.ini` :
```ini
lib_deps =
    https://github.com/thomasfredericks/MicroOsc.git
```

## OSC SLIP ou UDP

`MicroOsc` prend actuellement en charge deux protocoles de transport : Serial (avec SLIP) et UDP (Ethernet ou WiFi). Les deux versions utilisent un API identique, sauf pour leur initialisation.

* [Inititalisation OSC SLIP](./SLIP/)
* [Inititalisation OSC UDP](./UDP/)

