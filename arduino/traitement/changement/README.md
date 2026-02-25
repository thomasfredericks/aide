# Arduino : traiter le changement

Dans un système interactif, la plupart des actions ne doivent pas être exécutées en continu, mais seulement lorsqu’un changement significatif se produit. Traiter le changement consiste à comparer l’état actuel d’une entrée avec son état précédent afin de déclencher une action uniquement au moment pertinent.

Cette approche permet de réduire les calculs inutiles, d’éviter les répétitions et de produire des comportements plus clairs et plus contrôlables.


Le modèle de ce traitement :
- **ACQUISITION** : Lire la nouvelle valeur et la mettre dans une variable temporaire **unique**.
- **CONDITION** : Comparer la valeur dans la variable temporaire avec la valeur dans la mémoire. Mettre en mémoire la nouvelle valeur.  
    - **ACTION** : Effectuer une action si la valeur est différente.

## Détection simple de changement

On compare la valeur actuelle à la valeur précédente.

Dans l'exemple qui suit, le type de donnée est `int` et nous lisons une valeur analogique avec `analogRead(0)`. Ces deux éléments doivent être adaptés selon le contexte.
```cpp

int valeurPrecedente; // variable en mémoire

void loop() {


  // 1. Lire la nouvelle valeur et la mettre dans une variable temporaire
  int nouvelleValeur = analogRead(0);

  // 2. Comparer la valeur dans la variable temporaire avec la valeur dans la mémoire
  if (nouvelleValeur != valeurPrecedente) {

    // 3. Effectuer une action si la valeur est différente
    // ACTION ICI

    // 4. Mettre en mémoire la nouvelle valeur
    valeurPrecedente = nouvelleValeur;
  }
}
```

L’action `ACTION ICI` ne se produit que si la valeur change.

Cette méthode est la forme la plus simple de détection de changement. À chaque itération de la boucle, le programme lit une nouvelle valeur et vérifie si elle est différente de la précédente. Si c’est le cas, l’action est exécutée, puis la nouvelle valeur devient la référence pour la prochaine comparaison.

Ce principe est fondamental dans les systèmes interactifs. Sans cette vérification, certaines actions seraient répétées des centaines ou des milliers de fois par seconde.

## Détection de front (edge detection) avec Bounce2::Button

Pour un bouton, on peut selon le contexte vouloir détecter uniquement le moment précis où il est pressé ou relaché, et non son état continu.

 La bibliothèque `Bounce` simplifie cette logique en intégrant la gestion des rebonds électriques (bounce) et la détection des transitions.

La classe `Bounce2::Button` permet de :

- stabiliser le signal du bouton
- détecter automatiquement les fronts montants et descendants
- éviter l’écriture manuelle d’une variable `etatPrecedent`

Dans l’exemple qui suit, la broche doit être adaptée selon le contexte. Une instance de `Bounce2::Button bouton = Bounce2::Button();` doit être créée et gérée pour chaque bouton

### Dans l’espace global

```cpp
#include <Bounce2.h>
Bounce2::Button bouton = Bounce2::Button();
```

### Dans `setup()`

```cpp
void setup() {
  pinMode(2, INPUT_PULLUP); // modifier la broche si nécessaire

  bouton.attach(2);         // associer le bouton à la broche
  bouton.interval(5);       // durée du filtrage en millisecondes
  bouton.setPressedState(LOW); // avec INPUT_PULLUP, LOW = bouton pressé
}
```

### Dans `loop()`

```cpp
void loop() {

  // ACQUISITION de la valeur du bouton
  bouton.update();

  // CONDITION : Détection d’un front montant (bouton pressé)
  if (bouton.pressed()) {

    // ACTION ICI
  }

  // CONDITION : Détection d’un front descendant (bouton relâché)
  if (bouton.released()) {

    // ACTION ICI
  }
}
```

La bibliothèque gère les rebonds électriques en interne, ce qui rend le code plus simple, plus robuste et plus lisible. 