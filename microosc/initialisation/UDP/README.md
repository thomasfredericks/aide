# MicroOsc *UDP* : Initialisation

> [!NOTE]
> Suivre les instructions générales [d'initialisation de MicroOsc](../) au préalable avant de poursuivre ici !

## Dans l'espace global

Initialisez les détails du réseau :
```cpp
unsigned int myReceptionPort = 8001;
IPAddress myDestinationIp(192, 168, 1, 210); 
unsigned int myDestinationPort = 8000;
EthernetUDP myUdp;
```

Initialisez et inclure MicroOsc :
```cpp
#include <MicroOscUdp.h>
// Le nombre 1024 entre les < > ci-dessous est le nombre maximal d'octets réservés pour les messages entrants.
// Les messages sortants sont écrits directement sur la sortie et ne nécessitent pas de réservation d'octets supplémentaires.
MicroOscUdp<1024> monOsc(&myUdp, myDestinationIp, myDestinationPort);
```

## Dans `setup()`

Initialiser l'UDP :
```cpp
myUdp.begin(myReceptionPort);
```

## Dans `setup()` ou `loop()`

La destination peut optionnellement être modifiée en cours d'exécution :
```cpp
monOsc.setDestination(myDestinationIp , myDestinationPort);
```
