# Code OSC SLIP de base du M5Stack Atom

## Préalable(s)

- [Configurer Arduino IDE pour M5Stack Atom](/m5stack/atom/configuration.md)
- Se familiariser avec [L'envoi d'OSC avec MicroOsc](/osc/microosc/envoi.md)
- Télécharger la bibliothèque **MicroOsc** dans le gestionnaire de bibliothèques d'Arduino.
- Télécharger la dernière version d'OscBridge : [OscBridge Latest Release](https://github.com/thomasfredericks/OscBridge/releases/latest)

## Le code OSC de base

```cpp
#include <M5Atom.h>
CRGB pixel;

#include <MicroOscSlip.h>
MicroOscSlip<128> monOsc(&Serial);
unsigned long monChronoMessages;

void setup() {
  M5.begin(false, false, false);
  FastLED.addLeds<WS2812, DATA_PIN, GRB>(&pixel, 1);  // Ajouter le pixel du M5Atom à FastLED
  Serial.begin(115200);

  unsigned long chronoDepart = millis();
  while (millis() - chronoDepart < 5000) {
    pixel = CRGB(255, 255, 255);
    FastLED.show();
    delay(100);

    pixel = CRGB(0, 0, 0);
    FastLED.show();
    delay(100);
  }

  pixel = CRGB(0, 0, 0);
  FastLED.show();
}

void maReceptionMessageOsc(MicroOscMessage& oscMessage) {
  // TRAITER LES DONNÉES REÇUES ICI
}

void loop() {
  M5.update();

  monOsc.onOscMessageReceived(maReceptionMessageOsc);

  // À CHAQUE 20 MS (i.e. 50x par seconde)
  if (millis() - monChronoMessages >= 20) {
    monChronoMessages = millis();
    // ENVOI DES MESSAGES ICI
  }
}
```