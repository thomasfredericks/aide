# MicroRemoteWire

`MicroRemoteWire` est une micro-bibliothèque Arduino qui permet à un microcontrôleur Arduino d’en contrôler un autre via I2C/Wire.

![Un M5Stack Atom POE allimente et contrôle trois plaquettes Arduino Nano.](./mrw_nano_poe.png)

Par exemple, si un M5Stack Atom POE **alimente** et **contrôle** plusieurs plaquettes Arduino Nano :

- Le M5Stack Atom POE est le contrôleur, ce qui correspond au `MicroRemoteWireController` dans `MicroRemoteWire`.
- Les plaquettes Arduino Nano sont des `MicroRemoteWirePeripheral` dans `MicroRemoteWire`. 

Chaque `MicroRemoteWirePeripheral` doit se voir attribuer une adresse I2C/Wire unique.  
Le `MicroRemoteWireController` peut ensuite communiquer avec chaque `MicroRemoteWirePeripheral` en utilisant son adresse.

- Code source de la bibliothèque : https://github.com/thomasfredericks/MicroRemoteWire/tree/main  
- Exemple de code pour le `MicroRemoteWireController` : https://github.com/thomasfredericks/MicroRemoteWire/tree/main/examples/controller-atompoe  
- Exemple de code pour le `MicroRemoteWirePeripheral` : https://github.com/thomasfredericks/MicroRemoteWire/tree/main/examples/peripheral-nano  

## Principe de fonctionnement

`MicroRemoteWire` repose sur le bus I2C (appelé aussi Wire dans l’environnement Arduino).

- Le **contrôleur** envoie des commandes via I2C.
- Le **périphérique** reçoit ces commandes et les exécute (configuration de broche, écriture, lecture, etc.).
- Si nécessaire, le périphérique renvoie une valeur au contrôleur (par exemple lors d’un `digitalRead` ou d’un `analogRead`).

Le périphérique attend simplement les commandes envoyées par le contrôleur.

## Points importants

- Toutes les cartes doivent partager la masse (GND).
- Les lignes SDA et SCL doivent être correctement connectées.
- Chaque périphérique doit avoir une adresse I2C unique.


## Côté périphérique

Le périphérique doit :

1. Inclure la bibliothèque `MicroRemoteWirePeripheral`.
2. Initialiser le bus I2C avec son adresse.
3. Déclarer les fonctions `onReceive` et `onRequest`.

Exemple minimal :

```cpp
#include <Arduino.h>
#include <Wire.h>
#include <MicroRemoteWirePeripheral.h>

constexpr uint8_t PERIPHERAL_I2C_ADDR = 0x42;

MicroRemoteWirePeripheral peripheral;

void onReceive(int numBytes)
{
  peripheral.onReceive(Wire, numBytes);
}

void onRequest()
{
  peripheral.onRequest(Wire);
}

void setup()
{
  Wire.begin(PERIPHERAL_I2C_ADDR);
  Wire.onReceive(onReceive);
  Wire.onRequest(onRequest);
}

void loop()
{
}
```

##  Côté contrôleur

Le contrôleur doit :

1. Inclure la bibliothèque `MicroRemoteWireController`.
2. Créer un objet en lui passant le bus `Wire` et l’adresse du périphérique.

Exemple minimal :

```cpp
#include <Arduino.h>
#include <Wire.h>
#include <MicroRemoteWireController.h>

#define PERIPHERAL_I2C_ADDR 0x42

MicroRemoteWireController remote(Wire, PERIPHERAL_I2C_ADDR);

void setup()
{
  remote.setPinOutput(13);
}

void loop()
{
  remote.digitalWriteHigh(13);
  delay(1000);
  remote.digitalWriteLow(13);
  delay(1000);
}
```


### Configurer une broche en sortie

```cpp
remote.setPinOutput(pin);
```

Configure la broche `pin` comme sortie.

### Configurer une broche en entrée

```cpp
remote.setPinInput(pin);
```

Configure la broche `pin` comme entrée standard.

### Configurer une entrée avec résistance pull-up

```cpp
remote.setPinInputPullup(pin);
```

Active la résistance interne de tirage vers le haut.

### Configurer une entrée avec résistance pull-down

```cpp
remote.setPinInputPulldown(pin);
```

Active la résistance interne de tirage vers le bas (si supportée par la carte).

### Écriture numérique à l’état haut

```cpp
remote.digitalWriteHigh(pin);
```

Met la broche `pin` à l’état HIGH.

### Écriture numérique à l’état bas

```cpp
remote.digitalWriteLow(pin);
```

Met la broche `pin` à l’état LOW.

### Écriture analogique (PWM)

```cpp
remote.analogWrite(pin, value);
```

Envoie une valeur PWM comprise généralement entre 0 et 255.


### Lecture numérique

```cpp
uint8_t value = remote.digitalRead(pin);
```

Lit l’état logique de la broche (`0` ou `1`).

### Lecture analogique

```cpp
uint16_t value = remote.analogRead(pin);
```

Lit la valeur analogique (par exemple entre 0 et 1023 selon la carte).




