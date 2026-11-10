# Arduino Wire / I2C


## Introduction 

Le **bus I²C** (*Inter-Integrated Circuit*) est un protocole de communication **synchrone série** permettant de faire dialoguer plusieurs périphériques avec le microcontrôleur via seulement **deux fils** :

- **SDA** (*Serial Data*) : ligne de données bidirectionnelle
- **SCL** (*Serial Clock*) : ligne d’horloge générée par le coordonnateur

Sur les cartes Arduino classiques (Uno, Nano), ces broches sont  `A4 = SDA` et `A5 = SCL`.

### Principes de fonctionnement

- Chaque périphérique possède une **adresse unique** (7 bits, généralement de 0x08 à 0x77), ce qui permet de connecter **plusieurs modules sur le même bus** (jusqu’à 112 théoriquement).
- Un seul **coordonnateur** (l’Arduino) initie et contrôle la communication.
- Vitesse standard : **100 kHz** (mode standard) ou **400 kHz** (mode rapide).
- Les lignes doivent être tirées au niveau haut par des **résistances de tirage (pull-up)**, souvent déjà intégrées sur les modules.

### La bibliothèque Wire

La bibliothèque `Wire` est **incluse par défaut** dans l’IDE Arduino :

```cpp
#include <Wire.h>

void setup() {
  Wire.begin();          // initialisation en maître (adresse optionnelle en esclave)
  Wire.beginTransmission(0x68);  // commencer à parler à l’esclave d’adresse 0x68
  Wire.write(0x00);              // envoyer un octet (registre interne de l’esclave)
  Wire.endTransmission();        // terminer la transmission

  Wire.requestFrom(0x68, 2);     // demander 2 octets à l’esclave
  int data = Wire.read() << 8 | Wire.read();
}

void loop() {}
```