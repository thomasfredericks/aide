# Pixels : NeoPixel

Les pixels **NeoPixel** sont des LED adressables individuellement, très utilisées dans les projets interactifs, les installations artistiques et les dispositifs d’éclairage créatif. Chaque pixel contient un petit contrôleur qui permet de définir sa couleur indépendamment des autres pixels dans la même bande.

Les bandes NeoPixel utilisent généralement des protocoles compatibles avec des modèles populaires comme **WS2812** ou **WS2812B**. Une seule broche de données du microcontrôleur suffit pour contrôler toute la bande.

Une bibliothèque couramment utilisée pour ce type de pixels est **Adafruit NeoPixel**. Elle simplifie l’initialisation de la bande et la gestion des couleurs. Elle peut être installée via le gestionnaire de bibliothèques d’Arduino ou utilisée dans un projet PlatformIO.

## Principe général

Les pixels sont contrôlés par un objet représentant la bande de LED.  
Chaque pixel peut être modifié en spécifiant sa position dans la bande et sa couleur.

Après avoir modifié les couleurs, il faut appeler la fonction d’actualisation pour envoyer les données à la bande de pixels.

## Initialisation typique

### Bibliothèque à inclure

```cpp
#include <Adafruit_NeoPixel.h>
```

### Définition dans l’espace global

```cpp
#define NOMBRE_PIXELS 30
#define BROCHE_PIXELS 26

Adafruit_NeoPixel bandePixels(NOMBRE_PIXELS, BROCHE_PIXELS, NEO_GRB + NEO_KHZ800);
```

### Dans `setup()`

Initialisation de la bande de pixels.

```cpp
bandePixels.begin();
bandePixels.show();
```

### Dans `loop()`

Pour modifier la couleur d’un pixel :

```cpp
int indexDuPixel = 13;
int rouge = 255;
int vert = 255;
int bleu = 255;

bandePixels.setPixelColor(indexDuPixel, bandePixels.Color(rouge, vert, bleu));
```

Une fois les modifications effectuées, il faut envoyer les données à la bande :

```cpp
bandePixels.show();
```

## Bonnes pratiques

- Les indices des pixels commencent à **0**.  
- L’indice maximal correspond à `NOMBRE_PIXELS - 1`.  
- Il est recommandé de modifier plusieurs pixels avant d’appeler `show()` afin de limiter le nombre de transmissions de données.

## Exemple

- [Jeu de Pong à une dimension pour 2 boutons et une bande de pixels (LED strip) basé sur le projet et code de Mirko Pavleski](https://codeberg.org/tim-montmorency/pong1d-nanoJ)