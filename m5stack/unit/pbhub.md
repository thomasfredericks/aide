# M5Stack PbHub Unit

## Préalable(s)

- [Couleurs de connecteurs Grove](/m5stack/grove/README.md)

## Introduction

Le [M5Stack PbHub v1.1](https://docs.m5stack.com/en/unit/pbhub_1.1) permet de brancher jusqu'à 6 M5Stack UNITS équipés d'un connecteur **noir**. Il nécessite une utilisation d'une bibliothèque (voir plus bas).

![L'arrière du PbHub v1.1](pbhub_back.jpg)

## Bibliothèque M5_PbHub

###  1) Installation

La bibliothèque [M5_PbHub](https://github.com/thomasfredericks/M5_PbHub) est disponible dans le gestionnaire de bibliothèques d'Arduino.

### 2) Code à ajouter à l'espace global (i.e. avant `setup()` )

Nous créons une instance de la classe `M5_PbHub` nommée `myPbHub`:
```cpp
#include <M5_PbHub.h>
M5_PbHub myPbHub;
```

### 3) Code à ajouter à `setup()`

> [!IMPORTANT] 
> Ajouter les extraits de code suivants après votre code de démarrage dans `setup()`.

#### 3.1) S'assurer que `Wire` est initialisé

Initialiser Wire :
```cpp
Wire.begin();
```

> [!WARNING] 
> Ne pas initialiser Wire deux fois dans votre code!

#### 3.2) Démarrer `myPbHub`

```cpp
myPbHub.begin();
```

#### 3.3) Optionnellement, initialiser les pixels des Units connectés au **PbHub**

Si un Unit avec des pixels est connectée au **PbHub**, vous devez initialiser le nombre de pixels dans `setup()`:
```cpp
myPbHub.setPixelCount( uint8_t channel ,  uint16_t count );
```

### Méthodes à utiliser dans `loop()`

Obtenir la valeur numérique (0 ou 1) de la broche *I* du canal indiqué:
```cpp
int value = myPbHub.digitalRead(uint8_t channel);
```

Écrire une valeur numérique (0 ou 1) sur la broche *O* du canal indiqué:
```cpp
myPbHub.digitalWrite(uint8_t channel, uint8_t  value);
```

Obtenir la valeur analogique de la broche *I* du canal indiqué:
```cpp
int value = myPbHub.analogRead(uint8_t channel);
```

Définir le PWM de la broche *O* du canal indiqué:
```cpp
myPbHub.analogWrite(uint8_t channel, uint8_t pin, uint8_t  pwm);
```

Définir la couleur r, g, b du pixel à cet index du canal indiqué:
```cpp
myPbHub.setPixelColor(uint8_t channel, uint16_t index, uint8_t r,int8_t g, uint8_t b);
```

À partir du pixel à cet index, assigner la même couleur rgb  à un certain nombre de pixels sur le canal indiqué: 
```cpp
myPbHub.fillPixelColor(uint8_t channel, uint16_t start, uint16_t index, uint8_t r,int8_t g, uint8_t b);
```

### Exemple avec débogage série


```cpp


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
CRGB mesPixels[1];

#include <M5_PbHub.h>
M5_PbHub myPbHub;

#define KEY_UNIT_CHANNEL 4
#define ANGLE_UNIT_CHANNEL 3
#define PIR_UNIT_CHANNEL 2
#define LIGHT_UNIT_CHANNEL 1

unsigned long monChronoDepart = 0;

void setup() {
  // Démarrer la libraire M5 avec toutes les options de pré-configuration désactivées :
  M5.begin(false, false, false);

  // Démarrer la connexion sérielle :
  Serial.begin(115200);

  // Ajouter le pixel (il y en a un seul) du M5Atom à la librairie FastLED :
  FastLED.addLeds<WS2812, DATA_PIN, GRB>(mesPixels, 1);

  myPbHub.begin();

  myPbHub.setPixelCount(KEY_UNIT_CHANNEL, 1);
}

void loop() {
  // TOUJOURS inclure M5.update() au début de loop() :
  M5.update();

  if (millis() - monChronoDepart >= 50) {  // SI LE TEMPS ÉCOULÉ DÉPASSE 50 MS...
    monChronoDepart = millis();            // ...REDÉMARRER LE CHRONOMÈTRE...

    Serial.print("KEY: ");
    int maValeurKey = myPbHub.digitalRead(KEY_UNIT_CHANNEL);
    Serial.print(maValeurKey);

    // Allumer le pixel du KEY si son bouton est appuyé
    myPbHub.setPixelColor(KEY_UNIT_CHANNEL, 0, maValeurKey * 255, maValeurKey * 255, maValeurKey * 255);

    Serial.print(" ANGLE: ");
    int maValeurAngle = myPbHub.analogRead(ANGLE_UNIT_CHANNEL);
    Serial.print(maValeurAngle);

    Serial.print(" PIR: ");
    int maValeurPir = myPbHub.digitalRead(PIR_UNIT_CHANNEL);
    Serial.print(maValeurPir);

    Serial.print(" LIGHT: ");
    int maValeurLight = myPbHub.analogRead(LIGHT_UNIT_CHANNEL);
    Serial.print(maValeurLight);
    Serial.println();

  }
}
```
