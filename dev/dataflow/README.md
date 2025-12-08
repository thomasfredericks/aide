# Idées pour un *dataflow* multimédia



## Encapsulation et instanciation

- Le *dataflow* doit être conçu du départ en intégrant l'instanciation et l'encapsulation.
- Il doit instancier des morceaux de code dynamiquement ; de les créer et de les détruire à la volée. 
- Il doit par exemple pouvoir reproduire l’exemple suivant :
    - Chaque fois que l’utilisateur clique dans la fenêtre, un cercle apparaît à cet endroit et rebondit dans la fenêtre.  

## Multimédia

- Le *dataflow* doit garantir que l’audio et la vidéo restent étroitement synchronisés.

## Interface utilisateur légère et indépendante

- L’interface utilisateur de l’éditeur doit être séparée du moteur.
    - Le moteur du *dataflow* doit pouvoir fonctionner sans interface.
- Fournir un moyen d’inspecter les valeurs actuelles des paramètres et de les distinguer des valeurs initiales.

## Contrôle et paramétrage

- Utiliser un protocole largement répandu pour permettre la modification des paramètres.
- Inclure un système intégré de *presets*.
- Tous les paramètres doivent automatiquement pouvoir être adressés par OSC par exemple.


## Partage et documentation
- Le code (également appelé « réseau ») doit pouvoir être copié dans un format lisible par un humain et partagé en Markdown (sur des forums, dans la documentation, avec une IA générative, etc.).
    - Lorsque que partagé, les caractères invisibles (tabulations et espaces) ne doivent pas avoir d'impact sur le code (éviter une organisation structurelle comme Python).


## Simplicité et proximité avec le langage
- Ne pas dépendre des standards actuels aux affectations inversées ou aux syntaxes mathématiques lourdes.
- Ne permettre les connexions entre nodes que lorsque les types d’entrées et de sorties sont compatibles.

## La facilité d'un dataflow réside dans son inspecteur

Un inspecteur permet d'afficher plusieurs informations importantes :
- La liste de nodes, actuels et possibles.
- Les paramètres d'un node sélectionné :
    - Les valeurs des paramètres de node au démarrage.
    - Les valeurs actuelles des paramètres des nodes.

**Exemple :**  
- On crée un réseau simple : `oscillator -> out`.
- En cliquant sur le mot `oscillator` l'inspecteur affiche les paramètres de l'oscillateur et permet leur modification :
    - frequency : Hz 
    - shape : SIN, SQUARE, TRIANGLE, ...

## Restauration de l'état

Dans un réseau nodal, modifier la structure du réseau ne doit pas réinitialiser son état d'exécution. Contrairement à un langage interprété ou compilé, l'exécution ne repart pas automatiquement depuis l'état initial lorsque le réseau change.

Pour gérer cela, on distingue deux types d'état :  
- **État initial** : défini à l'ouverture du réseau.  
- **État courant** : reflète les valeurs actuelles pendant l'exécution.

**Exemple :**  
- On crée un réseau simple : `oscillator -> out`. L'oscillateur démarre à une fréquence de 440 Hz et envoie le signal vers la sortie audio.  
- Pendant l'exécution, on change la fréquence de l'oscillateur à 600 Hz via l'inspecteur.  
- Si l'on modifie ensuite le réseau en ajoutant un filtre, par exemple `oscillator -> filtre -> out`, **l'oscillateur conserve sa fréquence actuelle de 600 Hz**. Il ne revient pas à sa valeur initiale de 440 Hz.


## Le meilleur dataflow est *pas de dataflow* ?

Le meilleur dataflow est un dataflow dont les patchs sont écrits en format texte. Par exemple, voici un dataflow théorique. 

Dans un fichier _synth.file_, nous définissons un synthétiseur :
```cpp
in = MidiNote
osc = AudioOscillator
env = AudioEnvelope
out = AudioOut

osc -> env -> out

ON in  {
    in.velocity -> env.trigger
    in.note -> osc.frequency
}

ON env.done  {
    FREE
}

```

Dans le fichier principal :
```cpp
synth = LOAD "synth.file"
note = MidiInNote
out = AudioOut

SCENE start :

ON note {
    note -> synth.in
}

synth -> out
```

