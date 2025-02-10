# Tutoriel : Reaper OSC Play,Stop,Volume,VU

```cpp
#define CHAN_KEY 0
#define CHAN_ANGLE 1

#include <M5Atom.h>

CRGB pixel;

unsigned long monChronoMessages;

#include <MicroOscSlip.h>
MicroOscSlip<128> monOsc(&Serial);

#include <M5_PbHub.h>
M5_PbHub myPbHub;

int maLectureKeyPrecedente;
int etatPlay;

void setup() {
  // put your setup code here, to run once:
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

  Wire.begin();
  myPbHub.begin();
  myPbHub.setPixelCount(CHAN_KEY, 1);
}

void maReceptionMessageOsc(MicroOscMessage& oscMessage) {

  if ( oscMessage.checkOscAddress("/master/vu")) {
    float vu = oscMessage.nextAsFloat();
    int niveau = floor(vu*255.0);
    pixel = CRGB(niveau,niveau,niveau);
    FastLED.show();
  }
}


void loop() {
  // put your main code here, to run repeatedly:
  M5.update();

  monOsc.onOscMessageReceived(maReceptionMessageOsc);

  // À CHAQUE 20 MS I.E. 50x PAR SECONDE
  if (millis() - monChronoMessages >= 20) {
    monChronoMessages = millis();

    int maLectureKey = myPbHub.digitalRead(CHAN_KEY);

    if (maLectureKeyPrecedente != maLectureKey) {
      if (maLectureKey == 0) {
        etatPlay = !etatPlay;

        if (etatPlay == 1) {
          monOsc.sendFloat("/play", 1.0);
        } else {
          monOsc.sendFloat("/stop", 1.0);
        }
      }
    }
    maLectureKeyPrecedente = maLectureKey;
    
    int maLectureAngle = myPbHub.analogRead(CHAN_ANGLE);
    float volume = maLectureAngle / 4095.0;
    monOsc.sendFloat("/master/volume", volume);

  }
}
```