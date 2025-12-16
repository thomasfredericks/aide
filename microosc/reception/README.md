# La réception d'OSC avec MicroOsc

## Préalable(s)

- [Initialisation de MicroOsc](/microosc/initialisation/)

## Intégration

### Dans l'espace global

Pour recevoir des messages OSC, créer une fonction dans l'espace *global* dans laquelle traiter les messages OSC reçus :
```cpp
// FONCTION QUI SERA APPELÉE LORSQU'UN N'IMPORTTE QUEL MESSAGE OSC EST REÇU
// receivedOscMessage est le message reçu
void myOscMessageParser(MicroOscMessage & receivedOscMessage) {
   // Ici, un if et receivedOscMessage.checkOscAddress() est utilisé pour traiter les différents messages
   if (receivedOscMessage.checkOscAddress("/pixel")) {  // MODIFIER /pixel pour l'adresse qui sera reçue
        int premierArgument = receivedOscMessage.nextAsInt(); // Récupérer le premier argument du message en tant que int
        int deuxiemerArgument = receivedOscMessage.nextAsInt(); // SI NÉCESSAIRE, récupérer un autre int
        int troisiemerArgument = receivedOscMessage.nextAsInt(); // SI NÉCESSAIRE, récupérer un autre int

        // UTILISER ici les arguments récupérés

    // SI NÉCESSAIRE, ajouter d'autres if pour recevoir des messages avec d'autres adresses
    } else if (receivedOscMessage.checkOscAddress("/autre")) {  // MODIFIER /autre une autre adresse qui sera reçue
        // ...
    }
}
```

### Dans loop()

Dans `loop()`, vous devez déclencher la réception des messages :
```cpp
myOsc.onOscMessageReceived(myOscMessageParser);
```

Un `delay()` est souvent utilisé pour ralentir l'exécution de la boucle `loop()`. Cela a cependant pour effet de ralentir tout le code.

À noter que l'on veut récupérer les messages OSC le plus rapidement possible. Il fait ainsi éviter d'utiliser un `delay()` dans `loop()`. 

S'il est nécessaire de ralentir des bouts, de code, remplacer `delay()` par un **chronomètre** de la bibliothèque [SofaPirate/Chrono](https://github.com/SofaPirate/Chrono).

```cpp
// Dans l'espace global
#include <Chrono.h> // Ajouter la bibliothèque Chrono si ce n’est pas déjà fait
Chrono monChrono; // Chronomètre 

void loop() {
    // La fonction onOscMessageReceived() va s'exécuter très rapidement
    myOsc.onOscMessageReceived(myOscMessageParser);

    if ( monChrono.hasPassed(20) ) {
        monChron.restart();
        // Le code ici ne va s'exécuter plus lentement à chaque 20 millisecondes
    }
}
```
