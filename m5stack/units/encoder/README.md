# M5Stack Unit Encoder

## Introduction

![Photo de l'avant et l'arrière du M5Stack Unit Encoder](./unit_encoder.png)

Le [M5Stack Unit Encoder](https://docs.m5stack.com/en/unit/encoder) est un capteur de rotation infinie équipé de 2 pixels RGB.

C'est un *Unit* de type I²C tel qu'identifié par son connecteur rouge.

> [!NOTE]
> Il doit être connecté au M5Stack Grove HUB ou directement au microcontrôleur!



## Bibliothèque M5_Encoder

La bibliothèque [thomasfredericks/M5_Encoder](https://github.com/thomasfredericks/M5_Encoder) permet d'interfacer avec ce _unit_.

###  Installation

#### Dans PlatformIO

Dans le fichier **platformio.ini** ajouter à la section `lib_deps` : 

```
lib_deps =
    https://github.com/thomasfredericks/M5_Encoder.git
```

> [!WARNING]
> Il est important de respecter la disposition et l'indentation de la section lib_deps!

### Code obligatoire à ajouter à **l'espace global**

Importer et créer une instance de la classe `M5_Encoder` (nommée `myEncoder` dans cet exemple) :
```cpp
#include <M5_Encoder.h>
M5_Encoder myEncoder;
```


### Code obligatoire à ajouter à `setup()`

S'assurer que `Wire` est initialisé : 
```cpp
  Wire.begin();
```

> [!WARNING] 
> Ne pas initialiser Wire deux fois dans votre code!

Démarrer `myEncoder` : 
```cpp
  myEncoder.begin();
```

### Code obligatoire à mettre dans `loop()`

Il est nécessaire de mettre à jour les valeurs de l'encodeur avant de les récupérer. Il faut ainsi appeler la méthode `myEncoder.update()` à chaque `loop()`.
```cpp
    // Mise à jour des valeurs de l'encodeur. 
    // Doit être appelé régulièrement.
    // Doit être appelé avant de lire les valeurs.
    myEncoder.update();
```

### Lecture de la rotation

Obtenir la rotation accumulée de l'encodeur :
```cpp
    // Lecture de la rotation de l'encodeur
    int valeurEncodeur = myEncoder.getEncoderRotation();
```

### Lecture du changement de rotation

Obtenir le changement de rotation de l'encodeur :
```cpp
   // Lecture du changement depuis la dernière lecture
    int changementEncodeur = myEncoder.getEncoderChange();
```

### Lecture du bouton

Obtenir l'état du bouton :
```cpp
     // Lecture du bouton 
    int etatBouton = myEncoder.getButtonState();
```

### Écriture des pixels

Les deux pixels :
```cpp
// Changer la couleur des deux pixels
// CHANGER ROUGE, VERT, BLEU pour des valeurs entre 0 et 255 (inclusivement)
myEncoder.setLEDColorBoth( ROUGE, VERT, BLEU );
```

Pixel de gauche :
```cpp
// Changer la couleur du pixel de gauche
// CHANGER ROUGE, VERT, BLEU pour des valeurs entre 0 et 255 (inclusivement)
myEncoder.setLEDColorLeft( ROUGE, VERT, BLEU );
```

Pixel de droite :
```cpp
// Changer la couleur du pixel de droite
// CHANGER ROUGE, VERT, BLEU pour des valeurs entre 0 et 255 (inclusivement)
myEncoder.setLEDColorRight( ROUGE, VERT, BLEU );
```
