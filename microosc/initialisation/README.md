# Initialisation de MicroOsc


## Installation

### Arduino IDE

- Télécharger la bibliothèque MicroOsc dans le gestionnaire de bibliothèques d'Arduino.

## OSC SLIP ou UDP

Il existe actuellement deux protocoles de transport pris en charge : Serial (avec SLIP) et UDP (Ethernet ou WiFi). Les deux versions sont identiques, sauf pour leur initialisation.


## OSC SLIP

```cpp
#include <MicroOscSlip.h>
// Le nombre 128 entre les < > ci-dessous est le nombre maximal d'octets réservés pour les messages entrants.
// Les messages sortants sont écrits directement sur la sortie et ne nécessitent pas de réservation d'octets supplémentaires.
MicroOscSlip<128> myOsc(&Serial);
```

Dans `setup()`, n'oubliez pas de démarrer la communication série :
```cpp
  Serial.begin(115200);
```

## OSC UDP

Initialisez d'abord l'Ethernet ou le WiFi selon votre matériel:
- Atom POE : [Initialisation de l'Ethernet pour un Atom POE](/m5stack/atom/poe/)

Initialisez ensuite l'UDP :
- Atom POE : [Initialisation de l'UDP](/arduino/udp/)

Initialisez les détails du réseau :
```cpp
// L'IP de destination doit avoir les mêmes trois premiers nombres que l'IP du microcontrolleur
IPAddress myDestinationIp(192, 168, 1, 210); 
unsigned int myDestinationPort = 7777;
```

Initialisez et incluez MicroOsc :
```cpp
#include <MicroOscUdp.h>
// Le nombre 1024 entre les < > ci-dessous est le nombre maximal d'octets réservés pour les messages entrants.
// Les messages sortants sont écrits directement sur la sortie et ne nécessitent pas de réservation d'octets supplémentaires.
MicroOscUdp<1024> myOsc(&myUdp, myDestinationIp, myDestinationPort);
```


La destination peut optionnellement être modifiée en cours d'exécution :
```cpp
myOsc.setDestination(IPAddress destinationIp , unsigned int destinationPort);
```
