# Les bandes de pixels

## Introduction

Une bande de pixels regroupe plusieurs LED pouvant être contrôlées avec une ou deux broches. Chaque pixel est composé de plusieurs LED, généralement une rouge, une verte et une bleue. Certains modèles intègrent également des LED supplémentaires blanches, ambrées ou ultraviolettes. De plus, pour chaque modèle de bande de pixels, l'ordre des couleurs peut varier : RGB, GRB, BGR, etc.  

Aussi connue sous le nom de **NeoPixel**, ce type de produit a été popularisé par la société Adafruit, qui propose [de nombreux modèles de NeoPixels](https://www.adafruit.com/category/168). Attention, les NeoPixels d'Adafruit fonctionnent à 5 volts.

![Différents modèles de bandes de pixels](./bande_del_modeles.svg)



## Broches

Les NeoPixels possèdent au moins trois broches qui doivent être connectées :  
- **GND** (masse)  
- **Alimentation** (5 V, 12 V ou 24 V selon les modèles)  
- **Entrée de données** (*Data In*)  

Les modèles WS281X fonctionnant en 12 V comportent parfois une quatrième broche optionnelle :  
- **GND**  
- **+12V** (alimentation)  
- **DI** (entrée de données)  
- **BI** (utilisée uniquement en cas de défaillance d’un segment).



## Branchement

Dans cet exemple, nous utilisons une bande de pixels WS281X fonctionnant avec une tension d’alimentation de 12 V.

![Couper un segment de bande de pixels](./Diapositive1.SVG)  

![Attention : connectez-vous du côté DI (*Data Input*) et non DO !](./bande_del_sens.svg) 

![Enlever soigneusement le revêtement sur la partie cuivrée coupée](./Diapositive2.SVG)  

![Connexion sans soudure du côté multi-câble](./bande-del_connecteur_cote-cable.png)  

![Connexion sans soudure du côté de la bande](./bande-del_connecteur_cote-bande.png)  

![Schéma du montage à effectuer](./bande-del_atom_schema.png)  

![Photo du montage effectué](./bande-del_atom_photo.png)  

![Extension de bandes en connectant les DO aux DI](./bande_del_extension_schema.svg)


### Bonnes pratiques

Adafruit recommande de suivre [ces bonnes pratiques de connexion](https://learn.adafruit.com/adafruit-neopixel-uberguide/best-practices) pour éviter les problèmes.


