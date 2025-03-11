# Atom POE

## Initialisation de l'Ethernet

### Dans l'espace *global*

```cpp
#include <SPI.h>
#include <Ethernet.h>

// L'IP du microcontrolleurdoit avoir les mêmes trois premiers nombres que l'IP de destination 
IPAddress myIp(10, 1, 2, 101);
```

### Dans *setup()*

```cpp
 // CONFIGURE ETHERNET
  SPI.begin(22, 23, 33, 19);
  Ethernet.init(19);
  uint8_t myMac[6];
  // GET FACTORY DEFINED ESP32 MAC :
  esp_efuse_mac_get_default(myMac);
  // START ETHERNET WITH STATIC IP
  Ethernet.begin(myMac, myIp);
```