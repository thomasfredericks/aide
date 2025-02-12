# Tutoriel: Lampe torche avec relation d'etat

## Préalable(s)

- [Tutoriel «Blink» au démarrage](/m5stack/atom/tutoriel/blink_demarrage.md)

## Le code préalable à intégrer

1) Transcrire le code du [tutoriel «Blink» au démarrage](/m5stack/atom/tutoriel/blink_demarrage.md) dans un nouveau projet Arduino.


## Le code à ajouter pour que le bouton alterne l'etat du pixel

### Dans _l'espace global_

1) Ajouter une variable pour conserver l'état :
```cpp
bool monEtatLampe;
```

### Dans _setup()_

Ajouter le code suivant après l'animation de démarrage.

1) Initialiser la variable d'état :
```cpp
monEtatLampe = false;
```

2) Ajuster la valeur du pixel selon l'etat :
```cpp
if ( monEtatLampe == true ) {
    pixel = CRGB(255,255,255); 
} else {
    pixel = CRGB(0,0,0); 
}
FastLED.show();
```

3) Optimiser le code en enlevant le `== true` implicite :
```cpp
if ( monEtatLampe ) {
    pixel = CRGB(255,255,255); 
} else {
    pixel = CRGB(0,0,0); 
}
FastLED.show();
```

### Dans _loop()_

1) Pour changer l'etat, nous allons utiliser `M5.Btn.wasPressed()` :
```cpp
if (M5.Btn.wasPressed() ) {
    if ( monEtatLampe ) {
        monEtatLampe = false; // si monEtatLampe est vrai, monEtatLampe devient faux
    } else {
        monEtatLampe = true; // sinon (i.e. monEtatLampe est faux), monEtatLampe devient vrai
    }
}
```

2) Nous pouvons simplifiers le code précédant en utilisant l'opérateur d'inversion :
```cpp
if (M5.Btn.wasPressed() ) {
    monEtatLampe = !monEtatLampe; // monEtatLampe égale PAS monEtatLampe
}
```


3) Par après nous mettons à jour la valeur du pixel:

```cpp
if ( monEtatLampe ) {
    pixel = CRGB(255,255,255); 
} else {
    pixel = CRGB(0,0,0); 
}
FastLED.show();
```
