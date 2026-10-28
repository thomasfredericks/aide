# p5.js

p5.js est un framework créé par des designeurs pour des designeurs pour la génération de contenu surtout visuel.

## Code de base de p5.js

```javascript
  function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); 
  }

  function draw() {
    background(0);
  }

  // This function is called automatically when the browser window resizes
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
```

## Fichier HTML pour contenir le code de base p5.js

Pour contenir un projet p5.js, mettre votre code p5.js à l’endroit indiqué `// CODE P5.JS ICI` dans ce fichier HTML :

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
  function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); 
  }

  function draw() {
    background(0);
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
</script>
</body>
</html>
```