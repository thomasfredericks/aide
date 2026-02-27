# MicroNet

`MicroNet` est une bibliothèque Arduino qui simplifie la gestion des connexions réseau sur microcontrôleur, que ce soit en **Wi-Fi** ou en **Ethernet**.

Elle fournit :

- Une interface unifiée permettant de passer du Wi-Fi à l’Ethernet en modifiant seulement quelques lignes de code.
- Le support mDNS (Bonjour).
- Un portail captif de configuration Wi-Fi.


Code source de la bibliothèque : [git de MicroNet](https://github.com/thomasfredericks/MicroNet)

Pour l'ajouter dans PlatformIO, ajouter à `lib_deps` dans `plarformio.ini` :
```cpp
lib_deps = 
    https://github.com/thomasfredericks/MicroNet
```


## Principe de fonctionnement

`MicroNet` agit comme gestionnaire de connexion réseau.

Lors de l’appel à `begin(name)` :

- En **Wi-Fi** :
  - La bibliothèque tente de se connecter au point d’accès configuré.
  - En cas d’échec, un portail captif est ouvert en utilisant le nom fourni.
  - L’utilisateur peut se connecter à ce portail pour configurer les identifiants Wi-Fi.
- En **Wi-Fi et Ethernet** :
  - Une adresse IP est demandée via DHCP.
  - Une fois l’adresse IP obtenue, le nom mDNS est enregistré.

La fonction `update()` doit être appelée aussi souvent que possible dans la boucle principale afin d’assurer la maintenance réseau (mDNS, DHCP, etc.).

Dans les deux cas, l’adresse IP associée à un nom mDNS présent sur le réseau peut être obtenue à l’aide de `resolveName(hostName)`.

## Configuration Wi-Fi

```cpp
#include <Arduino.h>
#include <MicroNetWiFi.h>

MicroNetWiFi myMicroNet;

void setup() {
    myMicroNet.begin("myName");
}

void loop() {
    myMicroNet.update();
}
```

## Configuration Ethernet prédéfinie

`MicroNetEthernet` propose des configurations matérielles prédéfinies.

Configurations disponibles :

```cpp
MicroNetEthernet::Configuration::ATOM_POE_WITH_ATOM_LITE
MicroNetEthernet::Configuration::ATOM_POE_WITH_ATOMS3
```


Voici un exemple pour `ATOM_POE_WITH_ATOM_LITE` :
```cpp
#include <MicroNetEthernet.h>

MicroNetEthernet myMicroNet( MicroNetEthernet::Configuration::ATOM_POE_WITH_ATOM_LITE );

void setup() {
    myMicroNet.begin("myName");
}

void loop() {
    myMicroNet.update();
}
```


## Génération d’un nom mDNS à partir du MAC

Il est possible d’ajouter une partie de l’adresse MAC à un préfixe afin de générer un nom unique.

```cpp
char myName[MICRO_NET_NAME_MAX_LENGTH] = "atom-";
myMicroNet.appendMacToCString(myName, MICRO_NET_NAME_MAX_LENGTH, 3);
myMicroNet.begin(myName);
```

- `prefix` : chaîne C contenant le préfixe.
- `destMaxSize` : taille maximale du tampon destination.
- `numBytes` : nombre d’octets du MAC à ajouter (chaque octet ajoute deux caractères hexadécimaux).

Exemple de résultat : `atom-932AE4`.


## Résolution d’un nom mDNS

```cpp
IPAddress ip = myMicroNet.resolveName(hostName);
```

- `hostName` : chaîne C (`const char*`) contenant le nom mDNS.
- Ne pas ajouter le suffixe `.local`.

La fonction ne retourne que lorsque l’hôte est trouvé.

