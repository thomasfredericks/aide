# La réception d'OSC avec MicroOsc

## Préalable(s)

- [Installation de MicroOsc](/microosc/)
- [Initialisation de MicroOsc](/microosc/initialisation/)

## Définition d'une fonction pour la réception des messages OSC

Pour recevoir des messages OSC, vous devez d'abord créer une fonction dans laquelle vous vérifierez l'adresse du message et récupérerez les arguments du message :
```cpp
// FONCTION QUI SERA APPELÉE LORSQU'UN MESSAGE OSC EST REÇU :
void myOscMessageParser(MicroOscMessage& receivedOscMessage) {
   // VÉRIFICATION DE L'ADRESSE DU MESSAGE ET EXTRACTION DES ARGUMENTS
}
```

## Déclenchement de la réception des messages OSC

Dans `loop()`, vous devez déclencher la réception des messages :
```cpp
myOsc.onOscMessageReceived(myOscMessageParser);
```

## Traiter messages OSC reçus

Traiter les messages OSC reçus dans la fonction `myOscMessageParser(MicroOscMessage& receivedOscMessage)` crée précédemment avec les méthodes suivantes.


## Vérification de l'adresse

```cpp
/**
* Retourne true si l'adresse correspond exactement.
*/
bool checkOscAddress(const char* address);
```

Exemple avec un `MicroOscMessage` nommé `receivedOscMessage` :
```cpp
if (receivedOscMessage.checkOscAddress("/pot")) {
  // ...
}
```


## Récupération des arguments d'un MicroOscMessage

MicroOsc retournera une référence à un `MicroOscMessage` lorsqu'il recevra un message OSC.
**Les fonctions suivantes sont des membres de `MicroOscMessage`.**

### Obtenir l'argument suivant sous forme d'**int** 32 bits

```cpp
/**
* Retourne l'argument suivant sous forme d'un int 32 bits.
* Ne vérifie pas les limites du buffer.
*/
int32_t nextAsInt();
```

Exemple avec un `MicroOscMessage` nommé `receivedOscMessage` :
```cpp
int32_t intArgument = receivedOscMessage.nextAsInt();
```

### Exemple pour récupérer trois arguments

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


