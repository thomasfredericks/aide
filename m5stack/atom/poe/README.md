# Atom POE

## Initialisation de l'Ethernet

### Dans l'espace *global*

```cpp
#include <SPI.h>
#include <Ethernet.h>
#include <esp_mac.h>

// L'IP du microcontrolleur doit avoir les mêmes trois premiers nombres que l'IP de destination 
IPAddress myLocalIp(10, 1, 2, 101);
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
  Ethernet.begin(myMac, myLocalIp);
```

### Message de débogage de l'IP local

```cpp
  Serial.println();
  Serial.println(__FILE__);
  Serial.print("myLocalIp: ");
  Serial.println(Ethernet.localIP());
```