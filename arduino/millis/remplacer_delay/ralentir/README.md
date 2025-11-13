
# millis() : Ralentir *loop()* sans *delay()*

Un `delay()` est souvent utilisé pour ralentir l'exécution de la boucle `loop()`. Cela a cependant pour effet de ralentir tout le code.

😔 Voici par exemple un extrait de code qui utilise un `delay()` pour ralentir la vitesse de la boucle :
```cpp
void loop() {
    
    // ... ici, TOUT le code est ralenti

    delay(20);
}
```

😀 Dans cette version optimisée, le `delay()` a été remplacé par l'algorithme d'intervalle :
```cpp
unsigned long monChronoDepart ; // À DÉPLACER au début du code avec les autres variables globales

void loop() {

    // ici le code n'est pas ralenti
    // ... METTRE ici le code non-ralenti

    if ( millis() - monChronoDepart >= 20 ) { 
      monChronoDepart = millis(); 
      
      // ici le code est ralenti
      // ... METTRE ici le code à ralentir

    }
}
```