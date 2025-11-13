# millis() : Attendre sans *delay()*


```cpp
    unsigned long tempChrono = millis(); // une variable temporaire
    while ( millis() - tempChrono >= 1000 ) { 
      // Le code va être bloqué ici 1000 millisecondes

    }
```