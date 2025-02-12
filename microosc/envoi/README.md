# L'envoi d'OSC avec MicroOsc

## Préalable(s)

- [Protocole Open Sound Control (OSC)](/osc/)

## Bibliothèque *MicroOsc*

Télécharger la bibliothèque MicroOsc dans le gestionnaire de bibliothèques d'Arduino.

## Initialisation

### Pour l'OSC SLIP

S'assurer que *MicroOsc* est inclu et instancié dans l'espace global; ici l'instance est nommée `monOsc` :
```cpp
#include <MicroOscSlip.h>
// Le 128 entre < > below est le nombre d'octets réservés à la réception de messages.
MicroOscSlip<128> monOsc(&Serial);
```

Vérifier que Serial est bien démarré dans `setup()` :
```cpp
Serial.begin(115200);
```

## Envoyer une entier par MicroOsc vers l'ordinateur

Utiliser `void sendInt(const char *address, int32_t i)` pour envouer un entier. 

Par exemple, pour envoyer la valeur de `maVariable` à l'adresse "/adresse" :
```cpp
int maVariable = 10;
monOsc.sendInt( "/adresse" , maVariable);
```
