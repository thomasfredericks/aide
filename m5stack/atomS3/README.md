# AtomS3


## Introduction

Pages officielles :
- Version du matériel AtomS3 avec écran : [AtomS3](https://docs.m5stack.com/en/core/AtomS3)
- Version du matériel AtomS3 sans écran  : [AtomS3-Lite](https://docs.m5stack.com/en/core/AtomS3%20Lite)


## Broches

![](./atoms3_pins.png)


## Intégration dans PlatformIO

### Utiliser la plateforme de la communauté fournie par `pioarduino`

```ini
[env:m5stack-atoms3]
platform = https://github.com/pioarduino/platform-espressif32/releases/download/stable/platform-espressif32.zip
board = m5stack-atoms3
framework = arduino
monitor_speed = 115200
```

### Activer la communication série USB `Serial`

- L'**ESP32-S3** ne dépend **pas**, comme les modèles **ESP32** précédents, de puce de conversion USB-UART externe pour gérer la communication série USB `Serial` (comme les puces FTDI, CP2102 ou CH340).
- L'**ESP32-S3** possède un contrôleur **USB natif** qui peut apparaître comme **port COM virtuel CDC** sur l'ordinateur.  
- La fonction `Serial` d'Arduino peut être mappée sur ce **port COM virtuel CDC**.
- Pour activer le **port COM virtuel CDC**, il faut utiliser les **build flags** suivants dans `platformio.ini` :
```ini
build_flags =
   -DARDUINO_USB_CDC_ON_BOOT=1   ; activate USB CDC
   -DARDUINO_USB_MODE=0          ; USB CDC in device mode only (like a classic Arduino Leonardo/Micro)
```

### Activer la communication UART avec des modules/périphériques

S'il est nécessaire de communiquer par série UART (ne pas confondre avec la version USB) avec d'autres périphériques, ces ports doivent être activés manuellement selon les instructions suivantes.

#### Dans l'espace global

```cpp
#include <HardwareSerial.h>

// Création d'objets HardwareSerial pour UART1 et UART2
HardwareSerial MySerial1(1);  // UART1
HardwareSerial MySerial2(2);  // UART2
```

#### Initialisation

```cpp
  // UART1 : TX sur GPIO10, RX sur GPIO9, baudrate 115200
  MySerial1.begin(115200, SERIAL_8N1, 9, 10);

  // UART2 : TX sur GPIO17, RX sur GPIO16, baudrate 9600
  MySerial2.begin(9600, SERIAL_8N1, 16, 17);
```

## Schéma électronique

![](./atom_s3_schematic.jpeg)