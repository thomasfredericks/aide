# M5Stack

M5Stack est une entreprise chinoise (Shenzhen, fondée en 2017) spécialisée dans le matériel open source pour l’IoT et l’électronique. Son concept phare : une modularité par empilement de blocs électroniques connectables sans soudure, permettant de prototyper rapidement des objets connectés. Elle produit des contrôleurs, des [bases](./bases/) et des [units](./units/).

Contrôleurs testés :

| Contrôleur | Page officielle | Type | Commentaires |
| -- | -- |  -- |  -- |
| [Atom Lite](./atom/) | [Atom-Lite](https://docs.m5stack.com/en/core/ATOM%20Lite) | Microcontrôleur | La puce CH552T, utilisée dans le circuit de l’Atom Lite pour la communication USB série, émule une puce FTDI VCP, mais **avec un bogue majeur**. Le firmware actuel de la CH552T provoque des pertes de paquets série lorsque l’Arduino reçoit des données en même temps qu’il en transmet. |
| [AtomS3 Lite](./atomS3/)| [AtomS3-Lite](https://docs.m5stack.com/en/core/AtomS3%20Lite) | Microcontrôleur | Semble plus prometteur que l’Atom Lite... en cours d’évaluation |

Les **bases** et **units** testés se trouvent dans leurs sections respectives :  
- [Bases](./bases/)
- [Units](./units/)
