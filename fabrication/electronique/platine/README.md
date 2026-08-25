# Platine d'expérimentation (breadboard)

Une platine d’expérimentation (*breadboard* en anglais) permet de réaliser des prototypes de circuits électroniques sans soudure et donc de pouvoir réutiliser les composants.

![L'utilisation de la platine d'expérimentation pour tester des circuits](./allumer_del_arduino_sans_platine.svg)


À gauche, dans l'image ci-haut, nous trouvons le circuit électrique pour allumer une lumière DEL à partir de la carte Arduino. Par contre, il est impossible de relier les composants sans faire de soudure. C’est pour cela que nous utilisons la platine d’expérimentation. 

## Connexions

Certains des trous de la platine d'expérimentation sont connectés entre eux. Ces connexions sont indiquées par des lignes dans l'illustration suivante.

![Connexions internes de la platine d'expérimentation](./platine_experimentation_connexions_internes.svg)

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

