# AtomS3 et PlatformIO

## Configuration de `platformio.ini`

Le fichier `platformio.ini` doit être modifié pour que :
- Pointer la ligne `platform =` vers la plateforme `pioarduino-espressif32` communautaire (informations complémentaires [ici](/fabrication/platformio/pioarduino/espressif32/)).
- Activer le **port USB CDC** et le mapper à `Serial`. L'**ESP32-S3** n'utilise **pas**, comme les modèles **ESP32** précédents, de puce de conversion USB-UART externe (comme les puces FTDI, CP2102 ou CH340) pour gérer la communication sérielle USB . L'**ESP32-S3** possède un contrôleur **USB natif** qui peut apparaître comme un **port COM virtuel**, aussi appelé **USB Communication Device Class** (**USB CDC**) sur l'ordinateur.  


```ini
[env:m5stack-atoms3]
platform = https://github.com/pioarduino/platform-espressif32/releases/download/stable/platform-espressif32.zip
board = m5stack-atoms3
framework = arduino
monitor_speed = 115200
build_flags =
   -DARDUINO_USB_CDC_ON_BOOT=1   ; activer le CDC USB au démarrage
   -DARDUINO_USB_MODE=0          ; CDC USB en mode périphérique (comme un Arduino Leonardo/Micro classique)
```
