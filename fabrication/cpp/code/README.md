# Le code C++ (cpp)

<!-- toc -->

## Créer une variable

![](./code_creation_variable.drawio.png)

Une variable permet de stocker une valeur en mémoire afin de pouvoir l'utiliser ou la modifier dans le programme.

La syntaxe générale est :

```cpp
type nom = valeur;
```

Par exemple :

```cpp
int compteur = 0;
```

Ici, `compteur` est une variable de type `int` dont la valeur initiale est `0`.

## Types les plus communes

| Type | Taille | Étendue | Commentaire |
|---|---|---|---|
| `bool` (Arduino Nano) | 1 bit | `false` ou `true` | Pour stocker une valeur vraie ou fausse |
| `int` (Arduino Nano) | 16 bits | -32 768 à 32 767 | Pour stocker un nombre entier |
| `unsigned long` | 32 bits | 0 à 4 294 967 295 | Pour stocker notamment du temps en millisecondes |
| `float` | 32 bits | Pour stocker un nombre décimal |
| `char` | 8 bits | Pour stocker un caractère |
| `byte` | 8 bits | Pour stocker un nombre compris entre 0 et 255 |


## Les instructions

Les instructions sont des lignes de code qui indiquent au programme ce qu'il doit faire.

Il est très important de respecter exactement la syntaxe du langage. Une erreur de syntaxe empêchera la compilation du programme.

### Les points-virgules

Les points-virgules terminent les instructions.

```cpp
compteur = 0;
```

### Les accolades `{ }`

Les accolades permettent de regrouper plusieurs instructions dans un bloc.

```cpp
if (condition)
{
    instruction1;
    instruction2;
}
```

### Les commentaires

Les commentaires sont des lignes de code qui sont ignorées lors de la compilation.

Ils servent à expliquer le fonctionnement du programme au lecteur.

Pour écrire un commentaire sur une seule ligne :

```cpp
// Cette ligne est un commentaire
```

Pour écrire un commentaire sur plusieurs lignes :

```cpp
/*
Cette ligne est un commentaire.
Cette ligne aussi.
*/
```

## Les fonctions

Une fonction est un bloc d'instructions qui peut être appelé depuis une autre partie du programme.

Le langage Arduino met à disposition un certain nombre de fonctions prédéfinies comme `analogRead()`, `digitalWrite()` ou `millis()`.

Il est également possible de créer ses propres fonctions.

Par exemple :

```cpp
void clignote()
{
    digitalWrite(brocheLED, HIGH);
    delay(1000);
    digitalWrite(brocheLED, LOW);
    delay(1000);
}
```

Pour exécuter cette fonction, il suffit d'utiliser son nom :

```cpp
clignote();
```

Une fonction peut recevoir un ou plusieurs paramètres.

```cpp
void clignote(int broche, int intervalle)
{
    digitalWrite(broche, HIGH);
    delay(intervalle);
    digitalWrite(broche, LOW);
    delay(intervalle);
}
```

Les valeurs des paramètres peuvent alors être précisées lors de l'appel de la fonction :

```cpp
clignote(5, 1000);
clignote(3, 250);
```

Dans cet exemple, `5` correspond à la broche et `1000` à l'intervalle.

## Les opérateurs logiques

Les opérateurs logiques permettent de combiner ou d'inverser des conditions :

| Opérateur | Signification |
|---|---|
| `&&` | Et |
| `\|\|` | Ou |
| `!` | Contraire |

## Les opérateurs de comparaison

Les opérateurs de comparaison permettent de comparer deux valeurs :

| Opérateur | Signification |
|---|---|
| `==` | Est égal à |
| `!=` | Est différent de |
| `>` | Est plus grand que |
| `>=` | Est plus grand ou égal à |
| `<` | Est plus petit que |
| `<=` | Est plus petit ou égal à |

## Les structures de contrôle

Les structures de contrôle permettent d'exécuter certaines instructions en fonction de conditions.

### `if...else`

La structure `if...else` permet d'exécuter un bloc de code si une condition est vraie et, éventuellement, un autre bloc si elle est fausse.

```cpp
if (valeurCapteur > seuil)
{
    clignote();
}
```

### `while`

La structure `while` permet de répéter un bloc de code tant qu'une condition est vraie.

```cpp
while (valeurCapteur > 250)
{
    digitalWrite(5, HIGH);
}

digitalWrite(5, LOW);
```

> Dans un programme interactif, il faut être prudent avec `while`. Une boucle qui attend qu'une condition change peut empêcher le reste du programme de s'exécuter.

### `for`

La structure `for` permet de répéter un bloc de code un certain nombre de fois.

```cpp
for (int i = 0; i <= 255; i++)
{
    analogWrite(PWMpin, i);
    delay(10);
}
```

### `switch...case`

La structure `switch...case` permet de choisir un bloc de code parmi plusieurs possibilités.

```cpp
switch (message)
{
    case 0:
        digitalWrite(3, HIGH);
        digitalWrite(4, LOW);
        digitalWrite(5, LOW);
        break;

    case 1:
        digitalWrite(3, LOW);
        digitalWrite(4, HIGH);
        digitalWrite(5, LOW);
        break;

    case 2:
        digitalWrite(3, LOW);
        digitalWrite(4, LOW);
        digitalWrite(5, HIGH);
        break;
}
```
