# Le code Arduino

## Variables les plus communes pour l'ESP32

| Type | Taille | Étendue | Commentaire  | 
|---------|---------|---------|---------|
| `bool`    | 1 bit   |  0 ou 1  | Voir le tableau suivant |
| `int`   | 32 bits     |  -2 147 483 648 à 2 147 483 647  | Nombre général |
| `unsigned long`    | 32 bits      |  0 à 4 294 967 295    | Pour stocker du temps en millisecondes |

## Alias des valeurs d'un `bool`

| 0 | 1 | 
|---------|---------|
| `false`    | `true ` |
| `LOW`    | `HIGH ` |
| `INPUT`    | `OUTPUT ` |

## D'autres variables assez communes

| Type | Taille | Commentaire |
|---------|---------|---------|
| `float`     | 32 bits      | -3.4028235E+38 à 3.4028235E+38 | Pour stocker un nombre décimal    |
| `char`     | 8 bits     |  Pour stocker des caractères        |
| `byte`    | 8 bits     |   Pour stocker un nombre compris entre 0 et 255      |


## Code minimal

```cpp
// VARIABLE GLOBALES

void setup() {
  // CODE À ROULER AU DÉMARRAGE

}

void loop() {
  // CODE À RÉPÉTER (LE PLUS RAPIDEMENT POSSIBLE)

}
```
On retrouve deux fonctions dans le code minimal : 
* `setup()`
* `loop()`

### setup()

La fonction setup() est appelée une seule fois lorsque le programme commence. C'est pourquoi c'est dans cette fonction que l'on va écrire le code qui n'a besoin d'être exécuté qu’une seule fois. C'est une  fonction d'initialisation. On y retrouvera la mise en place des différentes sorties et quelques autres réglages.

### loop()

Une fois que l'on a initialisé le programme, il faut ensuite créer le «cœur» du programme, autrement dit le programme en lui-même. C'est dans la fonction loop() que l’on va écrire le contenu du programme. Il faut savoir que cette fonction est appelée en permanence, c'est-à-dire qu'elle est exécutée une fois, puis lorsque son exécution est terminée, on l'exécute, encore et encore. On parle de boucle infinie!



## Les instructions 

Les instructions sont des lignes de code qui disent au programme : « fais ceci, fais cela… » Ce sont donc les ordres qui seront exécutés par l'Arduino. Il est très important de respecter exactement la syntaxe ; faute de quoi, le code ne pourra pas être exécuté.

### Les points-virgules

Les points-virgules terminent les instructions.

### Les accolades { }

Les accolades groupent plusieurs instructions en blocs.

### Les commentaires

Les commentaires sont des lignes de code qui seront ignorées lors de la compilation du code.  Ils sont destinés à informer le lecteur humain.

Ligne unique de commentaire :
```cpp
// cette ligne est un commentaire sur UNE SEULE ligne
```

Ligne ou paragraphe sur plusieurs lignes :
```cpp
/* cette ligne est un commentaire, sur PLUSIEURS lignes
qui sera ignoré par le programme, mais pas par celui qui lit le code ;) */
```

### Les fonctions

Une fonction est un bloc d'instructions que l'on peut appeler d'ailleur dans notre code.

Le langage Arduino est constitué d'un certain nombre de fonctions prédéfinies comme par exemple `analogRead()`, `digitalWrite()` ou `millis()`.

Il est possible de déclarer ses propres fonctions par exemple :
```cpp
void clignote(){
    digitalWrite (brocheLED,  HIGH) ;
    delay (1000) ;
    digitalWrite (brocheLED,  LOW) ;
    delay (1000) ;
}
```
Pour exécuter cette fonction, il suffit de taper la commande :
```cpp
clignote();
```
On peut faire intervenir un ou des paramètres dans une fonction :
```cpp
void clignote(int broche,int intervalle){
    digitalWrite (broche, HIGH) ;
    delay (intervalle) ;
    digitalWrite (broche, LOW) ;
    delay (intervalle) ;
}
```

Dans ce cas, l'on peut moduler leurs valeurs depuis la commande qui l'appelle :
```cpp
clignote(5,1000); //la sortie 5 clignotera vite
clignote(3,250); //la sortie 3 clignotera lentement
```

### Les opérateurs logiques

| Opérateur | Signification | 
|---------|---------|
| `&&`    | Et |
| `\|\|`    | Ou |
| `!`    | Contraire |

### Les opérateurs de comparaison

| Opérateur | Signification | 
|---------|---------|
| `==`    | Égale |
| `!=`    | Pas égale |
| `>`    | Plus grand que |
| `>=`    | Plus grand que ou égal |
| `<`    | Plus petite que |
| `<=`    | Plus petite que ou égal |


### Les structures de contrôle

Les structures de contrôle sont des blocs d'instructions qui s'exécutent en fonction du respect d'un certain nombre de conditions.

Il existe quatre types de structure :

`if...else` : exécute un code si certaines conditions sont remplies et éventuellement exécutera un autre code avec sinon.

Exemple :
```cpp
//si la valeur du capteur depasse le seuil
if(valeurCapteur>seuil){
    //appel de la fonction clignote
    clignote();
}
```
`while` : exécute un code tant que certaines conditions sont remplies.

Exemple :
```cpp
//tant que la valeur du capteur est supérieure à 250
while(valeurCapteur>250){
    //allume la sortie 5
    digitalWrite(5,HIGH);
    //en boucle tant que valeurCapteur est supérieue à 250
}

digitalWrite(5,LOW);
```
`for` : exécute un code pour un certain nombre de fois.

Exemple :
```cpp
//pour i de 0 à 255, par pas de 1
for (int i=0; i <= 255; i++){
    analogWrite(PWMpin, i);
    delay(10);
}
```
`switch...case` : fait un choix entre plusieurs codes parmi une liste de possibilités

Exemple :
```cpp
// fait un choix parmi plusieurs messages reçus
switch (message) {
    case 0: //si le message est "0"
        //allume que la sortie 3
        digitalWrite(3,HIGH);
        digitalWrite(4,LOW);
        digitalWrite(5,LOW);
        break;
    case 1: //si le message est "1"
        //allume que la sortie 4
        digitalWrite(3,HIGH);
        digitalWrite(4,LOW);
        digitalWrite(5,LOW);
        break;
    case 2: //si le message est "2"
        //allume que la sortie 5
        digitalWrite(3,LOW);
        digitalWrite(4,LOW);
        digitalWrite(5,HIGH);
        break;
    }
```

## Quelques instructions Arduino prédéfinies

* [digitalRead()](https://www.arduino.cc/reference/fr/language/functions/digital-io/digitalread/)
* [digitalWrite()](https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/)
* [pinMode()](https://www.arduino.cc/reference/en/language/functions/digital-io/pinmode/)
* [analogRead()](https://www.arduino.cc/reference/en/language/functions/analog-io/analogread/)
* [delay()](https://www.arduino.cc/reference/en/language/functions/time/delay/)
* [millis()](https://www.arduino.cc/reference/en/language/functions/time/millis/)
* [random()](https://www.arduino.cc/reference/en/language/functions/random-numbers/random/)
* [map()](https://www.arduino.cc/reference/en/language/functions/math/map/)
* [Serial.begin()](https://www.arduino.cc/reference/en/language/functions/communication/serial/begin/)
* [Wire.begin()](https://www.arduino.cc/reference/en/language/functions/communication/wire/begin/)