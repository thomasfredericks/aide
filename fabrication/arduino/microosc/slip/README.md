# MicroOsc SLIP

<!-- toc -->

## Installation

### Arduino IDE

Télécharger la bibliothèque logicielle `MicroOsc` dans le gestionnaire de bibliothèques d’Arduino.

### PlatformIO

Ajouter la ligne suivante à `lib_deps` dans `platformio.ini` :
```ini
lib_deps =
    https://github.com/thomasfredericks/MicroOsc.git
```

## Intégration 

### Dans l’espace global

```cpp
#include <MicroOscSlip.h>
MicroOscSlip<128> monOsc(&Serial); 
```

![](./microosc_initialisation.drawio.png)

### Dans `setup()`

Dans `setup()`, n’oubliez pas de démarrer la communication série :
```cpp
  Serial.begin(115200);
```

> [!WARNING] 
> Il ne faut plus utiliser les envois ASCII `Serial.print()` ou `Serial.println()` quand on utilise **OSC SLIP** parce que les messages **ASCII** vont corrompre le flux de données **OSC SLIP** 

## Envoi


`MicroOsc` permet d’envoyer plusieurs types de données à un destinataire OSC. La plus utilisée est :  

- **`int`** : entier qui est toujours 32 bits signés (`int32_t`) en OSC.  

Pour envoyer une donnée, il suffit d’utiliser la méthode qui correspond au type de la donnée. Pour un entier, on utilise : 
```cpp
monOsc.sendInt(adresse, valeur);
```

Les arguments de `sendInt()` sont :
- `adresse` : une chaîne de caractères (`const char *`) comme `"/but0"`, `"/apha"` ou `"/beta"` qui défini l’adresse OSC du message.
- `valeur` : un entier (`int32_t`) qui est la valeur à envoyer.

![](microosc_sendInt.drawio.png)

Par exemple, pour envoyer la valeur de la variable `maVariable` à l’adresse OSC `/alpha` :
```cpp
monOsc.sendInt( "/alpha" , maVariable);
```

Un autre exemple qui envoie la valeur de la variable `maLectureAnalogique` à l’adresse OSC `/beta` :
```cpp
monOsc.sendInt( "/beta" , maLectureAnalogique);
```

## Tutoriels

- [Tutoriel Pd MicroOsc SLIP : Envoi d’OSC SLIP d’un Arduino Nano avec un bouton d’arcade vers Pd](/tutoriels/arcade/pd/)
- [Tutoriel relais MicroOsc : Envoi d’OSC SLIP d’un Arduino Nano avec un bouton d’arcade vers OSC UDP](/tutoriels/arcade/relais/)