# MicroOsc

MicroOsc est une bibliothèque logicielle Open Sound Control (OSC) simple et légère pour Arduino, compatible avec les plateformes Arduino, Teensy, esp8266 et ESP32. MicroOsc peut envoyer et recevoir des messages OSC via Serial (SLIP) ou via UDP (Ethernet ou WiFi).

MicroOsc supporte les transports SLIP et UPD. Voir les pages correspondantes :
- [MicroOsc SLIP](./slip)
- [MicroOsc UDP](./udp)

Code source et documentation complète (en anglais) : [github.com/thomasfredericks/MicroOsc](https://github.com/thomasfredericks/MicroOsc)

## Installation dans PlatformIO

Ajouter la ligne suivante à `lib_deps` dans `platformio.ini` :
```ini
lib_deps =
    https://github.com/thomasfredericks/MicroOsc.git
```