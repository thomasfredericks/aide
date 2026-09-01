# Le code Arduino

Le code Arduino est basé sur le code C++ (C plus plus). Il faut donc savoir avant tout comment [coder en C++](../../cpp/code/). 

Ensuite, Arduino fournit de nombreuses fonctions permettant d'interagir avec les entrées, les sorties, le temps et les communications.

## `pinMode()`

La fonction `pinMode()` permet de configurer une broche :

| Syntaxe | Signification |
|---|---|
| `pinMode(BROCHE, INPUT)` | Configure la broche `BROCHE` comme entrée |
| `pinMode(BROCHE, INPUT_PULLUP)` | Configure la broche `BROCHE` comme entrée avec la résistance pull-up interne activée |
| `pinMode(BROCHE, OUTPUT)` | Configure la broche `BROCHE` comme sortie |

## `digitalWrite()`

La fonction `digitalWrite()` permet d'envoyer un niveau électrique sur une broche configurée comme sortie :

| Syntaxe | Signification |
|---|---|
| `digitalWrite(BROCHE, LOW)` | Envoie 0 volt à la broche `BROCHE` |
| `digitalWrite(BROCHE, HIGH)` | Envoie la tension logique haute à la broche `BROCHE` |

> [!WARNING]
> Sur une carte ESP32, la tension logique haute est généralement de **3,3 V**. Il ne faut donc pas systématiquement associer `HIGH` à 5 V.

## `digitalRead()`

La fonction `digitalRead()` permet de lire l'état logique d'une broche configurée comme entrée :

| Syntaxe | Valeur retournée | Signification |
|---|---|---|
| `digitalRead(BROCHE)` | `LOW` | La broche est à l'état logique bas |
| `digitalRead(BROCHE)` | `HIGH` | La broche est à l'état logique haut |

## `analogRead()`

La fonction `analogRead()` permet de mesurer une tension sur une entrée analogique :

| Syntaxe | Signification |
|---|---|
| `analogRead(BROCHE)` | Lit la valeur analogique présente sur la broche `BROCHE` |

La valeur retournée dépend de la carte utilisée et de sa résolution analogique.

## `delay()`

La fonction `delay()` permet d'attendre pendant une durée exprimée en millisecondes :

| Syntaxe | Signification |
|---|---|
| `delay(DUREE)` | Bloque l'exécution du programme pendant `DUREE` millisecondes |

> [!WARNING]
> Il faut éviter d'utiliser `delay()`.
> Les temporisations seront réalisées avec la bibliothèque `Chrono` afin de conserver un programme réactif.

## `millis()`

La fonction `millis()` permet de connaître le nombre de millisecondes écoulées depuis le démarrage du programme :

| Syntaxe | Signification |
|---|---|
| `millis()` | Retourne le nombre de millisecondes écoulées depuis le démarrage |

## `random()`

La fonction `random()` permet de générer un nombre pseudo-aléatoire :

| Syntaxe | Signification |
|---|---|
| `random(MAXIMUM)` | Génère un nombre compris entre `0` et `MAXIMUM - 1` |
| `random(MINIMUM, MAXIMUM)` | Génère un nombre compris entre `MINIMUM` et `MAXIMUM - 1` |

## `map()`

La fonction `map()` permet de convertir une valeur d'une plage vers une autre :

| Syntaxe | Signification |
|---|---|
| `map(VALEUR, MIN_ENTREE, MAX_ENTREE, MIN_SORTIE, MAX_SORTIE)` | Convertit `VALEUR` de la plage d'entrée vers la plage de sortie |



