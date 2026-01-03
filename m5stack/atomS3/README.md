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

- L'**ESP32-S3** dispose d'un contrôleur USB natif qui gère le **USB CDC/JTAG**.  
- Le port **USB natif** de l'AtomS3 apparaît comme un **port COM virtuel** sur l'ordinateur.  
- La fonction `Serial` d'Arduino peut être mappée sur ce **port USB CDC**, sans passer par un convertisseur USB-UART externe.  
- Pour activer l'USB CDC, il faut utiliser les **build flags** suivants dans `platformio.ini` :

```ini
build_flags =
   -DARDUINO_USB_MODE=1          ; active USB CDC + JTAG
   -DARDUINO_USB_CDC_ON_BOOT=1   ; énumération USB CDC au démarrage
```

### Activer la communication UART avec des modules/périphériques

S'il est nécessaire de communiquer par série UART avec d'autres périphériques, ces ports doivent être activés manuellement ainsi.

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