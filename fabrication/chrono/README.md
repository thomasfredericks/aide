# La bibliothèque Chrono

La bibliothèque `Chrono` permet de mesurer des durées sans bloquer l'exécution du programme.

Cette instruction crée un objet nommé `minuterieDel` de type `Chrono` :

```cpp
Chrono minuterieDel;
```

Ensuite, nous pouvons accéder aux méthodes suivantes :

| Syntaxe | Signification |
|---|---|
| `minuterieDel.hasPassed(INTERVALLE)` | Retourne `true` lorsque `INTERVALLE` millisecondes se sont écoulées |
| `minuterieDel.restart()` | Redémarre la mesure du temps |

La minuterie fonctionne indépendamment du reste du programme. Le processeur peut donc continuer à exécuter `loop()` pendant que le temps s'écoule.

Cela permet de réaliser des temporisations **non bloquantes**, sans utiliser `delay()`.

