# La réception d'OSC avec MicroOsc

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

## Utiliser une fonction personnalisée pour traiter la réception des messages OSC

### 1) Dans _loop()_, demander à MicroOsc de traiter l'OSC avec la fonction personnalisée 

Dans _loop()_ nous indiquons à MicroOsc d'appeler la fonction _maReceptionMessageOsc()_ (que nous allons créer à l'étape prochaine) lorsqu'un message OSC est reçu :
```cpp
monOsc.onOscMessageReceived(maReceptionMessageOsc);
```

### 2) Créer une fonction dans _l'espace global_

```cpp
void maReceptionMessageOsc(MicroOscMessage& oscMessage) {
  // TRAITER LES DONNÉES REÇUES ICI
}
```
#### Exemples de traitement des données reçues

Mettre le code suivant dans _maReceptionMessageOsc()_ pour traiter l'adresse "/adresse" et récupérer 1 argument _int_:
```cpp
    if (oscMessage.checkOscAddress("/adresse")) {
        int argument = oscMessage.nextAsInt();
        // FAIRE QQCH AVEC argument ICI
    } 
```

Mettre le code suivant dans _maReceptionMessageOsc()_ pour traiter l'adresse "/adresse" et récupérer 3 arguments _int_:
```cpp
    if (oscMessage.checkOscAddress("/adresse")) {
        int premierArgument = oscMessage.nextAsInt();
        int deuxiemerArgument = oscMessage.nextAsInt();
        int troisiemerArgument = oscMessage.nextAsInt();
        // FAIRE QQCH AVEC les arguments ICI
    } 
``` 

Mettre le code suivant dans _maReceptionMessageOsc()_ pour traiter l'adresse "/adresse" et l'adresse "/autre":
```cpp
    if (oscMessage.checkOscAddress("/adresse")) {
        int argument = oscMessage.nextAsInt();
        // FAIRE QQCH AVEC argument ICI
    }  else if (oscMessage.checkOscAddress("/autre")) {
        int argument = oscMessage.nextAsInt();
        // FAIRE QQCH AVEC argument ICI
    }   
```


