# TouchDesigner : Accumulation

`OP` utilisés :
- `Math CHOP`
- `Speed CHOP`

![Réseau pour l'accumulation](./td_accumulation_reseau.png)

Pour réaliser l'accumulation, nous voulons une entrée qui est soit 0 ou 1 (aucune valeur intermédiaire) :
- Quand l'entrée est 1, on veut que la sortie augmente graduellement avec une vitesse positive
- Quand l'entrée est 0, on veut que la sortie réduise graduellement avec une vitesse négative

Le `Math CHOP` convertit l'entrée en valeurs de vitesses :
- Quand l'entrée est 1, la vitesse est 1
- Quand l'entrée est 0, la vitesse est -1

Les vitesses de 1 et -1 peuvent être changées (par exemple 0.5 et -0.5 correspondent à la moitié de la vitesse).

![Paramètres de math1 qui mappe une entrée entre 0 et 1 aux vitesses -1 et 1](./td_accumulation_math1.png)

Le `Speed CHOP` prend la vitesse et incrémente ou décrémente la valeur de sortie. Il est important de limiter la valeur de sortie en activant le mode limite Clamp.

![Paramètres de speed1](./td_accumulation_speed1.png)