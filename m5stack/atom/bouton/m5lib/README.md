# Bouton du M5Stack Atom Lite avec la bibliothèque M5

## Documentation de l'API du bouton du M5Stack Atom Lite

La documentation complète de l'API du bouton du M5Stack Atom Lite se trouve ici : [https://docs.m5stack.com/en/api/atom/button](https://docs.m5stack.com/en/api/atom/button)

## Code à intégrer dans *setup()*

Le bouton du M5Stack Atom Lite ne nécessite aucune configuration à ajouter dans *setup()*.

## Code à intégrer dans la boucle de mise à jour de *loop()*

Utiliser l'une des variantes suivantes selon vos besoins. 


### Valider si le bouton est **présentement** relâché
```cpp
if ( M5.Btn.isReleased() ) {

}
```

`M5.Btn.isReleased()` retourne  un `bool` qui peut avoir comme valeur 0 ou 1 selon la validation (les alias pertinents sont aussi indiqués dans le tableau) :

| Non | Oui | 
|---------|---------|
| `0`    |  `1`  | 
| `false`    | `true ` |

###   Valider si le bouton est **présentement** appuyé
```cpp
if ( M5.Btn.isPressed() ) {

}
```
`M5.Btn.isPressed()` retourne  un `bool` qui peut avoir comme valeur 0 ou 1 selon la validation (les alias pertinents sont aussi indiqués dans le tableau) :

| Non | Oui | 
|---------|---------|
| `0`    |  `1`  | 
| `false`    | `true ` |

###  Valider si le bouton **a été** appuyé depuis le dernier *M5.update()*
```cpp
if ( M5.Btn.wasPressed() ) {

}
```

` M5.Btn.wasPressed()` retourne  un `bool` qui peut avoir comme valeur 0 ou 1 selon la validation (les alias pertinents sont aussi indiqués dans le tableau) :

| Non | Oui | 
|---------|---------|
| `0`    |  `1`  | 
| `false`    | `true ` |

###  Valider si le bouton **a été** relâché depuis le dernier *M5.update()*
```cpp
if ( M5.Btn.wasReleased() ) {

}
```
`M5.Btn.wasReleased()` retourne  un `bool` qui peut avoir comme valeur 0 ou 1 selon la validation (les alias pertinents sont aussi indiqués dans le tableau) :

| Non | Oui | 
|---------|---------|
| `0`    |  `1`  | 
| `false`    | `true ` |

