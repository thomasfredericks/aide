# MicroOsc *SLIP* : Initialisation

> [!NOTE]
> Suivre les instructions générales [d'initialisation de MicroOsc](../) au préalable avant de poursuivre ici !

## Dans l'espace global

```cpp
#include <MicroOscSlip.h>
// Le nombre 128 entre les < > ci-dessous est le nombre maximal d'octets réservés pour les messages entrants.
// Les messages sortants sont écrits directement sur la sortie et ne nécessitent pas de réservation d'octets supplémentaires.
MicroOscSlip<128> monOsc(&Serial);
```

![](./microosc_initialisation.drawio.png)

## Dans `setup()`

Dans `setup()`, n'oubliez pas de démarrer la communication série :
```cpp
  Serial.begin(115200);
```

> [!IMPORTANT] 
> Il ne faut plus utiliser les envois ASCII `Serial.print()` ou `Serial.println()` quand on utilise **OSC SLIP** parce que les messages **ASCII** vont corrompre le flux de données **OSC SLIP** 

