# M5Stack : Units

*Units* M5Stack testés :

| Aide | Page officielle | Type | Commentaires |
| --- | --- | --- | --- |
| [396](./396/) | [Unit 3.96](https://docs.m5stack.com/en/unit/396port) | Connecteur | Très utile pour intégrer des boutons d’arcade, des photorésistances ou des bandes de pixels DEL |
| [Angle](./angle/) | [Unit Angle](https://docs.m5stack.com/en/unit/angle) | Capteur analogique | Fonctionne très bien |
| [Encoder](./encoder/) | [Unit Encoder](https://docs.m5stack.com/en/unit/encoder) | I2C | Fonctionne très bien |
| [Fader](./fader/) | [Unit Fader](https://docs.m5stack.com/en/unit/fader) | Capteur analogique + pixel | Fonctionne très bien |
| [Grove Hub](./grove_hub/) | [Unit Hub](https://docs.m5stack.com/en/unit/hub) | Connecteur | Permet de relier 3 modules I2C (qui sont reconnaissables à leur connecteur rouge) à 1 connecteur d’un microcontrôleur M5Stack. **Utiliser uniquement pour des modules I2C**|
| [Key](./key/) | [Unit Key](https://docs.m5stack.com/en/unit/key) | Capteur numérique + pixel | Fonctionne très bien |
| [Light](./light/) | [Unit Light](https://docs.m5stack.com/en/unit/LIGHT) | Capteur analogique | Fonctionne très bien |
| [Pb.Hub](./pbhub/) | [Unit PbHub v1.1](https://docs.m5stack.com/en/unit/pbhub_1.1) | I2C | Permet de brancher jusqu’à 6 capteurs numériques ou analogiques (reconnaissables par leur connecteur noir). Fonctionne passablement. **Cependant**, ne permet pas d’activer le mode `INPUT_PULLUP` des broches. **Bogue majeur** : la version 1.1 du PbHub ne permet de contrôler plus qu’unun seul pixel par canal (plutôt qu’un nombre arbitraire). **Non recommandé** |
| [TOF](./tof/) | [Unit ToF](https://docs.m5stack.com/en/unit/TOF) | I2C | Fonctionne mieux en mode continu (le mode non continu est lent) |
| Gesture | [Unit Gesture](https://docs.m5stack.com/en/unit/Gesture) | I2C | Jamais réussi à faire fonctionner. **Non recommandé** |
| QR Code | [Unit QRCode](https://docs.m5stack.com/en/unit/Unit-QRCode) | I2C | Fonctionne bien |
| Atom Printer | [Atom Printer](https://docs.m5stack.com/en/atom/atom_printer) | Série | Fonctionne bien | 
| [Atomic Port ABC Base](./abc/) | [Atomic Port ABC Base](https://docs.m5stack.com/en/atom/Atomic_Port_ABC_Base) | Direct, I2C et Série | Fonctionne ben |