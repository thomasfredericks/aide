# Exemple complet avec animations

Le code ci-dessous contrôle une bande de LED via un M5Stack Atom. Il inclut des animations comme l’arc-en-ciel ou les effets scintillants.

```cpp
// Le code de base pour le M5Stack Atom

// Inclure la librairie M5 (version pour M5Atom) :
// https://github.com/m5stack/M5Atom
#include <M5Atom.h>

// Inclure la librairie FastLED qui va gérer le pixel :
// https://github.com/FastLED/FastLED
#include <FastLED.h>

// Un tableau qui contient une variable de type CRGB.
// Il y a un seul pixel, mais il doit être dans un tableau.
// CRGB est un type de couleur défini par la lirairie FastLed :
// https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
CRGB monPixelAtom[1];

#define MA_BANDE_DEL_COMPTE 30
CRGB maBandeDel[MA_BANDE_DEL_COMPTE];

unsigned long monChronoStart;

int monAnimation = 6;


void setup() {
  // Démarrer la libraire M5 avec toutes les options de pré-configuration désactivées :
  M5.begin(false, false, false);

  // Démarrer la connexion sérielle :
  Serial.begin(115200);

  // Ajouter le pixel (il y en a un seul) du M5Atom à la librairie FastLED :
  FastLED.addLeds<WS2812, DATA_PIN, GRB>(monPixelAtom, 1);

  // Utiliser FastLED.addLeds si la bande est connectée directement à l'ATOM
  FastLED.addLeds<WS2812, 26, RGB>(maBandeDel, MA_BANDE_DEL_COMPTE);
  // Utiliser les deux commandes suivantes si la bande est connectée au pbHub
  /*
  myPbHub.begin();
  myPbHub.setPixelCount(MA_BANDE_DEL_CANAL, MA_BANDE_DEL_COMPTE);
  */

  // Animation de démarrage
  while (millis() < 5000) {
    monPixelAtom[0] = CHSV((millis() / 5) % 255, 255, 255 - (millis() * 255 / 5000));
    FastLED.show();
    delay(50);
  }
  monPixelAtom[0] = CRGB(0, 0, 0);
  FastLED.show();
}

void loop() {
  // Toujours inclure M5.update() au début de loop() :
  M5.update();

  if (millis() - monChronoStart >= 50) {
    monChronoStart = millis();
  
    Serial.println(millis());

    uint8_t hue = millis() / 50;

    if (monAnimation == 0) {
      rainbow(maBandeDel, MA_BANDE_DEL_COMPTE, hue);  // run simulation frame
    } else if (monAnimation == 1) {
      rainbowWithGlitter(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else if (monAnimation == 2) {
      confetti(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else if (monAnimation == 3) {
      sinelon(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else if (monAnimation == 4) {
      bpm(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else if (monAnimation == 5) {
      juggle(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else { 
      int count = (millis() / 1000) % 30;
      fill_solid( maBandeDel, MA_BANDE_DEL_COMPTE, CRGB( 0, 0, 0) );
      for (int i=0; i < count ; i++ ) {
        maBandeDel[i] = CRGB( 255, 255, 255);
      }
    }

    // Utiliser FastLED.show() si la bande est connectée directement à l'ATOM
    FastLED.show();

  }
}


void rainbow(CRGB* leds, int ledsCount, uint8_t gHue) {
  // FastLED's built-in rainbow generator
  fill_rainbow(leds, ledsCount, gHue, 7);
}

void addGlitter(CRGB* leds, int ledsCount, fract8 chanceOfGlitter) {
  if (random8() < chanceOfGlitter) {
    leds[random16(ledsCount)] += CRGB::White;
  }
}

void rainbowWithGlitter(CRGB* leds, int ledsCount, uint8_t gHue) {
  // built-in FastLED rainbow, plus some random sparkly glitter
  rainbow(leds, ledsCount, gHue);
  addGlitter(leds, ledsCount, 180);
}



void confetti(CRGB* leds, int ledsCount, uint8_t gHue) {
  // random colored speckles that blink in and fade smoothly
  fadeToBlackBy(leds, ledsCount, 10);
  int pos = random16(ledsCount);
  leds[pos] += CHSV(gHue + random8(64), 200, 255);
}

void sinelon(CRGB* leds, int ledsCount, uint8_t gHue) {
  // a colored dot sweeping back and forth, with fading trails
  fadeToBlackBy(leds, ledsCount, 20);
  int pos = beatsin16(13, 0, ledsCount - 1);
  leds[pos] += CHSV(gHue, 255, 192);
}

void bpm(CRGB* leds, int ledsCount, uint8_t gHue) {

  // colored stripes pulsing at a defined Beats-Per-Minute (BPM)
  uint8_t BeatsPerMinute = 62;
  CRGBPalette16 palette = PartyColors_p;
  uint8_t beat = beatsin8(BeatsPerMinute, 64, 255);
  for (int i = 0; i < ledsCount; i++) {  //9948
    leds[i] = ColorFromPalette(palette, gHue + (i * 2), beat - gHue + (i * 10));
  }
}

void juggle(CRGB* leds, int ledsCount, uint8_t gHue) {
  // eight colored dots, weaving in and out of sync with each other
  fadeToBlackBy(leds, ledsCount, 20);
  uint8_t dothue = 0;
  for (int i = 0; i < 8; i++) {
    leds[beatsin16(i + 7, 0, ledsCount - 1)] |= CHSV(dothue, 200, 255);
    dothue += 32;
  }
}
```