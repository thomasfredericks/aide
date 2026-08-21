# Exécuter du code à un certain intervalle

Cette page présente un algorithme qui permet de contrôler la vitesse à laquelle un bout de code se répète. Il est particulièrement utile pour remplacer `delay()`.

## Implémenter l'algorithme

### À ajouter dans l'espace global (au début du code)

Créer une variable **globale** pour mettre en mémoire le temps de départ du chronomètre :
```cpp
unsigned long monChronoDepart ; // DEPART DE MON CHRONOMÈTRE
```
### Configuration dans *setup()*

On initialise le temps de départ :
```cpp
monChronoDepart = millis(); // TEMPS DE DÉPART
```

### Utilisation

#### Temps écoulé

Pour calculer le temps écoulé on utilise l'extrait suivant : 
```cpp
( millis() - monChronoDepart ) // TEMPS ÉCOULÉ DE MON CHRONOMÈTRE
```

#### Temps écoulé dépasse un intervalle
On peut vérifier si le temps écoulé dépasse 50 millisecondes avec l'extrait suivant :
```cpp
if ( millis() - monChronoDepart >= 50 ) {

}
```

#### Redémarrer le chronomètre

On peut redémarrer la mesure du temps avec le code suivant :
```cpp
monChronoDepart = millis(); // REDÉMARRER LE CHRONOMÈTRE
```

## Remplacer le *delay()* dans *loop()* pour ralentir la vitesse de la boucle

Un `delay()` est souvent utilisé pour ralentir l'exécution de la boucle `loop()`. Cela a cependant pour effet de ralentir tout le code.

Par exemple, dans cet extrait de code, un `delay()` est utilisé pour ralentir la vitesse de la boucle :
```cpp
void loop() {
    
    // ... ici, tout le code est ralenti

    delay(20);
}
```

Dans cette version optimisée, le `delay()` a été remplacé par l'algorithme d'intervalle :
```cpp
unsigned long monChronoDepart ; // À DÉPLACER au début du code avec les autres variables globales

void loop() {

    // ... METTRE ici le code non-ralenti

    if ( millis() - monChronoDepart >= 20 ) { 
      monChronoDepart = millis(); 
      
      // ... METTRE ici le code à ralentir

    }
}
```