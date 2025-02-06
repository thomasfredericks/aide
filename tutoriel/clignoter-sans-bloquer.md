# Tutoriel: Clignoter sans bloquer

## Préalable(s)

- [Tutoriel: «Blink» au démarrage](/m5stack/atom/tutoriel/blink_demarrage.md)
- [Intervalle avec millis()](/arduino/millis/intervalle.md)

## Le code préalable à intégrer

1) Transcrire le code du [Tutoriel: «Blink» au démarrage](/m5stack/atom/tutoriel/blink_demarrage.md) dans un nouveau projet Arduino.

## Le nouveau code à ajouter

### Dans _l'espace global_

1) Ajouter une variable  **globale**  pour conserver l'état du pixel :
```cpp
bool monEtatPixel;
```

2) Ajouter une variable  **globale** pour mettre en mémoire le temps de départ du chronomètre:
```cpp
unsigned long monChronoDepart = 0; // DEPART DE MON CHRONOMÈTRE
```

### Dans _setup()_

Ajouter le code suivant après l'animation de démarrage.

1) Initialiser la variable d'état :
```cpp
monEtatPixel = false;
```

2) On réinialise le temps de départ à la fin du _setup()_ :
```cpp
monChronoDepart = millis(); // TEMPS DE DÉPART
```

### Dans _loop()_

On ajoute le code suivant après `M5.update()`.

1) Ajuster la valeur du pixel selon l'etat :
```cpp
if ( monEtatPixel ) {
    pixel = CRGB(255,255,255); 
} else {
    pixel = CRGB(0,0,0); 
}
FastLED.show();
```

2) Alterner `monEtatPixel` selon le chronomètre :
```cpp
if ( millis() - monChronoDepart >= 250 ) { // SI LE TEMPS ÉCOULÉ DÉPASSE 250 MS...
      monChronoDepart = millis(); // ...REDÉMARRER LE CHRONOMÈTRE...
      // CETTE SECTION SERA EXÉCUTÉE À CHAQUE 50 MS
      monEtatPixel = !monEtatPixel;
}
```

