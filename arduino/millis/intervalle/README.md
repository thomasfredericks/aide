# Intervalle de temps avec millis()


## Préalable(s)

La fonction `millis()` retourne le temps en millisecondes depuis le démarrage de la carte Arduino. 

Le temps étant compté en millisecondes, la valeur du temps va augmenter très rapidement et son type doit être assez grand pour pouvoir la stocker sans erreur. Le type `unsigned long` est ainsi utilisé pour stocker le temps. Lorsqu'un type de données est indiqué «non signé», il ne peut être que positif. En éliminant les valeurs négatives, cela permet de compter avec deux fois plus de valeurs postives. Un `unsigned long` peut compter jusqu'à `4294967295`. C’est assez d’espace pour stocker le temps pour 49 jours. Après 49 jours, le temps recommence à compter à partir de `0`.

## À ajouter dans l'espace global (au début du code)

Créer une variable **globale** pour mettre en mémoire le temps de départ du chronomètre:
```cpp
unsigned long monChronoDepart ; // DEPART DE MON CHRONOMÈTRE
```
### Configuration dans *setup()*

On inialise le temps de départ:
```cpp
monChronoDepart = millis(); // TEMPS DE DÉPART
```

### Utilisation dans *loop()*

#### Remplacer le *delay()* dans *loop()* pour ralentir la vitesse de la boucle

Pour remplacer un `delay(20)` :
```cpp
if ( millis() - monChronoDepart >= 20 ) { // SI LE TEMPS ÉCOULÉ DÉPASSE 20 MS...
      monChronoDepart = millis(); // ...REDÉMARRER LE CHRONOMÈTRE...
      
      // AJOUTER LE CODE RALENTIT ICI
}
```

#### Autres fonctions

##### Temps écoulé

Pour calculer le temps écoulé on utilise l'extrait suivant: 
```cpp
( millis() - monChronoDepart ) // TEMPS ÉCOULÉ DE MON CHRONOMÈTRE
```

##### Temps écoulé dépasse un intervalle
On peut vérifier si le temps écoulé dépasse 50 millisecondes avec l'extrait suivant:
```cpp
( millis() - monChronoDepart >= 50 ) // TEMPS ÉCOULÉ DE MON CHRONOMÈTRE
```

##### Redémarrer le chronomètre

On peut redémarrer la mesure du temps avec le code suivant:
```cpp
monChronoDepart = millis(); // REDÉMARRER LE CHRONOMÈTRE
```



