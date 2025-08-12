# Broches du M5Stack Atom

![Les broches du connecteur Grove du M5Stack Atom Lite](m5stack_atom_broches.png) 

## Broches et leurs fonctions

Les tableaux suivants présentent les numéros des broches et leurs fonctions.

### Composants embarqués

| **ESP32-PICO-D4** | **Composant** |
|------------------|----------------|
| **27**           | Pixel RGB      |
| **39**           | Bouton         |
| **12**           | IR             |

### Connecteur HY2.0-4P Grove et son câble

| **ESP32-PICO-D4** | **I2C**  | **Analogique** | **Câble HY2.0-4P Grove** |
|------------------|----------|------------------|---------------------------|
| **26**           | SDA(2)   | DAC              | Jaune                     |
| **32**           | SCL(2)   | ADC              | Blanc                     |
| **5V**           |          |                  | Rouge                     |
| **GND**          |          |                  | Noir                      |

### Broches sous le module

| **ESP32-PICO-D4** | **I2C**  | **Analogique** | 
|------------------|----------|------------------|
| **21**           | SCL(1)   |                  |
| **25**           | SDA(1)   | DAC              |
| **22**           |          |                  |
| **19**           |          |                  |
| **23**           |          |                  |
| **33**           |          | ADC              |

### Couleurs des connecteurs Grove

Dans le système M5Stack, la couleur du connecteur HY2.0-4P Grove indique normalement le type de communication :

- **Noir** : Bus unique (analogique, numérique, GPIO)  
- **Rouge** : I2C  
- **Bleu** : UART  
- **Blanc** : Autre / multi-usages

## Définitions

Voici des définitions (`#define`) des broches pouvant être utilisées dans le code.

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
