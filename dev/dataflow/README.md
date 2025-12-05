# Idées pour un *dataflow* multimédia

## Lignes directrices

### Instanciation

- Le dataflow doit être conçu du départ en intégrant l'instanciation
- Il doit instancier des morceaux de code dynamiquement; de les créer et de les détruire à la volée. 
- Il doit par exemple pouvoir reproduire l’exemple suivant :
    - Chaque fois que l’utilisateur clique dans la fenêtre, un cercle apparaît à cet endroit et rebondit dans la fenêtre.  

### Multimédia

- Le *dataflow* doit garantir que l’audio et la vidéo restent étroitement synchronisés.

### Interface utilisateur légère et indépendante

- L’interface utilisateur de l’éditeur doit être séparée du moteur.
    - Le moteur du *dataflow* doit pouvoir fonctionner sans interface.
- Fournir un moyen d’inspecter les valeurs actuelles des paramètres et de les distinguer des valeurs initiales.

### Contrôle et paramétrage

- Utiliser un protocole largement répandu pour permettre la modification des paramètres.
    - Inclure un système intégré de *presets*.
- Tous les paramètres doivent automatiquement pouvoir être adressés par OSC par exemple.

### Partage et documentation

- Le code (également appelé « réseau ») doit pouvoir être copié dans un format lisible par un humain et partagé en Markdown (sur des forums, dans la documentation, avec une IA générative, etc.).

### Simplicité et proximité avec le langage

- Ne pas dépendre des standards actuels aux affectations inversées ou aux syntaxes mathématiques lourdes.
- Ne permettre les connexions entre nodes que lorsque les types d’entrées et de sorties sont compatibles.

## Le meilleur dataflow est *pas de dataflow*

Le meilleur dataflow est un dataflow dont les patchs sont écrits en format texte. Par exemple, voici un dataflow théorique. 

Dans un fichier _synth.file_, nous définissons un synthétiseur :
```cpp
in = MidiNote
osc = AudioOscillator
env = AudioEnvelope
out = AudioOut

on ( in )
    in.velocity -> env.trigger
    in.note -> osc.frequency

osc -> env -> out
```

Dans le fichier principal :
```cpp
synth = Instantiate(file : "synth.file" , instances : 8, mode : rotate)
note = MidiInNote
out = AudioOut

on ( note ) note -> synth.in
synth -> out
```