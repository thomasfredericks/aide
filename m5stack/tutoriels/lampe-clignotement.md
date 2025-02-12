# Tutoriel: Lampe torche qui clignote

## Préalable(s)

- [Tutoriel: lampe torche avec état](/m5stack/atom/tutoriel/lampe-torche-etat.md)
- [Tutoriel: clignoter sans bloquer](/m5stack/atom/tutoriel/clignoter-sans-bloquer.md)

## Code complet

```cpp
#include <M5Atom.h>

CRGB pixel;
unsigned long monChronoDepart;
bool monEtatPixel;
bool monEtatLampe;

void setup() {
  // put your setup code here, to run once:
  M5.begin(false, false, false);
  FastLED.addLeds<WS2812, DATA_PIN, GRB>(&pixel, 1);  // Ajouter le pixel du M5Atom à FastLED

  monChronoDepart = millis();
  while (millis() - monChronoDepart <= 5000) {
    pixel = CRGB(255, 255, 255);
    FastLED.show();
    delay(100);

    pixel = CRGB(0, 0, 0);
    FastLED.show();
    delay(100);
  }

  pixel = CRGB(0, 0, 0);
  FastLED.show();

  monEtatPixel = false;
}

void loop() {
  // put your main code here, to run repeatedly:
  M5.update();

  if (M5.Btn.wasPressed()) {
    monEtatLampe = !monEtatLampe;
  }

  if (monEtatLampe) {
    if (millis() - monChronoDepart >= 250) {
      monChronoDepart = millis();
      monEtatPixel = !monEtatPixel;
    }
  } else {
    monEtatPixel = false;
  }

  if (monEtatPixel == true) {
    pixel = CRGB(255, 255, 255);
  } else {
    pixel = CRGB(0, 0, 0);
  }
  FastLED.show();
}
```