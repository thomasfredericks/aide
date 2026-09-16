# Arduino Serial : communication sérielle

La **communication sérielle** est une méthode qui permet à votre carte Arduino d'échanger des données avec un autre appareil (comme votre ordinateur, un module Bluetooth ou un autre microcontrôleur) **bit par bit**.  C'est un peu comme envoyer un message texte mot par mot à la place d'un message entier en un bloc.

Pour bien comprendre ce principe, on peut faire le lien avec le **code Morse** :

| Point comparatif | En code Morse | En communication sérielle Arduino |
| :--- | :--- | :--- |
| **Encodage des données** | Chaque lettre est convertie en une succession de signaux courts (**points**) et longs (**traits**), envoyés rigoureusement dans un ordre précis. | Les informations (comme les octets d'un texte ou d'un nombre) sont découpées et envoyées **bit par bit** sous forme d'impulsions électriques (niveaux HAUT et BAS, représentant les `1` et les `0`). |
| **Réception et décodage** | L'opérateur de l'autre côté doit décoder le flux temporel pour reformer les lettres et les mots. | Tout comme le Morse, le récepteur (l'ordinateur) lit ce rythme temporel pour reconstituer le message d'origine, en s'accordant sur une vitesse commune (les *bauds*, qui jouent le rôle du rythme d'émission en Morse). |

![Le code Morse](./code_morse.png)

La communication sérielle peut avoir les utilités suivantes :

* **Le débogage :** C'est le moyen le plus simple de voir ce que fait votre code en temps réel en affichant des messages dans le *Moniteur Série* de l'IDE Arduino.
* **Le contrôle :** Permet d'envoyer des ordres depuis votre ordinateur vers l'Arduino ou de récupérer les valeurs mesurées par des capteurs pour les analyser sur un ordinateur.


La classe `Serial` permet de communiquer avec l'ordinateur ou un autre appareil par une liaison série.

Voici la méthode de configuration :

| Syntaxe | Description |
|---|---|
| `Serial.begin(VITESSE)` | À utiliser dans `setup()` habituellement. Initialise la communication série avec une vitesse de `VITESSE` bauds. Privilégier la vitesse `115200` (la vitesse `9600` est désuète depuis longtemps) |


Ensuite, il existe plusieurs façons d'encoder l'information :

- En ASCII
- En binaire
- En Open Sound Control (OSC)
- etc

Arduino fournit des méthodes de base pour encoder et décoder **ASCII** (*American Standard Code for Information Interchange*). C'est une table de correspondance universelle où chaque caractère (lettre, chiffre, symbole, ponctuation) est associé à un nombre décimal précis (de 0 à 127).

Par exemple, pour envoyer la lettre `A`, l'Arduino convertit ce caractère en son code ASCII, c'est-à-dire le nombre décimal `65`, qui s'écrit `01000001` en binaire. Il envoie ensuite ces 8 bits, l'un après l'autre, sur le fil de transmission. 

Le récepteur (par exemple, votre ordinateur) capte ce flux, reconstitue l'octet `01000001`, et consulte la table ASCII pour comprendre que cette valeur correspond au caractère `A`.

| Binaire | Déc | ASCII | Binaire | Déc | ASCII | Binaire | Déc | ASCII | Binaire | Déc | ASCII |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `00000000` | 0 | NUL | `00100000` | 32 | SPC | `01000000` | 64 | @ | `01100000` | 96 | \` |
| `00000001` | 1 | SOH | `00100001` | 33 | ! | `01000001` | 65 | A | `01100001` | 97 | a |
| `00000010` | 2 | STX | `00100010` | 34 | " | `01000010` | 66 | B | `01100010` | 98 | b |
| `00000011` | 3 | ETX | `00100011` | 35 | # | `01000011` | 67 | C | `01100011` | 99 | c |
| `00000100` | 4 | EOT | `00100100` | 36 | $ | `01000100` | 68 | D | `01100100` | 100 | d |
| `00000101` | 5 | ENQ | `00100101` | 37 | % | `01000101` | 69 | E | `01100101` | 101 | e |
| `00000110` | 6 | ACK | `00100110` | 38 | & | `01000110` | 70 | F | `01100110` | 102 | f |
| `00000111` | 7 | BEL | `00100111` | 39 | ' | `01000111` | 71 | G | `01100111` | 103 | g |
| `00001000` | 8 | BS | `00101000` | 40 | ( | `01001000` | 72 | H | `01101000` | 104 | h |
| `00001001` | 9 | TAB | `00101001` | 41 | ) | `01001001` | 73 | I | `01101001` | 105 | i |
| `00001010` | 10 | LF | `00101010` | 42 | * | `01001010` | 74 | J | `01101010` | 106 | j |
| `00001011` | 11 | VT | `00101011` | 43 | + | `01001011` | 75 | K | `01101011` | 107 | k |
| `00001100` | 12 | FF | `00101100` | 44 | , | `01001100` | 76 | L | `01101100` | 108 | l |
| `00001101` | 13 | CR | `00101101` | 45 | - | `01001101` | 77 | M | `01101101` | 109 | m |
| `00001110` | 14 | SO | `00101110` | 46 | . | `01001110` | 78 | N | `01101110` | 110 | n |
| `00001111` | 15 | SI | `00101111` | 47 | / | `01001111` | 79 | O | `01101111` | 111 | o |
| `00010000` | 16 | DLE | `00110000` | 48 | 0 | `01010000` | 80 | P | `01110000` | 112 | p |
| `00010001` | 17 | DC1 | `00110001` | 49 | 1 | `01010001` | 81 | Q | `01110001` | 113 | q |
| `00010010` | 18 | DC2 | `00110010` | 50 | 2 | `01010010` | 82 | R | `01110010` | 114 | r |
| `00010011` | 19 | DC3 | `00110011` | 51 | 3 | `01010011` | 83 | S | `01110011` | 115 | s |
| `00010100` | 20 | DC4 | `00110100` | 52 | 4 | `01010100` | 84 | T | `01110100` | 116 | t |
| `00010101` | 21 | NAK | `00110101` | 53 | 5 | `01010101` | 85 | U | `01110101` | 117 | u |
| `00010110` | 22 | SYN | `00110110` | 54 | 6 | `01010110` | 86 | V | `01110110` | 118 | v |
| `00010111` | 23 | ETB | `00110111` | 55 | 7 | `01010111` | 87 | W | `01110111` | 119 | w |
| `00011000` | 24 | CAN | `00111000` | 56 | 8 | `01011000` | 88 | X | `01111000` | 120 | x |
| `00011001` | 25 | EM | `00111001` | 57 | 9 | `01011001` | 89 | Y | `01111001` | 121 | y |
| `00011010` | 26 | SUB | `00111010` | 58 | : | `01011010` | 90 | Z | `01111010` | 122 | z |
| `00011011` | 27 | ESC | `00111011` | 59 | ; | `01011011` | 91 | [ | `01111011` | 123 | { |
| `00011100` | 28 | FS | `00111100` | 60 | < | `01011100` | 92 | \ | `01111100` | 124 | \| |
| `00011101` | 29 | GS | `00111101` | 61 | = | `01011101` | 93 | ] | `01111101` | 125 | } |
| `00011110` | 30 | RS | `00111110` | 62 | > | `01011110` | 94 | ^ | `01111110` | 126 | ~ |
| `00011111` | 31 | US | `00111111` | 63 | ? | `01011111` | 95 | _ | `01111111` | 127 | DEL |

Un point crucial est que les nombres manipulés sont convertis en leur représentation textuelle ASCII (caractère par caractère) lors de l'envoi. Par exemple, le nombre `123` est envoyé sous forme de trois caractères distincts : `'1'`, `'2'` et `'3'`.

Voici les méthodes pour envoyer de l'ASCII :

| Syntaxe | Description |
|---|---|
| `Serial.print(VALEUR)` | Envoie `VALEUR` convertie en sa représentation ASCII sur la liaison série |
| `Serial.println(VALEUR)` | Envoie `VALEUR` convertie en sa représentation ASCII sur la liaison série suivi d'un saut de ligne (code 13 suivi du code 10 en ASCII) |

Voici les méthodes pour recevoir de l'ASCII :

| Syntaxe | Description |
|---|---|
| `Serial.available()` | Retourne le nombre de caractères ASCII disponibles à lire |
| `Serial.read()` | Lit un caractère ASCII reçu sur la liaison série |


## Moniteur série dans Visual Studio Code + PlatformIO 

Configurer le débit de la communication sérielle dans `platformio.ini` :
```
monitor_speed = 115200
```

Pour ouvrir le moniteur série :
![](vscode_platformio_serial_monitor.png)

Pour fermer le moniteur série :
![](vscode_platformio_serial_monitor_fermer.png)


## La structure [descripteur] [espace] [valeur] [saut de ligne (ln)]

Lorsque l'on souhaite envoyer des données structurées de l'Arduino vers l'ordinateur en ASCII, nous allons respecter cette règle de formatage précise : 
- un descripteur
- un espace
- une valeur
- suivi de `println()`.



Voici à quoi cela ressemble le code :
```cpp
Serial.print("TEMP"); // Descripteur
Serial.print(" "); // Espace
Serial.print(23); // Valeur
Serial.println(); // Saut de ligne
```

Voici à quoi cela ressemble le même code en version courte :

```cpp
Serial.print("TEMP ");  // Envoie le descripteur et son espace en un seul bloc
Serial.println(23);   // Envoie la valeur et ajoute automatiquement le saut de ligne final
```

Voici le résultat en ASCII (le retour à la ligne est invisible) :
```cpp
TEMP 23
``` 

-  Le descripteur donne un contexte à la donnée. Si l'ordinateur reçoit uniquement le nombre `23`, il est impossible de deviner s'il s'agit d'une température, d'une humidité ou d'une distance. Le descripteur permet au récepteur d'identifier immédiatement la nature de l'information.
- L'espace sert de séparateur clair. Sans cet espace, le texte et la valeur se colleraient (`TEMP23`), ce qui rendrait l'analyse automatique par un programme externe (comme Python ou Processing) beaucoup plus complexe pour isoler la valeur numérique.
- La fonction `println()` ajoute un saut de ligne, correspondant aux codes ASCII `13` suivi de `10`. C'est indispensable, car la communication sérielle est un flux continu de caractères sans pause naturelle. Le saut de ligne agit comme un délimiteur de fin de message, permettant au récepteur de savoir exactement où s'arrête un message et où commence le suivant.
