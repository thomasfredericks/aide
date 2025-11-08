# Attendre un certain temps avec *millis()* et *while()* 

## Préalable(s)

La fonction `millis()` retourne le temps en millisecondes depuis le démarrage de la carte Arduino. 

Le temps étant compté en millisecondes, la valeur du temps va augmenter très rapidement et son type doit être assez grand pour pouvoir la stocker sans erreur. Le type `unsigned long` est ainsi utilisé pour stocker le temps. Lorsqu'un type de données est indiqué «non signé», il ne peut être que positif. En éliminant les valeurs négatives, cela permet de compter avec deux fois plus de valeurs postives. Un `unsigned long` peut compter jusqu'à `4294967295`. C’est assez d’espace pour stocker le temps pour 49 jours. Après 49 jours, le temps recommence à compter à partir de `0`.

## Utilisation dans *setup()* ou loop

1) Déclarer une variable qui sert à m.moriser le temps de départ :

```cpp
unsigned long chronoDepart = millis();
```

2) Utiliser un opérateur conditionnel pour mesurer si le temps dépasse un intervalle, 5 secondes dans l'extrait suivant :

```cpp
( millis() - chronoDepart ­>= 5000 )
```

3) Il est possible par exemple de faire attendre le code avec une boucle `while` :

```cpp
unsigned long chronoDepart = millis();
while ( millis() - chronoDepart ­>= 5000 ) {
    // BOUCLER PENDANT 5 SECONDES.
}
```