## Le code minimal

```cpp
// Le code minimal pour le M5Stack Atom

#include <M5Atom.h>  // Inclure la librairie M5 (version pour M5Atom) https://github.com/m5stack/M5Atom

void setup() {
  M5.begin(false, false, false);  // Démarrer la libraire M5 avec toutes les options désactivées
}

void loop() {
  M5.update();  // Toujours inclure M5.update() au début de loop()
}
```