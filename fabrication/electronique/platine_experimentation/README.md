# Platine d'expérimentation (*breadboard*)

Une platine d’expérimentation (*breadboard* en anglais) permet de réaliser des prototypes de circuits électroniques sans soudure et donc de pouvoir réutiliser les composants.

![L'utilisation de la platine d'expérimentation pour tester des circuits](./allumer_del_arduino_sans_platine.svg)


À gauche, dans l'image ci-haut, nous trouvons le circuit électrique pour allumer une lumière DEL à partir de la carte Arduino. Par contre, il est impossible de relier les composants sans faire de soudure. C’est pour cela que nous utilisons la platine d’expérimentation. 

## Connexions

Certains des trous de la platine d'expérimentation sont connectés entre eux. Ces connexions sont indiquées par des lignes dans l'illustration suivante.

![Connexions internes de la paltine d'expérimentation](./platine_experimentation_connexions_internes.svg)

* Tous les trous dans une rangée intérieure de 5 sont reliés entre eux. 
* Les trous des colonnes extérieures sont reliés entre eux. Ils sont réservés à l'alimentation :
	* Colonne rouge pour le pôle positif (+).
	* Colonne bleue pour le pôle négatif (-).

## Bien placer les composants sur la platine d'expérimentation

Les broches (pattes) des composants doivent être insérées dans des trous qui sont **non reliés électriquement**, c'est à dire **isolés** électriquement. 

Dans la figure suivante :
* Le **X** indique une erreur où un composant dont les broches sont insérées dans des trous reliés électriquement.
* Les **✓** indiquent des bonnes connexions où chaque broche du composant est isolée électriquement. 

![Exemples de connexions valides d'une DEL](./platine_experimentation_connexions_valides_del.svg)

Dans la figure suivante :
* Le **X** indique une erreur où un composant dont les broches sont insérées dans des trous reliés électriquement.
* Les **✓** indiquent des bonnes connexions où chaque broche du composant est isolée électriquement. 

![Exemples de connexions valides](./platine_experimentation_connexions_valides_exemples.svg)


## Se servir d'une carte Arduino pour alimenter une platine d'expérimentation

### Pôles de la carte Arduino Nano

Sur certains modèles de carte Arduino Nano, le pôle positif (+) n’est malheureusement pas imprimé sur la carte. Cependant, la documentation indique que la broche du pôle positif (+) est adjacente à la broche étiquettée «RST». 

Le pôle négatif (-) est indiqué avec l'étiquette «GND» imprimée sur la carte. 

![Pôles d'alimentation de la carte Arduino Nano](./arduino_nano_poles_alimentation.svg)

### Étape 1

Brancher un câble (orange ou rouge) dans la rangée de la broche du positif (+) de la carte Arduino. Ce câble transporte maintenant le positif (+).

Brancher un câble (brun ou noir) dans la rangée de la broche du négatif (-) de la carte Arduino. Ce câble transporte maintenant le négatif (-).

![Étape 1 de l'alimentation de la platine d'expérimentation](./alimentation_platine_experimentation_1.svg)


### Étape 2

Brancher le câble qui transporte le positif (+) dans la colonne **+** rouge de la platine d’expérimentation.

Brancher le câble qui transporte le négatif (-) dans la colonne **–** bleue de la platine d’expérimentation.

![Étape 2 de l'alimentation de la platine d'expérimentation](./alimentation_platine_experimentation_2.svg)

### Étape 3

Relier les deux autres colonnes de la patine d'expériementation.

![Étape 3 de l'alimentation de la platine d'expérimentation](./alimentation_platine_experimentation_3.svg)
