# Arduino : traiter le changement

Dans un système interactif, la plupart des actions ne doivent pas être exécutées en continu, mais seulement lorsqu’un changement significatif se produit. Traiter le changement consiste à comparer l’état actuel d’une entrée avec son état précédent afin de déclencher une action uniquement au moment pertinent.

Cette approche permet de réduire les calculs inutiles, d’éviter les répétitions et de produire des comportements plus clairs et plus contrôlables.


Le modèle de ce traitement :
- **ACQUISITION** : Lire la nouvelle valeur et la mettre dans une variable temporaire **unique**.
- **CONDITION** : Comparer la valeur dans la variable temporaire avec la valeur dans la mémoire. Mettre en mémoire la nouvelle valeur.  
    - **ACTION** : Effectuer une action si la valeur est différente.

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

## Détection de front (edge detection)

Pour un bouton, on peut vouloir détecter uniquement le moment précis où il est pressé, et non son état continu.

Dans l’exemple qui suit, le type de donnée est `int` et nous lisons une entrée numérique avec `digitalRead(2)`. Ces deux éléments doivent être adaptés selon le contexte. Le principe reste le même : on compare l’état actuel avec l’état mémorisé afin de détecter un changement précis, ici le moment où le bouton est pressé.

```cpp
int etatPrecedent; // une variable en mémoire pour CHAQUE bouton

void loop() {

  // 1. Lire l’état actuel et le mettre dans une variable temporaire
  int etatActuel = digitalRead(2);

  // 2. Comparer l’état actuel avec l’état en mémoire
  if (etatActuel == HIGH && etatPrecedent == LOW) {

    // 3. Effectuer une action lors du changement d’état
    // Le bouton vient d’être pressé
    // ACTION ICI
  }

  // 4. Mettre en mémoire le nouvel état
  etatPrecedent = etatActuel;
}
```

L’action `ACTION ICI`ne se produit qu’au moment précis où le signal passe de LOW à HIGH. Le bouton peut rester appuyé plusieurs secondes, mais l’événement n’est détecté qu’une seule fois, au moment de la transition.

On détecte ici un front montant.

Un bouton possède deux états : appuyé ou relâché. Si le programme teste simplement si le bouton est appuyé, l’action sera exécutée en continu tant que le bouton reste enfoncé. Dans beaucoup de situations, ce comportement n’est pas souhaité. On veut plutôt réagir une seule fois, au moment précis du changement.

La détection de front consiste à observer la transition entre deux états :

- front montant : passage de LOW à HIGH (le bouton est pressé)
- front descendant : passage de HIGH à LOW (le bouton est relâché)

Exemple de détection de relâchement :

```cpp
if (etatActuel == LOW && etatPrecedent == HIGH) {
  // Le bouton vient d’être relâché
}
```

Cette technique est essentielle pour :

- incrémenter une valeur une seule fois par pression
- changer de mode
- déclencher un événement ponctuel
- éviter les répétitions rapides

Dans les systèmes physiques, les boutons produisent souvent des rebonds électriques (bounce). Lors d’une pression, le signal peut osciller rapidement entre HIGH et LOW pendant quelques millisecondes. Dans les projets simples, ce phénomène peut être ignoré, mais dans des systèmes plus précis, on ajoute un délai minimal ou un filtrage temporel pour stabiliser la détection.

Traiter le changement plutôt que l’état continu permet de structurer les interactions autour d’événements. Cette logique rapproche le programme du fonctionnement réel des interfaces interactives, où ce sont les transitions qui portent le sens de l’action.

## Détection de front avec `Bounce2::Button`

Dans l’exemple précédent, la détection de front était réalisée manuellement en comparant l’état actuel avec l’état précédent. La bibliothèque `Bounce` simplifie cette logique en intégrant la gestion des rebonds électriques (bounce) et la détection des transitions.

La classe `Bounce2::Button` permet de :

- stabiliser le signal du bouton
- détecter automatiquement les fronts montants et descendants
- éviter l’écriture manuelle d’une variable `etatPrecedent`

Dans l’exemple qui suit, la broche doit être adaptée selon le contexte.

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

  // Mettre à jour l’état du bouton (obligatoire à chaque boucle)
  bouton.update();

  // Détection d’un front montant (bouton pressé)
  if (bouton.pressed()) {

    // ACTION ICI
  }

  // Détection d’un front descendant (bouton relâché)
  if (bouton.released()) {

    // ACTION ICI
  }
}
```

Dans cet exemple :

- `bouton.update()` réalise l’ACQUISITION et le filtrage interne.
- `bouton.pressed()` détecte automatiquement le front montant.
- `bouton.released()` détecte automatiquement le front descendant.

La bibliothèque gère les rebonds électriques en interne, ce qui rend le code plus simple, plus robuste et plus lisible.

Le principe reste le même que dans la détection manuelle : l’action ne se produit qu’au moment précis du changement d’état, et non pendant toute la durée où le bouton reste appuyé.
