# Arduino : Traitement

Sur Arduino, le traitement de données consiste à recevoir des informations, les transformer, puis produire une sortie en fonction de ces transformations. Les données peuvent provenir de capteurs (analogiques ou numériques), de la communication série, de modules comme des capteurs I2C/Wire ou SPI.

Le modèle général est composé de trois étapes dont l'ordre :

- ACQUISITION : L’Arduino lit une valeur avec des fonctions comme `analogRead()` ou `digitalRead()`.
- CONDITION : Les données brutes sont adaptées et le programme applique une logique conditionnelle (`if`, `switch`) pour déterminer quoi faire.
- ACTION : L’Arduino agit sur une sortie : LED, moteur, écran, communication OSC, MIDI, etc.

Le modèle de traitement ACQUISITION, CONDITION et ACTION est fondamental pour tous les systèmes embarqués où les données doivent circuler de manière continue et ordonnée.

## Traitements

- Détection de [changement](./changement/)
- Créer un [flux](./flux/)