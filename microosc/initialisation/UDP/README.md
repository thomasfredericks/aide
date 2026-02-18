# MicroOscUDP : Initialisation

## Préalables

L'intégration de MicroOscUdp est assez simple. Ce qui est plus complexe, est le démarrage de la réseautique et de l'UDP. 

L'initialisation du réseau est un préalable à l'utilisation de MicroOscUdp. La bibliothèque MicroNet est recommandée pour réaliser cette tâche complexe.

## Installation de MicroOscUdp

### Arduino IDE

Télécharger la bibliothèque `MicroOsc` dans le gestionnaire de bibliothèques d'Arduino.

### PlatformIO

Ajouter la ligne suivante à `lib_deps` dans `platformio.ini` :
```ini
lib_deps =
    https://github.com/thomasfredericks/MicroOsc.git
```

## Intégration de MicroOscUdp

### Dans l'espace global

Inclure et initaliser MicroOsc :
```cpp
#include <MicroOscUdp.h>
EthernetUDP monUdp; // ou pour le WiFi :  WiFiUDP myUdp; 
MicroOscUdp<1024> monOsc(&monUdp); // <#> : nombre d'octets pour la réception de messages
```

### Dans `setup()`

Initialiser l'UDP :
```cpp
unsigned int myReceptionPort = 8001; // changer pour le bon port
myUdp.begin(myReceptionPort);
```

Assigner la destination :
```cpp
IPAddress myDestinationIp(192, 168, 1, 210); // changer pour le bon IP
unsigned int myDestinationPort = 8000; // changer pour le bon port
monOsc.setDestination(myDestinationIp , myDestinationPort);
```

## Exemple Ethernet avec MicroNet

```cpp
#include <MicroNetEthernet.h>
#include <MicroOscUdp.h>

MicroNetEthernet myMicroNet(MicroNetEthernet::Configuration::ATOM_POE_WITH_ATOM_LITE);
EthernetUDP myUdp;
MicroOscUdp<1024> monOsc(&myUdp); // 1024 octets pour la réception


void setup() {

    char myName[MICRO_NET_NAME_MAX_LENGTH] = "device-";
    myMicroNet.appendMacToCString(myName, MICRO_NET_NAME_MAX_LENGTH, 3); // optionnel : ajout de MAC pour nom unique
    myMicroNet.begin(myName); // obtention d'une IP via DHCP et enregistrement mDNS

    unsigned int myReceptionPort = 8001;        // Port de réception
    unsigned int myDestinationPort = 8000;      // Port de destination
    IPAddress myDestinationIp(192, 168, 1, 210); // IP de destination

    myUdp.begin(myReceptionPort);               // Commence la réception UDP
    monOsc.setDestination(myDestinationIp, myDestinationPort); // Définir la destination
}


void loop() {
    myMicroNet.update();                   // Entretien réseau
    // monOsc.onOscMessageReceived(myOscMessageParser); // Acquisition de messages OSC
}
```

Points importants :
- `myMicroNet.update()` doit être appelé aussi souvent que possible pour maintenir la connexion réseau.
- `monOsc.onOscMessageReceived()` lit et parse instantanément les messages OSC entrants. Voir la [réception de messages OSC](../../reception/)
- Aucun `delay()` ne doit bloquer `loop()`.
- MicroNet fournit DHCP, mDNS et la possibilité d’ajouter automatiquement une partie de l’adresse MAC au nom du périphérique pour garantir son unicité.


## Exemple Wi-Fi avec MicroNet

```cpp
#include <MicroNetWiFi.h>
#include <MicroOscUdp.h>

MicroNetWiFi myMicroNet;
WiFiUDP myUdp;
MicroOscUdp<1024> monOsc(&myUdp); // 1024 octets pour la réception

void setup() {
    char myName[MICRO_NET_NAME_MAX_LENGTH] = "device-";
    myMicroNet.appendMacToCString(myName, MICRO_NET_NAME_MAX_LENGTH, 3); // optionnel : ajout de MAC pour nom unique
    myMicroNet.begin(myName); // connexion au réseau et obtention d'une IP via DHCP

    unsigned int myReceptionPort = 8001;        // Port de réception
    unsigned int myDestinationPort = 8000;      // Port de destination
    IPAddress myDestinationIp(192, 168, 1, 210); // IP de destination

    myUdp.begin(myReceptionPort);               // Commence la réception UDP
    monOsc.setDestination(myDestinationIp, myDestinationPort); // Définir la destination
}

void loop() {
    myMicroNet.update();                   // Entretien réseau
    // monOsc.onOscMessageReceived(myOscMessageParser); // Acquisition de messages OSC
}
```

Points importants :
- `myMicroNet.update()` doit être appelé aussi souvent que possible pour maintenir la connexion réseau.
- `monOsc.onOscMessageReceived()` lit et parse instantanément les messages OSC entrants. Voir la [réception de messages OSC](../../reception/)
- Aucun `delay()` ne doit bloquer `loop()`.
- MicroNet fournit DHCP, mDNS et la possibilité d’ajouter automatiquement une partie de l’adresse MAC au nom du périphérique pour garantir son unicité.
