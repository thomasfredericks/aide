# Broches du M5Stack Atom

![Les broches du connecteur Grove du M5Stack Atom Lite](m5stack_atom_broches.png) 

## Broches et leurs fonctions

Les tableaux suivants présentent les numéros des broches et leurs fonctions.

Composants embarqués :

| **ESP32-PICO-D4**      | **Composant** | 
|------------------------|--------------|
| **27**                 | Pixel        |
| **39**                 | Bouton       |
| **12**                 | IR           |

Connecteur HY2.0-4P Grove et son câble :

| **ESP32-PICO-D4**      | **I2C**      | **_Analog_** | **Câble HY2.0-4P Grove** |
|------------------------|--------------|--------------|---------------------------|
| **26**                 | SDA(2)       | DAC          | Jaune                     |
| **32**                 | SCL(2)       | ADC          | Blanc                     |
| **5V**                 |              |              | Rouge                     |
| **GND**                |              |              | Noir                      |

Broche sous le module :

| **ESP32-PICO-D4** | **I2C**    | **_Analog_** |
|------------------|------------|--------------|
| **21**           | SCL(1)     | ADC          |
| **25**           | SDA(1)     | DAC          |
| **19**           |            |              |
| **22**           |            |              |
| **23**           |            |              |
| **33**           |            | ADC          |


### Couleurs des connecteurs Grove

Dans le système M5Stack, la couleur du connecteur HY2.0-4P Grove indique normalement le type de communication :

* Noir : BUS unique (analogique, numérique, GPIO)
* Rouge : I2C
* Bleu : UART
* Blanc : Autre/Multi


## Définitions


Voici des définitions (_#define_) des broches qui peuvent être utlisées dans le code.

En anglais:
```cpp
#define BUTTON_PIN 39
#define PIXEL_PIN 27
#define SDA_PIN 26
#define SCL_PIN 32
#define ADC_PIN 32
#define DAC_PIN 26
#define WHITE_CABLE_PIN 32
#define YELLOW_CABLE_PIN 26
```

En français:
```cpp
#define BROCHE_BOUTON 39
#define BROCHE_PIXEL 27
#define BROCHE_SDA 26
#define BROCHE_SCL 32
#define BROCHE_ADC 32
#define BROCHE_DAC 26
#define BROCHE_CABLE_BLANC 32
#define BROCHE_CABLE_JAUNE 26
```