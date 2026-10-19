# Tutoriel GML seed avec p5.js

p5.js est un framework créé par des designeurs pour des designeurs pour la génération de contenu surtout visuel.

## Code de base de p5.js

```javascript
  function setup() {
    createCanvas(400, 400); // Rendu stanard
    // createCanvas(400, 400, WEBGL); // Rendu accéléré
  }

  function draw() {
    background(255,255,255);
  }
```


## La valeur seed

L’aléatoire n’existe pas réellement dans un système informatique. Il est simulé avec une séquence de chiffres générés à partir d’un algorithme. Cette séquence, qui est toujours la même, a besoin d’une valeur initiale que l’on appelle *seed* en anglais. En changeant la valeur `seed` on change la séquence.

Dans p5.js, la fonction `randomSeed()` permet de fixer ce point de départ. Si vous utilisez la même graine (seed), vous obtiendrez exactement la même série de nombres aléatoires, et donc le même dessin.

## Instructions

- Entrer les requêtes ci-bas dans un GML. 
- Copier et coller le code dans l’[éditeur p5.js en ligne](https://editor.p5js.org/).

## Drapeaux

Requête au GML :

````
LE CODE
- Donne-moi un code qui utilise p5.js v2 et qui va générer des dessins à partir d’une seed.
- Je veux juste le code p5.js (pas de visualisation live, pas de HTML).
- Ne désactive pas la boucle draw(). Applique la seed au début de chaque draw() pour que le dessin reste identique.
- À chaque clic de la souris, change la seed (utilise le temps pour générer les nouvelles seed).
- Organise les éléments à dessiner en fonctions.
- Les éléments doivent être relatifs à la taille de la forme de base.
- N’affiche pas d’instructions textuelles pour l’utilisateur.
- Assure-toi que tes noms de fonction ne rentrent pas en conflit avec les fonctions de p5.js v2 dont voici la documentation : https://p5js.org/reference/
- Utilise uniquement des fonctions de base (pas de vertex ou de Béziers)
- Places les constantes dans l’espace global.

LE SUJET
- Le code doit dessiner des drapeaux.
- Garde l’arrière-plan blanc.
- La taille des drapeaux doit être la même.
- Les propriétés :
	- Le nombre de bandes de couleur.
	- Les couleurs.
	- L’emblème si présent.
````

## Visages

Requête au GML :

````
LE CODE
- Donne-moi un code qui utilise p5.js v2 et qui va générer des dessins à partir d’une seed.
- Je veux juste le code p5.js (pas de visualisation live, pas de HTML).
- Ne désactive pas la boucle draw(). Applique la seed au début de chaque draw() pour que le dessin reste identique.
- À chaque clic de la souris, change la seed (utilise le temps pour générer les nouvelles seed).
- Organise les éléments à dessiner en fonctions.
- Les éléments doivent être relatifs à la taille de la forme de base.
- N’affiche pas d’instructions textuelles pour l’utilisateur.
- Assure-toi que tes noms de fonction ne rentrent pas en conflit avec les fonctions de p5.js v2 dont voici la documentation : https://p5js.org/reference/
- Utilise uniquement des fonctions de base (pas de vertex ou de Béziers)
- Places les constantes dans l’espace global.

LE SUJET
- Le code doit dessiner des visages.
- Garde l’arrière-plan blanc
- Les éléments :
    - La tête
    - Le nez
    - Les oreilles
    - Les yeux
    - La bouche
    - Le dessus de la tête
- Les propriétés variables :
    - La couleur du visage
    - La taille du visage
    - La coiffe (cheveux ou accessoire)
    - La taille des yeux
    - La couleur des yeux
````

## Exporter 

Pour exporter un projet p5.js, mettre votre code p5.js à l’endroit indiqué `// CODE P5.JS ICI` dans ce fichier HTML :

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projet p5.js</title>
  <!-- Latest p5.js from CDN -->
  <script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js"></script>
  <style>
    /* Remove all default spacing */
    html, body {
      margin: 0;
      padding: 0;
      overflow: hidden;       /* no scrollbars */
      width: 100%;
      height: 100%;
      background: #000;
    }

    /* Force the p5 canvas to fill the window */
    canvas {
      display: block;         /* removes inline-block gap */
      position: fixed;
      top: 0;
      left: 0;
    }
  </style>
</head>
<body>
<script>
  // CODE P5.JS ICI
</script>
</body>
</html>
```
