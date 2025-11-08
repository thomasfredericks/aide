# Unity : changement

## Introduction 

Lorsqu’un flux de données représente la mise à jour continuelle de l’état d'une chose, on peut transformer ce flux continu en événements ponctuels qui correspondent aux moments de changements des valeurs du flux.

Par exemple, dans le cas d'un bouton, cela correspondrait au fonctionnement des fonctions `OnPressed()` ou `OnReleased()`.

Voici par exemple un flux qui fournit en continu une valeur d’état d'un bouton :
```
1, 1, 1, 0, 0, 1, 1, 1...
```

L’objectif est de détecter les changements et de déclencher des événements correspondants. Les symboles ⬇︎ et ⬆︎ représentent les changements d'état :
```
1, 1, 1, 0, 0, 1, 1, 1...
       ⬇︎     ⬆︎
```

Le changement d'état peut être classifié en deux catégories :
```
1 qui change à 0 : ⬇︎ bouton pressé
0 qui change à 1 : ⬆︎ bouton relâché
```
## Code (Implémentation de base)

Ce code utilise une variable simple pour comparer une nouvelle valeur avec la valeur précédente qui est en mémoire.

Déclarer une variable comme **variable membre** de la classe (i.e. dans la classe, mais pas à l’intérieur d’une méthode) :
```csharp
private int etatEnMemoire = 1; // Le code initalise l'état initial du bouton comme relâché
```
 
Dans **la méthode qui traite la réception du flux de données** (par exemple la méthode de réception de données OSC) : 
```csharp
int nouveauEtat = ... // REMPLACER ici les ... par le code qui permet de récuérer la nouvelle donnée du flux
if (etatEnMemoire != nouveauEtat) { // Le code compare le nouvel etat avec l'etat en mémoire
    etatEnMemoire = nouveauEtat; // Le code met à jour l'état mémorisé
    if ( nouveauEtat == 0  ) {
        // METTRE ici le code pour lorsque le bouton est appuyé
    } else {
        // METTRE ici le code pour lorsque le bouton est relaché
    }
}
```
