# Communication sérielle dans Pure Data

- Pour recevoir et envoyer sur un port série, il est nécessaire d'ajouter l'object `comport` à Pure Data tel qu'indiqué à la page [comport](./comport/).
- Pour pouvoir communiquer en ASCII sur le port série, en plus de dépendre de `comport` il est recommandé d'utiliser `pdchoco/ascii_parse` et `pdchoco/serial` tel que présenté à la page [ascii](./ascii).