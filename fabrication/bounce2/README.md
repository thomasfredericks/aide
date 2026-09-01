# La bibliothèque Bounce2

La bibliothèque `Bounce2` permet de gérer les boutons et les interrupteurs en éliminant les changements d'état indésirables provoqués par les rebonds mécaniques.

## `Bounce2::Button`

La classe `Bounce2::Button` permet de gérer un bouton.

Cette instruction crée un objet nommé `bouton` de type `Bounce2::Button` :

```cpp
Bounce2::Button bouton = Bounce2::Button();
```

Ensuite, nous pouvons accéder aux méthodes suivantes :

| Syntaxe | Signification |
|---|---|
| `bouton.attach(BROCHE_BOUTON, INPUT_PULLUP)` | Associe le bouton à la broche `BROCHE_BOUTON` configurée comme entrée avec la résistance pull-up interne activée |
| `bouton.setPressedState(LOW)` | Considère que le bouton est appuyé lorsque la broche est à `LOW` |
| `bouton.update()` | Met à jour l'état du bouton. Doit être appelée à chaque passage dans `loop()` |
| `bouton.isPressed()` | Retourne `true` si le bouton est actuellement appuyé. Retourne `false` si le bouton n'est actuellement pas appuyé |
| `bouton.pressed()` | Retourne `true` lorsqu'une pression vient d'être détectée |
| `bouton.released()` | Retourne `true` lorsqu'un relâchement vient d'être détecté |
| `bouton.changed()` | Retourne `true` lorsque l'état du bouton vient de changer |
