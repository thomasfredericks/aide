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

À noter que l'on veut récupérer les messages OSC le plus rapidement possible. Il fait ainsi éviter d'utiliser un `delay()` dans `loop()`. 

Dans cet extrait de code, nous utilisons un `delay()` pour ralentir la vitesse de la boucle ce qui va aussi ralentir la réception des messages OSC :
```cpp
void loop() {
    myOsc.onOscMessageReceived(myOscMessageParser);

    // ... ici, tout le code est ralenti, onOscMessageReceived() inclu

    delay(20);
}
```

Dans cet extrait, le `delay()` a été remplacé par un [algorithme d'intervalle ](/arduino/millis/intervalle/) :
```cpp
unsigned long monChronoDepart ; // À DÉPLACER au début du code avec les autres variables globales

void loop() {

    myOsc.onOscMessageReceived(myOscMessageParser);
    // onOscMessageReceived() n'est pas ralenti

    if ( millis() - monChronoDepart >= 20 ) { 
      monChronoDepart = millis(); 
      
      // ... METTRE le code ralenti ici
      // comme l'envoi des messages OSC

    }
}
```