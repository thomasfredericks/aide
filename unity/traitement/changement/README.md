# Unity : changement

## Introduction

Lorsqu’un flux de données représente la mise à jour continuelle de l’état d’un objet, d’un capteur ou d’une interaction, ce flux ne fournit pas directement des événements exploitables, mais une suite de valeurs successives décrivant un état à un instant donné.

Dans de nombreux cas, ce ne sont pas les valeurs elles-mêmes qui sont importantes, mais **les moments précis où ces valeurs changent**. Le traitement de changement consiste donc à analyser un flux continu afin d’en extraire des **événements ponctuels**, déclenchés uniquement lors des transitions d’état.

Un exemple classique est celui d’un bouton. Le flux de données ne fournit pas directement les événements « bouton pressé » ou « bouton relâché », mais une valeur représentant l’état courant du bouton à chaque instant.

Par exemple, un flux d’état binaire peut ressembler à ceci :
```
1, 1, 1, 0, 0, 1, 1, 1...
```

Dans ce cas :
- `1` représente un bouton relâché
- `0` représente un bouton appuyé

Ce flux est **continu** : tant que le bouton reste dans le même état, la valeur ne change pas. L’objectif est donc de détecter **les transitions** entre ces états.

Les symboles ⬇︎ et ⬆︎ représentent visuellement ces transitions :
```
1, 1, 1, 0, 0, 1, 1, 1...
       ⬇︎     ⬆︎
```

## Types de changements détectés

Un changement d’état correspond toujours à une comparaison entre :
- la valeur courante du flux
- la valeur précédente mémorisée

Dans le cas d’un bouton binaire, il existe exactement deux types de changements possibles :

```
1 → 0 : ⬇︎ bouton pressé
0 → 1 : ⬆︎ bouton relâché
```

Ces changements peuvent ensuite être traduits en événements logiques, par exemple :
- déclencher une action
- appeler une fonction
- modifier un état interne dans Unity

## Principe général du traitement de changement

Le principe repose sur une idée simple :
1. Mémoriser la dernière valeur reçue
2. Comparer la nouvelle valeur avec celle en mémoire
3. Détecter une différence
4. Déclencher une action uniquement si un changement est détecté
5. Mettre à jour la valeur mémorisée

Ce mécanisme évite de déclencher des événements en continu lorsque la valeur reste identique, et garantit que les actions ne sont exécutées **qu’au moment exact du changement**.

## Code (Implémentation de base)

Cette implémentation utilise une variable simple pour stocker l’état précédent et comparer chaque nouvelle valeur reçue.

### Variable de mémoire d’état

La variable suivante doit être déclarée comme **variable membre** de la classe (c’est-à-dire dans la classe, mais en dehors de toute méthode) :

```csharp
private int etatEnMemoire = 1; // L'état initial est défini comme "bouton relâché"
```

Cette variable conserve en mémoire le dernier état connu du bouton. Elle est essentielle pour pouvoir détecter les changements.

### Traitement du flux de données

Dans **la méthode qui traite la réception du flux de données** (par exemple une méthode de réception OSC, série ou réseau), le code peut être structuré de la manière suivante :

```csharp
int nouveauEtat = ... // REMPLACER ici les ... par le code qui récupère la nouvelle donnée du flux

if (etatEnMemoire != nouveauEtat)
{
    etatEnMemoire = nouveauEtat;

    if (nouveauEtat == 0)
    {
        // METTRE ici le code exécuté lorsque le bouton est appuyé
    }
    else
    {
        // METTRE ici le code exécuté lorsque le bouton est relâché
    }
}
```

### Explication du fonctionnement

- Le code compare la nouvelle valeur reçue (`nouveauEtat`) avec l’état mémorisé (`etatEnMemoire`)
- Si les deux valeurs sont identiques, aucun événement n’est déclenché
- Si les valeurs sont différentes, un changement d’état est détecté
- L’état mémorisé est immédiatement mis à jour
- Une action spécifique est déclenchée en fonction du type de transition

## Cas d’usage typiques

Le traitement de changement est particulièrement utile pour :
- boutons et interrupteurs
- détection d’entrées utilisateur
- événements déclenchés par seuil (on/off)
- signaux numériques issus de capteurs
- synchronisation d’événements entre systèmes

Contrairement au traitement proportionnel, qui agit sur des valeurs continues, le traitement de changement se concentre exclusivement sur les **transitions**, et constitue la base de la logique événementielle dans Unity.
