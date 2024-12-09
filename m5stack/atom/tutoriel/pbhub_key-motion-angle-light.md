# Tutoriel: M5Stack PbHub et units Angle, Motion, Light et Key


## Préalable(s)

1) [Code OSC SLIP de base du M5Stack Atom](/m5stack/atom/code_base_osc_slip.md)
2) [M5Stack PbHub Unit](/m5stack/unit/pbhub.md)

## Circuit

Brancher les Units Angle, Motion, Light et Key au PbHub. Noter les canaux utilisés pour chaque module.

![Des UNITS KEY, LIGHT, PIR et ANGLE connectés au PbHub v1.1](pbhub_key-motion-angle-light.jpg)


## Le code préalable à intégrer

1) Transcrire le [Code OSC SLIP de base du M5Stack Atom](/m5stack/atom/code_base_osc_slip.md) dans un nouveau projet Arduino.

## Intégrer la bibliothèque M5_PbHub

###  1) Installation

La bibliothèque [M5_PbHub](https://github.com/thomasfredericks/M5_PbHub) est disponible dans le gestionnaire de bibliothèques d'Arduino.

### 2) Code à ajouter à l'espace global (i.e. avant `setup()` )

Nous créons une instance de la classe `M5_PbHub` nommée `myPbHub`:
```cpp
#include <M5_PbHub.h>
M5_PbHub myPbHub;
```

### 3) Code à ajouter à `setup()`

> [!IMPORTANT] 
> Ajouter les extraits de code suivants après votre code de démarrage dans `setup()`.

#### 3.1) S'assurer que `Wire` est initialisé dans `setup()`
 
Initialiser Wire :
```cpp
Wire.begin();
```

> [!WARNING] 
> Ne pas initialiser Wire deux fois dans votre code!

#### 3.2) Démarrer `myPbHub` dans `setup()`

```cpp
myPbHub.begin();
```

#### 3.3) Initialiser les pixels du Unit Key connecté au **PbHub** dans `setup()`

Remplacer `channel` par le canal du Key Unit :
```cpp
myPbHub.setPixelCount( channel ,  1);
```

## Méthodes correspondants aux Units

> [!IMPORTANT] 
> Utiliser les méthodes suivantes dans votre code de communication dans `loop()`

###  Angle Unit

Pour effectuer la lecture de l'angle, utiliser la méthode suivante en remplaçant `channel` par le canal du Angle Unit:
```cpp
int angle = myPbHub.analogRead(channel);
```

###  Light Unit

Pour effectuer la lecture de lumière, utiliser la méthode suivante en remplaçant `channel` par le canal du Light Unit:
```cpp
int light = myPbHub.analogRead(channel);
```

###  Motion Unit

Pour effectuer la lecture de la détection de mouvement, utiliser la méthode suivante en remplaçant `channel` par le canal du Motion Unit:
```cpp
int motion = myPbHub.digitalRead(channel);
```

###  Key Unit

Pour effectuer la lecture de la détection de pression, utiliser la méthode suivante en remplaçant `channel` par le canal du Key Unit:
```cpp
int press = myPbHub.digitalRead(channel);
```

Pour changer la couleur du pixel du Key Unit, utiliser la méthode suivante en remplaçant `channel` par le canal du Key Unit et `r`, `g` et `b` par des valeurs de couleur :
```cpp
myPbHub.setPixelColor(channel , 0, r , g, b);
```