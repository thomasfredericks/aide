# Pixel du M5Stack Atom Lite

## bibliothèque

Le contrôle du pixel du M5Stack Atom Lite nécessite la bibliothèque suivante :
- FastLED 

### PlatformIO **platformio.ini**
```
lib_deps =
    FastLED
```

## À ajouter dans l'espace *global* 

Ajouter la bibliothèque FastLED:
```cpp
#include <FastLED.h>
```

Ajouter une variable de type CRGB pour le pixel :
```cpp
CRGB pixelAtom;
```

![](./code_creer_crgb.drawio.png)


## Configuration dans *setup()*

À ajouter dans *setup* :
```cpp
  // Initialiser FastLED pour contrôler le pixel RGB du M5Atom
  FastLED.addLeds<WS2812, 27, GRB>(&pixelAtom, 1); 
```

## Changer la couleur du pixel dans *setup()* ou *loop()*

Pour changer la couleur du pixel:

1) On assigne une nouvelle valeur de couleur de type CRGB (couleur rouge, vert, bleu [RGB Color Codes Chart 🎨](https://www.rapidtables.com/web/color/RGB_Color.html)) à la variable :
```cpp
  pixelAtom = CRGB(255,255,255); // BLANC
```

![](./code_crgb.drawio.png)

2) Après, il faut mettre à jour le pixel
```cpp
    FastLED.show();
```

