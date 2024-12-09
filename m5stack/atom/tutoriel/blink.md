# Tutoriel: le code test «Blink»

## Préalable(s)

- [Configurer Arduino IDE pour M5Stack Atom](/m5stack/atom/configuration.md)

## Le code préalable à intégrer

- [Transcrire le code minimal pour le M5Stack Atom dans un nouveau projet Arduino](/m5stack/atom/code-minimal.md)

## Le code à ajouter

### Dans l'espace global

Noud déclarons une variable  `pixel` :
```cpp
CRGB pixel;  // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
```

### Dans _setup()_

Nous initialisons le  `pixel` :
```cpp
FastLED.addLeds<WS2812, DATA_PIN, GRB>(&pixel, 1);  // Ajouter le pixel du M5Atom à FastLED
```

### Dans _setup()_ ou _loop()_

Pour allumer le pixel :
```cpp
  // Allumer le pixel et attendre 100 millisecondes
  pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
  FastLED.show();
  delay(100);
```

Pour éteindre le pixel :
```cpp
   // Éteindre le pixel et attendre 100 millisecondes
    pixel = CRGB(0,0,0);
    FastLED.show();
    delay(100);
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
}

void loop() {
  M5.update();  // Toujours inclure M5.update() au début de loop()

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