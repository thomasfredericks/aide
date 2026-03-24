# MicroRemoteWire

`MicroRemoteWire` est une micro-bibliothèque Arduino qui permet à un microcontrôleur Arduino d’en contrôler un autre via I2C/Wire.

![Un M5Stack Atom POE allimente et contrôle trois plaquettes Arduino Nano.](./mrw_nano_poe.png)

Dans l'exemple illustré ci-haut, un M5Stack Atom POE **alimente** et **contrôle** plusieurs plaquettes Arduino Nano :
- Le M5Stack Atom POE est le contrôleur, ce qui correspond au `MicroRemoteWireController` dans `MicroRemoteWire`.
- Les plaquettes Arduino Nano sont des `MicroRemoteWirePeripheral` dans `MicroRemoteWire`. 

Chaque `MicroRemoteWirePeripheral` doit se voir attribuer une adresse I2C/Wire unique.  
Le `MicroRemoteWireController` peut ensuite communiquer avec chaque `MicroRemoteWirePeripheral` en utilisant son adresse.

Code source de la bibliothèque : [git de MicroRemoteWire](https://github.com/thomasfredericks/MicroRemoteWire)
 

## Principe de fonctionnement

`MicroRemoteWire` repose sur le bus I2C (appelé aussi Wire dans l’environnement Arduino).

- Le **contrôleur** envoie des commandes via I2C.
- Le **périphérique** reçoit ces commandes et les exécute (configuration de broche, écriture, lecture, etc.). Le périphérique attend simplement les commandes envoyées par le contrôleur.

Points importants :

- Toutes les cartes doivent partager la masse (GND).
- Les lignes SDA et SCL doivent être correctement connectées.
- Chaque périphérique doit avoir une adresse I2C unique.


### Côté périphérique

Le code du périphérique doit :

- Inclure la bibliothèque `MicroRemoteWirePeripheral.h`.
- Initialiser le bus I2C avec son adresse.
- Déclarer les fonctions `onReceive` et `onRequest`.

Dans le dossier `examples/peripheral-nano` du [git de MicroRemoteWire](https://github.com/thomasfredericks/MicroRemoteWire), il y a un exemple pour une carte configurée en tant que périphérique : [peripheral-nano](https://github.com/thomasfredericks/MicroRemoteWire/tree/main/examples/peripheral-nano)

Voici la configuration de `platformio.ini` de l'exemple:
```ini
[env:nanoatmega328]
platform = atmelavr
board = nanoatmega328
framework = arduino
monitor_speed = 115200
lib_deps =
    https://github.com/thomasfredericks/MicroRemoteWire
```

**Dans le code, la seule ligne à modifier est le numéro de l'I2C. Rappel : chaque périphérique doit avoir une adresse I2C unique.**

Pour modifier le numéro de l'I2C, modifier la valeur de `PERIPHERAL_I2C_ADDR` :
```cpp
constexpr uint8_t PERIPHERAL_I2C_ADDR = 0x42;
```

###  Côté contrôleur

Le code du contrôleur doit :

- Inclure la bibliothèque `MicroRemoteWireController`.
- Configurer la communication avec l'ordinateur.
- **Pour chaque périphérique** : Créer un objet en lui passant le bus `Wire` et l’adresse configurée dans le code du périphérique.

Dans le dossier `examples/controller-atompoe` du [git de MicroRemoteWire](https://github.com/thomasfredericks/MicroRemoteWire), il y a un exemple pour une carte configurée en tant que contrôleur : [controller-atompoe](https://github.com/thomasfredericks/MicroRemoteWire/tree/main/examples/controller-atompoe)

Voici la configuration de `platformio.ini` de l'exemple:
```ini
[env:m5stack-atom]
platform = espressif32
board = m5stack-atom
framework = arduino
monitor_speed = 115200
lib_deps = 
    https://github.com/thomasfredericks/MicroRemoteWire
    https://github.com/thomasfredericks/MicroNet
    https://github.com/thomasfredericks/MicroOsc
    FastLED
```

L'exemple est assez complexe puisqu'il initialise une connexion Ethernet avec MicroNet et une communication UDP OSC avec [MicroOsc](/microosc/).

**Il y a quelques éléments du code à configurer.**

**À configurer** : Indiquer les périphériques en ajoutant à `remote[ ]` une entrée pour chaque périphérique sur le bus I2C en spécifiant son adresse (l'adresse choisie lors du téléversement sur le périphérique). Ici, il y a 3 périphériques avec les adresses `0x42`, `0x43` et `0x44` :
```cpp
MicroRemoteWireController remote[] = {
    {Wire, 0x42},
    {Wire, 0x43},
    {Wire, 0x44},
};
```

**À configurer** : Ensuite, il faut indiquer le nom de l'ordinateur vers lequel l'Atom POE doit envoyer les messages OSC. Modifier la valeur de la variable `nameToResolve` pour que cela corresponde au nom mDNS de l'ordinateur :
```cpp
const char * nameToResolve = "CM585787"; // Ne pas utiliser le suffixe ".local" / Do not append ".local"
``` 

L'Atom POE doit aussi être attibué un nom mDNS. **Il n'est pas nécessaire de le modifier ; les informations suivantes sont fournies à titre indicatif** : dans cet exemple, le nom est généré automatiquement grâce au bloc de code ci-dessous. Ce code crée le nom mDNS de l'ATOM POE en utilisant le préfixe `"atom-"` suivi de trois codes hexadécimaux extraits de l'adresse MAC de l'ESP32 :
```cpp
// Créer le nom de l'appareil pour mDNS
char myName[MICRO_NET_NAME_MAX_LENGTH] = "atom-"; // préfixe du nom
myMicroNet.appendMacToCString(myName, MICRO_NET_NAME_MAX_LENGTH, 3);
// Configure Ethernet et démarre le réseau et mDNS
myMicroNet.begin(myName);
```

> [!WARNING]
> Après le téléversement du code, **ouvrir le moniteur série**. Le nom mDNS de l'ATOM POE ainsi que son adresse IP devraient s'y afficher.

Le pixel RGB de l'ATOM sert de témoin visuel pour indiquer différentes étapes de l'exécution du programme :

- **Animation de démarrage (3 secondes)**  
   - Signaler que l'appareil est en cours de démarrage et que les périphériques sont en train de s'initialiser.
-  **Rouge (`CRGB(255, 0, 0)`)**  
   - Allumé juste après l'initialisation des LED et avant la configuration réseau.  
   - Indique que le programme a démarré et que le microcontrôleur est prêt à configurer le réseau et mDNS.
- **Jaune (`CRGB(255, 255, 0)`)**  
   - Allumé après que l'appareil ait été connecté au réseau Ethernet.  
   - Indique que la connexion réseau est établie et que l'appareil a obtenu une adresse IP.
- **Vert (`CRGB(0, 255, 0)`)**  
   - Allumé après que l'adresse IP de la cible (`nameToResolve`) ait été résolue via mDNS.  
   - Signifie que le programme peut maintenant envoyer et recevoir des messages OSC vers/depuis la cible.



### Côté Pure Data

Dans le dossier `examples/controller-atompoe` du [git de MicroRemoteWire](https://github.com/thomasfredericks/MicroRemoteWire), il y a un le patch `osc_udp_controller-atompoe.pd` pour Pure Data qui démontrer comment communiquer avec le contrôleur. Ne pas oublier de modifier le nom mDNS du Atom POE dans la section jaune du patcher.

![Patch Pure Data osc_udp_controller-atompoe.pd](./osc_udp_controller-atompoe.pd.png)