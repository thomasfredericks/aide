# M5 Stack

## Produits M5 Stack testés

| Page d'aide | Page officielle | Type | Commentaires |
| --- | --- |  --- |  --- |
| [Atom Lite](./atom/) | [Atom-Lite](https://docs.m5stack.com/en/core/ATOM%20Lite) | Microcontrôleur | La puce CH552T, utilisée dans le circuit de l’Atom Lite pour la communication USB série, émule une puce FTDI VCP, mais **avec un bogue majeur**. Le firmware actuel de la CH552T provoque des pertes de paquets série lorsque l’Arduino reçoit des données en même temps qu’il en transmet. |
| [AtomS3 Lite](./atomS3/)| [AtomS3-Lite](https://docs.m5stack.com/en/core/AtomS3%20Lite) | Microcontrôleur | Semble plus prometteur que l'Atom Lite... en cours d'évaluation |
| [396](./units/396/) | [Unit 3.96](https://docs.m5stack.com/en/unit/396port) | Connecteur | Très utile pour intégrer des [boutons d'arcade](./bouton-arcade/), des [photorésistances](./photoresistance/) ou des [bandes de pixels DEL](/pixels/) |
| [Angle](./units/angle/) | [Unit Angle](https://docs.m5stack.com/en/unit/angle) | Capteur analogique | Fonctionne très bien |
| [Encoder](./units/encoder/) | [Unit Encoder](https://docs.m5stack.com/en/unit/encoder) | I2C | Fonctionne très bien |
| [Fader](./units/fader/) | [Unit Fader](https://docs.m5stack.com/en/unit/fader) | Capteur analogique + pixel | Fonctionne très bien |
| [Grove Hub](./units/grove_hub/) | [Unit Hub](https://docs.m5stack.com/en/unit/hub) | Connecteur | Permet de relier 3 modules I2C (qui sont reconnaissables à leur connecteur rouge) à 1 connecteur d'un microcontrôleur M5 Stack. **Utiliser uniquement pour des modules I2C**|
| [Key](./units/key) | [Unit Key](https://docs.m5stack.com/en/unit/key) | Capteur numérique + pixel | Fonctionne très bien |
| [Light](./units/light/) | [Unit Light](https://docs.m5stack.com/en/unit/LIGHT) | Capteur analogique | Fonctionne très bien |
| [Pb.Hub](./units/pbhub/) | [Unit PbHub v1.1](https://docs.m5stack.com/en/unit/pbhub_1.1) | I2C | Permet de brancher jusqu'à 6 capteurs numériques ou analogiques (reconnaissables par leur connecteur noir). Fonctionne passablement. **Cependant**, ne permet pas d'activer le mode `INPUT_PULLUP` des broches. **Bogue majeur** : la version 1.1 du PbHub ne permet de contrôler plus qu'unun seul pixel par canal (plutôt qu'un nombre arbitraire). **Non recommandé** |
| [TOF](./units/tof/) | [Unit ToF](https://docs.m5stack.com/en/unit/TOF) | I2C | Fonctionne mieux en mode continu (le mode non continu est lent) |
| Gesture | [Unit Gesture](https://docs.m5stack.com/en/unit/Gesture) | I2C | Jamais réussi à faire fonctionner. **Non recommandé** |
| QR Code | [Unit QRCode](https://docs.m5stack.com/en/unit/Unit-QRCode) | I2C | Fonctionne bien |
| Atom Printer | [Atom Printer](https://docs.m5stack.com/en/atom/atom_printer) | Série | Fonctionne bien | 