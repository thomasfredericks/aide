# Bibliothèque FastLED

**Les bibliothèques pour bandes de LED supportent souvent plusieurs modèles. Il est important de sélectionner le bon modèle dans le code !**  
Nous recommandons la bibliothèque [FastLED](https://github.com/FastLED/FastLED), qui peut être installée via le gestionnaire de bibliothèques. Elle est très performante, mais un peu complexe à utiliser.

## Initialisation dans le code

### À ajouter dans l’espace global :
```cpp
#define NOMBRE_PIXELS 30 
CRGB mesPixels[NOMBRE_PIXELS];
```

### Dans `setup()`
Ajoutez les pixels à FastLED. La broche 26 correspond à celle du M5Stack Atom pour envoyer les données à la bande de pixels :
```cpp
FastLED.addLeds<WS2812, 26, RGB>(mesPixels, NOMBRE_PIXELS);
```

### Dans `loop()`
Pour modifier la couleur d’un pixel, changez sa valeur dans le tableau :
```cpp
int indexDuPixel = 13;
int rouge = 255;
int vert = 255;
int bleu = 255;
mesPixels[indexDuPixel] = CRGB(rouge, vert, bleu);
```
Ensuite, mettez à jour l’affichage :
```cpp
FastLED.show();
```




