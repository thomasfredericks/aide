# Tutoriel: Lampe torche avec une corrélation directe

## Préalable(s)

- [Le pixel du M5Stack Atom](/m5stack/atom/pixel.md)
- [Tutoriel: «Blink» uniquement au démarrage](/m5stack/atom/tutoriel/blink_demarrage.md)
- [Bouton du M5Stack Atom](/m5stack/atom/bouton.md)


## Le code préalable à intégrer

1) [Transcrire le code du tutoriel «Blink» au démarrage](/m5stack/atom/tutoriel/blink_demarrage.md) dans un nouveau projet Arduino.

## Le nouveau code à ajouter pour que le bouton allume le pixel

### Dans _loop()_

1) Pour allumer le pixel avec le bouton :
```cpp
if ( M5.Btn.isPressed() ) {
    pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
}
```

2) Pour éteindre le pixel avec le bouton :
```cpp
if ( M5.Btn.isReleased() ) {
    pixel = CRGB(0,0,0); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
}
```

3) Combiner les deux conditionnelles avec `else` parce qu'elles sont exclusives (une ou l'autre peut avoir effet, mais pas les deux en même temps) :
```cpp
if ( M5.Btn.isPressed() ) {
    pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
} else if ( M5.Btn.isReleased() ) {
    pixel = CRGB(0,0,0); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
}
```

4) Optimiser le code; `M5.Btn.isReleased()` est redondant parce que c'est le contraire de `M5.Btn.isPressed()`; la répétition de `FastLED.show()` peut être évitée :
```cpp
if ( M5.Btn.isPressed() ) {
    pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
} else {
    pixel = CRGB(0,0,0); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
}
FastLED.show();
```