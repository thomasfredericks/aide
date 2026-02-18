# Arduino : traitement en flux continu

Le traitement en flux consiste à produire une action de manière régulière, à intervalle fixe, même si la valeur lue ne change pas. Ce modèle est utile pour l’envoi continu de données, la mise à jour d’affichages ou le contrôle périodique d’un système.  

Le modèle de ce traitement :
- **CONDITION** : vérifier si c'est le temps d'envoyer la ou les données
    - **ACQUISITION** : si oui, lire la ou les valeurs 
    - **ACTION** : effectuer une ou plusieurs actions

La bibliothèque `Chrono` est utilisée pour contrôler la fréquence d’exécution et éviter que l’action ne soit exécutée à chaque passage dans `loop()`.

## Exemple de traitement en flux

Dans l’exemple qui suit, le type de donnée est `int` et nous lisons une valeur analogique avec `analogRead(0)`. Ces deux éléments doivent être adaptés selon le contexte. Le programme produit un flux continu de données toutes les 5 millisecondes.

```cpp
#include <Chrono.h>

Chrono monChrono; // Chronomètre

void loop() {

  // 1. Vérifie si l’intervalle de temps est écoulé
  if (monChrono.hasPassed(5)) { // toutes les 5 millisecondes
    // 2. Réinitialiser le chronomètre si le temps est écoulé
    monChrono.restart();        

    // 3. Lire la nouvelle valeur et la mettre dans une variable temporaire
    int valeur = analogRead(0); // lire la nouvelle valeur

    // 4. Effectuer une action
    // ACTION ICI

  }
}
```

Dans cette approche, le programme cherche à maintenir un flux régulier d’informations. Le chronomètre impose un rythme stable, ce qui permet de contrôler la fréquence d’envoi, de limiter la charge du microcontrôleur et de produire un comportement temporel prévisible.


