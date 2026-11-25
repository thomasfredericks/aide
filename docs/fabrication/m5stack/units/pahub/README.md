# M5Stack PaHub Unit

## Introduction

Attention, il existe deux versions du PaHub. Ces instructions concernent la version avec le TCA9548A.

Le [M5Stack PaHub TCA9548A](https://shop.m5stack.com/products/pahub-unit?variant=16804803412058) permet de relier jusqu’à 6 M5Stack UNIT I2C équipés d’un connecteur **rouge** au même microcontrôleur M5Stack.

Ce module permet de brancher plusieurs UNIT I2C qui possèdent la même adresse au même M5Stack.

## Bibliothèque TCA9548A

La bibliothèque [TCA9548A](https://github.com/WifWaf/TCA9548A) permet d’interfacer avec le [M5Stack PaHub TCA9548A](https://shop.m5stack.com/products/pahub-unit?variant=16804803412058).

### Installation

La bibliothèque [TCA9548A](https://github.com/WifWaf/TCA9548A) est disponible dans le gestionnaire de bibliothèques d’Arduino.

### Code à ajouter à l’espace global (i.e. avant `setup()` )

```arduino
#include "TCA9548A.h"
TCA9548A myPbahub;
```

### Code à ajouter à `setup()`

Démarrer Wire s’il n’a pas encore été démarré:

```arduino
  Wire.begin();
```

Initialiser le PaHub :

```arduino

  myPbahub.begin(Wire);
  myPbahub.closeAll();
```

### Code à utiliser dans `loop()`

Ouvrir la connexion vers un des canaux et relier tout l’I2C vers celui-ci:

```arduino
myPbahub.openChannel(canal);
```

Fermer la connexion vers ce canal:

```arduino
myPbahub.closeChannel(canal);
```

Utilisez ensuite l’I2C normalement. Les messages vont passer uniquement par les canaux ouverts.

### Exemple de deux Encodeurs I2C pour Arduino Nano

```arduino
// https://github.com/thomasfredericks/M5_Encoder.git
#include <M5_Encoder.h>
M5_Encoder myEncoder0;
M5_Encoder myEncoder1;

// TCA9548A Jonathan Dempsey
// https://github.com/WifWaf/TCA9548A
#include "TCA9548A.h"
TCA9548A monHubI2c;   // renamed to match French naming style

unsigned long monChronoDepart = 0;  // DEPART DE MON CHRONOMÈTRE

#include <MicroOscSlip.h>
MicroOscSlip<64> monOsc(&Serial);

void setup() {

  // Démarrer la connexion sérielle :
  Serial.begin(115200);

  // Démarrer la connexion I2C
  Wire.begin();

  monHubI2c.begin(Wire);
  monHubI2c.closeAll();

  // Initialiser chaque encodeur pendant que
  // son canal du multiplexeur est ouvert :
  monHubI2c.openChannel(0);
  myEncoder0.begin();
  monHubI2c.closeChannel(0);

  monHubI2c.openChannel(1);
  myEncoder1.begin();
  monHubI2c.closeChannel(1);
}

// FONCTION APPELÉE QUAND UN MESSAGE OSC EST REÇU :
void monGestionnaireOsc( MicroOscMessage& messageRecu ) {
  // AJOUTER ICI LE CODE DE TRAITEMENT DES MESSAGES
}

void loop() {

  monOsc.onOscMessageReceived( monGestionnaireOsc );

  monHubI2c.openChannel(0);
  myEncoder0.update();
  int changementEncodeur0 = myEncoder0.getEncoderChange();
  if ( changementEncodeur0 != 0 ) // l’encodeur a été tourné
  {
      monOsc.sendInt("/enc0/rot", changementEncodeur0);
  }
  monHubI2c.closeChannel(0);

  monHubI2c.openChannel(1);
  myEncoder1.update();
  int changementEncodeur1 = myEncoder1.getEncoderChange();
  if ( changementEncodeur1 != 0 ) // l’encodeur a été tourné
  {
      monOsc.sendInt("/enc1/rot", changementEncodeur1);
  }
  monHubI2c.closeChannel(1);
}
```
