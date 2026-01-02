# M5 Stack

## Tableau d'évaluation des produits M5 Stack

| Produit | Page officielle | Type | Commentaires |
| --- | --- |  --- |  --- |
| Atom Lite | [Atom-Lite](https://docs.m5stack.com/en/core/ATOM%20Lite) | Microcontrôleur | La puce CH552T, utilisée dans le circuit de l’Atom Lite pour la communication USB série, émule une puce FTDI VCP, mais **avec un bogue majeur**. Le firmware actuel de la CH552T provoque des pertes de paquets série lorsque l’Arduino reçoit des données en même temps qu’il en transmet. |
| Atom Lite S3 | [AtomS3-Lite](https://docs.m5stack.com/en/core/AtomS3%20Lite) | Microcontrôleur | Semble plus prometteur que l'Atom Lite... en cours d'évaluation |
| 396 | [Unit 3.96](https://docs.m5stack.com/en/unit/396port) | Connecteur | Très utile pour intégrer des [boutons d'arcade](./bouton-arcade/), des [photorésistances](./photoresistance/) ou des [bandes de pixels DEL](/pixels/) |
| Angle | [Unit Angle](https://docs.m5stack.com/en/unit/angle) | Capteur analogique | Fonctionne très bien |
| Encoder | [Unit Encoder](https://docs.m5stack.com/en/unit/encoder) | I2C | Fonctionne très bien |
| Fader | [Unit Fader](https://docs.m5stack.com/en/unit/fader) | Capteur analogique + pixel | Fonctionne très bien |
| Grove Hub | [Unit Hub](https://docs.m5stack.com/en/unit/hub) | Connecteur | Permet de relier 3 modules I2C (qui sont reconnaissables à leur connecteur rouge) à 1 connecteur d'un microcontrôleur M5 Stack. |
| Key | [Unit Key](https://docs.m5stack.com/en/unit/key) | Capteur numérique + pixel | Fonctionne très bien |
| Light | [Unit Light](https://docs.m5stack.com/en/unit/LIGHT) | Capteur analogique | Fonctionne très bien |
| Pb.Hub | [Unit PbHub v1.1](https://docs.m5stack.com/en/unit/pbhub_1.1) | I2C | Permet de brancher jusqu'à 6 capteurs numériques ou analogiques (reconnaissables par leur connecteur noir). Fonctionne bien sauf pour le contrôle des pixels. La version 1.1 du PbHub a un **bogue majeur** qui ne permet de contrôler qu'un seul pixel par canal (plutôt qu'un nombre arbitraire) |
| TOF | [Unit ToF](https://docs.m5stack.com/en/unit/TOF) | I2C | Fonctionne mieux en mode continu (le mode non continu est lent) |