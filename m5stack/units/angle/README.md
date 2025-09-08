# M5Stack Angle Unit

## Description

L'unité **M5Stack Angle** permet de mesurer un déplacement rotatif entre deux angles limites.

Page de documentation officielle du produit : [m5-docs](https://docs.m5stack.com/en/unit/angle).


## Connexion

Connecter l'unité **M5Stack Angle** au connecteur Grove blanc du contrôleur.

La lecture de la rotation s'effectue sur la broche identifiée par le texte *IN* sur fond blanc, ce qui correspond au câble blanc du connecteur Grove. Si l'unité **M5Stack Angle** est connectée au connecteur blanc du Atom Lite, c'est la broche 32 (identifiée G32) qui permet d'effectuer la lecture analogique de l'angle :

![La connectique du M5Stack Angle](angle-to-atom.png)


## Code à intégrer

### Dans l'espace global

Bien que cela ne soit pas absolument nécessaire, c'est une bonne idée d'utiliser un `#define` pour identifier le numéro de la broche :
```cpp
#define MA_BROCHE_ANGLE 32
```

### Dans *setup()*

Le **M5Stack Angle** ne nécessite aucun code dans *setup()*.

### Dans *loop()*



Pour effectuer une lecture, nous utilisons la fonction [analogRead()](https://www.arduino.cc/reference/en/language/functions/analog-io/analogread/) :
```cpp
int analogRead(int pin);
```

Donc *si* le **M5Stack Angle** est connecté au connecteur Grove du contrôleur :
```cpp
int maLectureAngle = analogRead(MA_BROCHE_ANGLE);
```

![](./code_angle.drawio.png)

## Exemple(s)

### Allumer un pixel en rouge selon la rotation



#### Rappel de la règle de 3

![La règle de 3](./regle_de_3.drawio.png)

![La règle de 3 appliquée au canal rouge et à la mesure d'angle](./regle_de_3_rouge_angle.drawio.png)


#### Rappel sur comment changer une couleur

```cpp
pixelAtom = CRGB( 255 , 255 , 255 ); // pixelAtom a été déclaré dans l'espace global
FastLED.show();
```
![](./code_crgb.drawio.png)

#### Sans variable intermédiaire

```cpp
int maLectureAngle = analogRead(MA_BROCHE_ANGLE);
pixelAtom = CRGB( maLectureAngle * 255 / 4095 , 0 , 0 ); // pixelAtom a été déclaré dans l'espace global
FastLED.show();
```

![Schéma sans variable intermédiaire](./code_crgb_exercice.drawio.png)

#### Avec variable intermédiaire

```cpp
int maLectureAngle = analogRead(MA_BROCHE_ANGLE);
int rouge = maLectureAngle * 255 / 4095; // règle de 3 
pixelAtom = CRGB( rouge , 0 , 0 ); // pixelAtom a été défini dans l'espace global
FastLED.show();
```

![Schéma avec variable intermédiaire](./code_crgb_exercice2.drawio.png)