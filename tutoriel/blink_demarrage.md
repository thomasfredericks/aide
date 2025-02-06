# Tutoriel: «Blink» uniquement au démarrage

## Préalable(s)

- [Tutoriel: le code test «Blink»](/m5stack/atom/tutoriel/blink.md)


## Le code à ajouter

### Dans _setup()_

Nous ajoutons dans _setup()_ une boucle qui se répette pendant 5 secondes :
```cpp
  // Animation de démarrage
  while ( millis() < 5000) {

  }
```

Noude __déplaçons__ le code du clignotement qui est dans _loop()_ dans l'animation de démarrage :


```cpp
  // Animation de démarrage
  while ( millis() < 5000) {
    // Allumer le pixel et attendre 100 millisecondes
    pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
    delay(100);

    // Éteindre le pixel et attendre 100 millisecondes
    pixel = CRGB(0,0,0);
    FastLED.show();
    delay(100);
  }
```


## Le code complet

```cpp
// Le code de base pour le M5Stack Atom

#include <M5Atom.h>  // Inclure la librairie M5 (version pour M5Atom) https://github.com/m5stack/M5Atom

CRGB pixel;  // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference

unsigned long interactionChrono;

void setup() {
  M5.begin(false, false, false);  // Démarrer la libraire M5 avec toutes les options désactivées
  Serial.begin(115200);  // Démarrer la connexion sérielle avec l'ordinateur
  FastLED.addLeds<WS2812, DATA_PIN, GRB>(&pixel, 1);  // Ajouter le pixel du M5Atom à FastLED

  // Animation de démarrage
  while ( millis() < 5000) {
    // Allumer le pixel et attendre 100 millisecondes
    pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
    delay(100);

    // Éteindre le pixel et attendre 100 millisecondes
    pixel = CRGB(0,0,0);
    FastLED.show();
    delay(100);
  }
}

void loop() {
  M5.update();  // Toujours inclure M5.update() au début de loop()
}
```