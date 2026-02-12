# Nano : Arduino Terminals

<!-- toc -->

[Arduino Terminals](https://codeberg.org/tim-montmorency/arduino_terminals) est un support pour cartes Arduino avec borniers à vis larges pour le bus I2C, 4 entrées analogiques et 8 entrées/sorties numériques.

![Photo d'un Arduino Terminals avec une carte Nano](./arduino_terminals.jpg)

## Broches d'entrée analogique

Les broches analogiques sont :
- `A0`
- `A1`
- `A2`
- `A3`

Pour effectuer une lecture sur une de ces broches, utiliser `analogRead()` en spécifiant la broche, `A1` dans cet exemple :
```cpp
int valeur = analogRead(A1)
```

## Broches d'entrée numérique

Les broches d'entrée numérique sont :
- `2`
- `4`
- `8`
- `9`

Pour effectuer une lecture sur une de ces broches, utiliser `digitlRead()` en spécifiant la broche, `8` dans cet exemple :
```cpp
int valeur = digitalRead(8)
```

## Broches de sortie analogique

Les broches de sortie analogique sont :
- `3`
- `5`
- `6`
- `10`

Pour envoyer 5 V sur une de ces broches, utiliser `digitlWrite()` en spécifiant la broche, `3` dans cet exemple, et le mot clé `HIGH` :
```cpp
digitalWrite(3, HIGH)
```

Pour envoyer 0 V sur une de ces broches, utiliser `digitlWrite()` en spécifiant la broche, `3` dans cet exemple, et le mot clé `LOW` :
```cpp
digitalWrite(3, LOW)
```

Pour envoyer une tension proportionnelle entre 0 et 5 V sur une de ces broches, utiliser `analogWrite()` en spécifiant la broche, `3` dans cet exemple, et remplacer la variable `intensity` par un `uint8_t` entre 0 et 255 (inclusivement) :
```cpp
analogWrite(3, intensity )
```

## Exemples

### Bouton d'arcade

#### Préparation du bouton

Il faut souder 2 paires de fils (donc 4 au total) au bouton d'arcade :
- Première paire : positif(+) et négatif(-) de la DEL. Il est important de distinguer le positif du négatif. Le négatif sera raccordé au GND.
- Deuxième paire : les 2 broches de l'interrupteur. Ces deux broches sont interchangeables. L'une des broches sera raccordée au GND.

Les points de soudure et les étiquettes diffèrent selon chaque modèle. Cet exemple utilise 
le [bouton Arcade Button with LED – 30mm Translucent Red d'Adafruit ](https://www.adafruit.com/product/3489).

> [!NOTE]
> L'important est de repérer les broches et d'y souder 4 fils idéalement de couleurs différents.

> [!NOTE]
> Une broche de l'interrupteur peut être soudé au négatif de la DEL, ce qui résultera en 3 fils (plutôt) que 4.


#### Branchement

Les broches du bouton doivent être branchés à l'Arduino selon la logique suivante :

| Bouton d'arcade | Arduino |
| --- | --- |
| positif(+) | sortie analogique |
| négatif(-) | GND |
| une broche de l'interrupteur | entrée numérique |
| l'autre broche de l'interrupteur | GND |

> [!NOTE]
> À noter que les deux GND peuvent être branchés ensemble.

Dans l'image qui suit voici les branchements au Arduino Terminals :

| Bouton d'arcade | Arduino Terminals |
| --- | --- |
| positif(+) | 3 (sortie analogique) |
| négatif(-) | GND |
| une broche de l'interrupteur | 2 (entrée analogique) |
| l'autre broche de l'interrupteur | GND (passe par négatif de la DEL)  |

![Un bouton d'arcade branché à un Arduino Terminals](./arduino_terminals_arcade.png)

Pour effectuer la lecture de l'interrupteur :
```cpp
int valeur = digitalRead(2)
```

Pour allumer la DEL :
```cpp
digitalWrite(3, HIGH)
```

Pour éteindre la DEL :
```cpp
digitalWrite(3, LOW)
```

Pour allumer la DEL au quart de sa puissance :
```cpp
analogWrite(3, 63 )
```

### Potentiomètre

Un potentiomètre standard possède **trois broches** :

- Une broche reliée au **5V (ou 3.3V)**  
- Une broche reliée au **GND**  
- Une broche centrale appelée **curseur (signal)**  

Le curseur fournit une tension variable comprise entre 0V et 5V (ou 3.3V selon la carte), selon la position de rotation du potentiomètre.

- Les deux broches extérieures peuvent être inversées (cela inversera simplement le sens de variation).
- La broche centrale doit être reliée à une **entrée analogique**.

Le branchement du potentiomètre à un microcontrôleur se fait selon la logique suivante :

| Potentiomètre | Microcontrôleur |
|--------------|-----------------|
| Broche extérieure | 5V (ou 3.3V) |
| Broche centrale (curseur) | Entrée analogique |
| Autre broche extérieure | GND |

Dans l'image qui suit, voici le branchement au Arduino Terminals :

| Potentiomètre | Arduino Terminals  |
|--------------|-----------------|
| Broche extérieure | 5V  |
| Broche centrale (curseur) | A2 |
| Autre broche extérieure | GND |

![Un potentiomètre branché à un Arduino Terminals](./arduino_terminals_pot.png)

Le code pour récupérer la valeur :
```cpp
int valeur = analogRead(A2)
```