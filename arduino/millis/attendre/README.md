# Attendre un certain temps avec *millis()* et *while()* 



## Utilisation dans *setup()* ou loop

1) Déclarer une variable qui sert à m.moriser le temps de départ :

```cpp
unsigned long chronoDepart = millis();
```

2) Utiliser un opérateur conditionnel pour mesurer si le temps dépasse un intervalle, 5 secondes dans l'extrait suivant :

```cpp
( millis() - chronoDepart <= 5000 )
```

3) Il est possible par exemple de faire attendre le code avec une boucle `while` :

```cpp
unsigned long chronoDepart = millis();
while ( millis() - chronoDepart <= 5000 ) {
    // BOUCLER PENDANT 5 SECONDES.
}
```