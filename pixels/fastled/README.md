# Pixels : FastLED

Les bibliothèques pour bandes de LED prennent généralement en charge plusieurs modèles de pixels. Il est donc important de sélectionner le bon modèle dans le code afin d’assurer une communication correcte avec le matériel.

La bibliothèque recommandée est [FastLED](https://github.com/FastLED/FastLED). Elle peut être installée via le gestionnaire de bibliothèques d’Arduino ou dans un projet PlatformIO. FastLED est très performante et largement utilisée pour le contrôle de pixels adressables, bien qu’elle demande une certaine familiarité avec sa structure.

## Principe général

Les pixels sont représentés dans le code par un tableau d’objets `CRGB`.  
Chaque élément du tableau correspond à un pixel de la bande et contient ses valeurs de couleur rouge, vert et bleu.

Après avoir modifié les valeurs des pixels dans ce tableau, il faut appeler `FastLED.show()` pour envoyer les données à la bande de LED.

## Initialisation dans le code

### Bibliothèque à inclure
```cpp
#include <FastLED.h>
```

### À ajouter dans l’espace global

Définition du nombre de pixels et création du tableau contenant leur couleur.

```cpp
#define NOMBRE_PIXELS 30
CRGB mesPixels[NOMBRE_PIXELS];
```

### Dans `setup()`

Ajout de la bande de pixels à FastLED.  
La broche **26** correspond à celle du **M5Stack Atom** utilisée pour envoyer les données vers la bande de LED.

```cpp
FastLED.addLeds<WS2812, 26, RGB>(mesPixels, NOMBRE_PIXELS);
```

Selon le matériel utilisé, le type de pixel peut varier (par exemple `WS2812`, `WS2812B`, `SK6812`, etc.). Il est donc essentiel de choisir le modèle correspondant à la bande de LED.

### Dans `loop()`

Pour modifier la couleur d’un pixel, il suffit de changer sa valeur dans le tableau.

```cpp
int indexDuPixel = 13;
int rouge = 255;
int vert = 255;
int bleu = 255;

mesPixels[indexDuPixel] = CRGB(rouge, vert, bleu);
```

Une fois les modifications effectuées, l’appel à `FastLED.show()` envoie les nouvelles valeurs à la bande de LED.

```cpp
FastLED.show();
```

## Bonnes pratiques

- Les indices des pixels commencent à **0**.  
- L’indice maximal correspond à `NOMBRE_PIXELS - 1`.  
- Il est préférable de modifier plusieurs pixels dans le tableau avant d’appeler `FastLED.show()` afin d’éviter des mises à jour inutiles.

## Exemples

- [Exemple d’illumination d’une bande de pixels (LED strip) en arc-en-ciel](https://codeberg.org/tim-montmorency/fastled_rainbow_esp32)
- [Exemple de pixels contrôlés par ArtNet avec MicroNet pour Atom Light POE](https://codeberg.org/tim-montmorency/atom_artnet_ethernet)