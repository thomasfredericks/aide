# Tutoriel GML d’animation avec p5.js


## Instructions

- Entrer les requêtes ci-bas dans un GML. 
- Copier et coller le code dans l’[éditeur p5.js en ligne](https://editor.p5js.org/).


## Classes

Requête au GML :

````
LE CODE
- Donne-moi un code qui utilise p5.js v2 et qui va générer des animations abstraites.
- Je veux juste le code p5.js (pas de visualisation live, pas de HTML).
- Ne désactive pas la boucle draw(). 
- Organise les éléments à dessiner en classes.
- Les éléments doivent être relatifs à la taille de la surface de la surface de dessin.
- N’affiche pas d’instructions textuelles pour l’utilisateur.
- Assure-toi que tes noms de fonction ne rentrent pas en conflit avec les fonctions de p5.js v2 dont voici la documentation : https://p5js.org/reference/
- Utilise uniquement des fonctions de base (pas de vertex ou de Béziers)
- Places les constantes dans l’espace global.
- Utilise le rendu WEBGL.

LE SUJET
- Le code doit dessiner des formes de base de différents types.
- Utilise des types de formes différentes en 3D.
- Chaque forme après un temps individuel, transforme ses propriétés graduellement.
- Chaque forme prend ensuite une pause de transformation.
- Je veux l’arrière-plan blanc.
- Les propriétés :
	- La position.
	- Les couleurs (pas de transparence).
	- Les dimensions.
````

## Classes avec fond persistant

Requête au GML :

````
LE CODE
- Donne-moi un code qui utilise p5.js v2 et qui va générer des animations abstraites.
- Je veux juste le code p5.js (pas de visualisation live, pas de HTML).
- Ne désactive pas la boucle draw(). 
- Organise les éléments à dessiner en classes.
- Les éléments doivent être relatifs à la taille de la surface de la surface de dessin.
- N’affiche pas d’instructions textuelles pour l’utilisateur.
- Assure-toi que tes noms de fonction ne rentrent pas en conflit avec les fonctions de p5.js v2 dont voici la documentation : https://p5js.org/reference/
- Utilise uniquement des fonctions de base (pas de vertex ou de Béziers)
- Places les constantes dans l’espace global.
- Utilise le rendu WEBGL.

LE SUJET
- Utilise des cercles en 2D.
- Tous les cercles ont des teintes de gris différents.
- Tous les cercles n’ont pas de contour.
- À chaque draw() déplace les cercles de quelques pixels dans une nouvelle direction aléatoire.
- À chaque draw() change la couleur des cercles.
- Les propriétés des cercles :
	- La position.
    - La taille.
    - La teinte de gris.
- Ne redessine pas l’arrière-plan (superpose sur le rendu précédent sans transparence).
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
