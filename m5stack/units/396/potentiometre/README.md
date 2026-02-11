# M5Stack Unit 3.96 et potentiomètre

<!-- toc -->

## Introduction

Un potentiomètre standard possède **trois broches** :

- Une broche reliée au **5V (ou 3.3V)**  
- Une broche reliée au **GND**  
- Une broche centrale appelée **curseur (signal)**  

Le curseur fournit une tension variable comprise entre 0V et 5V (ou 3.3V selon la carte), selon la position de rotation du potentiomètre.


## Branchement générique

- Les deux broches extérieures peuvent être inversées (cela inversera simplement le sens de variation).
- La broche centrale doit être reliée à une **entrée analogique**.

Le branchement du potentiomètre à un microcontrôleur se fait selon la logique suivante :

| Potentiomètre | Microcontrôleur |
|--------------|-----------------|
| Broche extérieure | 5V (ou 3.3V) |
| Broche centrale (curseur) | Entrée analogique |
| Autre broche extérieure | GND |

## Branchement au 3.96

Pour le Unit 3.96 la logique de connexion générique correspond aux connexions suivantes :

| Potentiomètre | Unit 3.96 |
|--------------|------------|
| Broche extérieure | #3 / Rouge (VCC) |
| Broche centrale | #1 / Blanc (Signal) |
| Autre broche extérieure | #4 / Noir (GND) |

![Connexion d'un potentiomètre au Unit 3.96](./396_pot.png)

## Code dans le cas d’un Unit 3.96 branché directement à l’Arduino


Définition de la broche analogique correspondant au fil blanc du Unit 3.96  
(exemple pour un Atom Lite) :

```cpp
#define POTENTIOMETER_PIN 32
```

### Code d'initialisation

Aucune initialisation particulière n’est requise.

### Code d'utilisation

Lecture de la valeur :
```cpp
int valeur = analogRead(POTENTIOMETER_PIN);
```


## Code dans le cas d’un Unit 3.96 branché à un PbHub

Lorsqu'un PbHub est utilisé il faut indiquer le numéro de canal. Voici le cas si le Unit 3.96 est branché au canal `1` :

```cpp
#define POT_CHAN 1
```

### Code d'initialisation

Aucune initialisation particulière n’est requise.

### Code d'utilisation

Lecture de la valeur :
```cpp
int valeur = myPbHub.analogRead(POT_CHAN);
```