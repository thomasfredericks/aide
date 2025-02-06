# Pixel du M5Stack Atom Lite

## Librairies

Le contrôle du pixel du M5Stack Atom Lite nécessite les librairies suivantes :
- M5Atom
- FastLED 

À noter que FastLED est dans inclu dans M5Atom.

## À ajouter dans l'espace *global* (au début du code)

Ajouter une varialbe de type CRGB pour le pixel :
```cpp
CRGB pixel;
```

## Configuration dans *setup()*

À ajouter dans *setup* :
```cpp
  // Ajouter le pixel (il y en a un seul) du M5Atom à la librairie FastLED :
  FastLED.addLeds<WS2812, DATA_PIN, GRB>(&pixel, 1);
```

## Changer la couleur du pixel dans *setup()* ou *loop()*

Pour changer la couleur du pixel:

1) On assigne une nouvelle valeur CRGB à la variable :
```cpp
  // Changer la couleur du premier pixel pour le blanc :
  pixel = CRGB(255,255,255);
```

2) Après, il faut indiquer de mettre à jour la couleur affichée selon la valeur de la variable pixel :
```cpp
    // Mettre à jour le pixel :
    FastLED.show();
```

