# AtomS3 : `UART`

## Activer la communication `UART` pour communiquer avec des modules/périphériques

S'il est nécessaire de communiquer par série UART (ne pas confondre avec la version USB) avec d'autres périphériques, ces ports doivent être activés manuellement selon les instructions suivantes.

### Dans l'espace global

```cpp
#include <HardwareSerial.h>

// Création d'objets HardwareSerial pour UART1 et UART2
HardwareSerial MySerial1(1);  // UART1
HardwareSerial MySerial2(2);  // UART2
```

### Initialisation

```cpp
  // UART1 : TX sur GPIO10, RX sur GPIO9, baudrate 115200
  MySerial1.begin(115200, SERIAL_8N1, 9, 10);

  // UART2 : TX sur GPIO17, RX sur GPIO16, baudrate 9600
  MySerial2.begin(9600, SERIAL_8N1, 16, 17);
```