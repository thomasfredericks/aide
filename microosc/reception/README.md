# La réception d'OSC avec MicroOsc

## Préalable(s)

- [Installation de MicroOsc](/microosc/)
- [Initialisation de MicroOsc](/microosc/initialisation/)

## Extrait de code 

```cpp
// ...OMISSION DU CODE POUR INITALISER UNE INSTANCE DE MICROOSC NOMMÉE myOsc...
// ...OMISSION DU CODE NON RELIÉ...

// FONCTION QUI SERA APPELÉE LORSQU'UN MESSAGE OSC EST REÇU :
void myOscMessageParser(MicroOscMessage& receivedOscMessage) {
   // VÉRIFICATION DE L'ADRESSE DU MESSAGE
    if (receivedOscMessage.checkOscAddress("/pot")) {
        //  EXTRACTION DES ARGUMENTS
        int32_t intArgument = receivedOscMessage.nextAsInt();
        // ...OMISSION DU CODE QUI UTILISE L'ARGUMENT EXTRAIT...
    }
}

void setup() {
    // ...OMISSION DU CODE NON RELIÉ...
}

void loop() {
    myOsc.onOscMessageReceived(myOscMessageParser);
    // ...OMISSION DU CODE NON RELIÉ...
}
```

### Explications

#### Définition d'une fonction pour la réception des messages OSC

Pour recevoir des messages OSC, vous devez d'abord créer une fonction dans l'espace *global* dans laquelle traiter les messages OSC reçus :
```cpp
// FONCTION QUI SERA APPELÉE LORSQU'UN MESSAGE OSC EST REÇU :
void myOscMessageParser(MicroOscMessage& receivedOscMessage) {
   // VÉRIFICATION DE L'ADRESSE DU MESSAGE
   // EXTRACTION DES ARGUMENTS
}
```

#### Déclenchement de la réception des messages OSC

Dans `loop()`, vous devez déclencher la réception des messages :
```cpp
myOsc.onOscMessageReceived(myOscMessageParser);
```

#### Traiter messages OSC reçus

Dans la fonction `myOscMessageParser(MicroOscMessage& receivedOscMessage)` il est possible de valider l'adresse du message et de récupérer les arguments du message. MicroOsc retourne une référence à un `MicroOscMessage` lorsqu'il reçoit un message OSC.

##### Validation de l'adresse

Valider si l'adresse OSC d'un message OSC correspond à la valeur désirée avec `bool checkOscAddress(const char* address)`.

Exemple avec un `MicroOscMessage` nommé `receivedOscMessage` :
```cpp
if (receivedOscMessage.checkOscAddress("/pot")) {
  // ...
}
```

##### Récupération des arguments d'un MicroOscMessage

Un argument de type entier (*int32*) peut être récupéré avec `int32_t nextAsInt()`.

Exemple de récupération d'un entier d'un `MicroOscMessage` nommé `receivedOscMessage` :
```cpp
    int premierArgument = receivedOscMessage.nextAsInt();
```

Exemple de récupération de trois entiers d'un `MicroOscMessage` nommé `receivedOscMessage` :
```cpp
    int premierArgument = receivedOscMessage.nextAsInt();
    int deuxiemerArgument = receivedOscMessage.nextAsInt();
    int troisiemerArgument = receivedOscMessage.nextAsInt();
```



