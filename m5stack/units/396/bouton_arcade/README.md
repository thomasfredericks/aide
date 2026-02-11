# M5Stack Unit 3.96 et bouton d'arcade
<!-- toc -->

## Préparation

Il faut souder 2 paires de fils (donc 4 au total) au bouton d'arcade :
- Première paire : positif(+) et négatif(-) de la DEL. Il est important de distinguer le positif du négatif.
- Deuxième paire : les 2 broches de l'interrupteur. Ces deux broches sont interchangeables.

Les points de soudure et les étiquettes diffèrent selon chaque modèle. Voici un exemple avec 
le [bouton Arcade Button with LED – 30mm Translucent Red d'Adafruit ](https://www.adafruit.com/product/3489)

**L'important est de repérer les broches et d'y souder 4 fils idéalement de couleurs différents.**

![Soudure du bouton](./unit_396_bouton_arcade_identification.png)

## Branchement générique

Les broches du bouton doivent être branchés à l'Arduino selon la logique suivante :

| Bouton d'arcade | Arduino |
| --- | --- |
| positif(+) | sortie analogique |
| négatif(-) | GND |
| une broche de l'interrupteur | entrée numérique |
| l'autre broche de l'interrupteur | GND |

À noter que les deux GND peuvent être branchés ensemble.

## Dans le cas d'un Unit 3.96 branché directement à l'Arduino

### Branchement

Pour le Unit 3.96 la logique de connexion générique correspond aux connexions suivantes :

| Bouton d'arcade | Unit 3.96  |
| --- | --- |
| positif(+) | #2 / Jaune |
| négatif(-) |  #4 / Noir / GND |
| une broche de l'interrupteur |  #1 / Blanc |
| l'autre broche de l'interrupteur |  #4 / Noir / GND |

À noter que les deux GND sont branchés ensemble.

![Connexion du bouton au Unit 3.96](./unit_396_bouton_arcade_connexion.png)

### Code

Nous devons définir deux broches :
- Une broche `ARCADE_LED_PIN` qui indique la broche à laquelle est branché le positif(+) du bouton d'arcade.
- Une broche `ARCADE_SWITCH_PIN` qui indique la broche à laquelle est branché une broche de l'interrupteur du bouton d'arcade.

Voici les # de broches pour un Unit 3.96 branché directement à un Atom Lite :
```cpp
#define ARCADE_LED_PIN 26
#define ARCADE_SWITCH_PIN 32
```

#### Code d'initialisation

Dans `setup()`, initialiser les broches, dans ce cas-ci, les broches du ATOM Lite :
```cpp
  pinMode(ARCADE_LED_PIN, INPUT_PULLUP);
  pinMode(ARCADE_SWITCH_PIN, OUTPUT);
```

#### Code d'utilisation

Pour obtenir la valeur du bouton :
```cpp
int valeur = digitalRead(ARCADE_SWITCH_PIN);
```

Pour allumer la DEL du bouton à pleine puissance :
```cpp
digitalWrite(ARCADE_SWITCH_PIN, 1);
```

Pour allumer la DEL du bouton à intensité variable, remplacer `intensity` par un `int8_t` entre 0 et 255 (inclusivement) :
```cpp

analogWrite(ARCADE_SWITCH_PIN, intensity );
```

Pour éteindre la DEL du bouton :
```cpp
digitalWrite(ARCADE_SWITCH_PIN, 0);
```

## Dans le cas d'un Unit 3.96 branché à un PbHub

### Branchement

Le branchement est similaire au branchement précédent, mais le PbHub ne permet pas d'utiliser la commande `pinMode()`. Il faut y remédier en ajoutant une résistance 10k.

Pour le Unit 3.96 la logique de connexion générique correspond aux connexions suivantes :

| Bouton d'arcade | Unit 3.96  | Résistance 10K |
| --- | --- | --- | 
| positif(+) | #2 / Jaune |  |
| négatif(-) |  #4 / Noir / GND | |
| une broche de l'interrupteur |  #1 / Blanc | Une broche de la résistance |
| l'autre broche de l'interrupteur |  #4 / Noir / GND | |
|                                  | #3 / Rouge |  Autre broche de la résistance   | 

À noter que :
- Les deux GND sont branchés ensemble.
- Une broche de l'interrupteur, le #1/blanc du 3.96 et une broche de la résistance sont branchés ensemble.

![Connexion du bouton au Unit 3.96 avec une résistance](./unit_396_bouton_arcade_pull-up.jpg)

### Code

Lorsqu'un PbHub est utilisé il faut indiquer le numéro de canal. Voici le cas si le Unit 3.96 est branché au canal `0` :
```cpp
#define ARCADE_CHAN 0
```

#### Code d'initialisation

Aucune configuration particulière autre que l'initialisation du PbHub.

#### Code d'utilisation

Pour obtenir la valeur du bouton :
```cpp
int valeur = myPbHub.digitalRead(ARCADE_CHAN);
```

Pour allumer la DEL du bouton à pleine puissance :
```cpp
myPbHub.digitalWrite(ARCADE_CHAN, 1);
```

Pour allumer la DEL du bouton à intensité variable, remplacer `intensity` par un `int8_t` entre 0 et 255 (inclusivement) :
```cpp
myPbHub.analogWrite( ARCADE_CHAN , intensity);
```

Pour éteindre la DEL du bouton :
```cpp
myPbHub.digitalWrite(ARCADE_CHAN, 0);
```
