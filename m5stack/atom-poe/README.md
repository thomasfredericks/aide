# Atom POE

Documentation officielle : [Atom PoE](https://docs.m5stack.com/en/atom/atom_poe)


## Bibliothèques

À ajouter à l'entrée `lib_deps` du fichier de configuration `platformio` :
```ini
https://github.com/arduino-libraries/Ethernet
https://github.com/TrippyLighting/EthernetBonjour
```

## Initialisation de l'Ethernet

Broches de l'Atom :

| Ethernet | CLK	| CS	| MISO | MOSI |
| --- |  --- |  --- |  --- |  --- | 
| Atom |	22 |	19 |	23 |	33 |
| AtomS3 |	5 |	6 |	7 |	8 |


### Code à ajouter à l'espace *global*

```cpp
#include <SPI.h>
#include <Ethernet.h>
#include <esp_mac.h>

// L'IP du microcontrolleur doit avoir les mêmes trois premiers nombres que l'IP de destination 
IPAddress myLocalIp(192, 168, 1, 101);
```

### Code à ajouter à *l'initialisation*


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

Optionnellement, afficher l'information de connexion :
```cpp
  Serial.begin(115200);
  Serial.println();
  Serial.print("myLocalIp: ");
  Serial.println(Ethernet.localIP());
```
