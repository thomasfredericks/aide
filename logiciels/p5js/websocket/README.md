# p5.js et WebSocket

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projet p5.js</title>
  <!-- Latest p5.js from CDN -->
  <script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/abachman/p5.websocket/dist/p5.websocket.min.js"></script>
  <style>
    /* Remove all default spacing */
    html,
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      /* no scrollbars */
      width: 100%;
      height: 100%;
      background: #000;
    }

    /* Force the p5 canvas to fill the window */
    canvas {
      display: block;
      /* removes inline-block gap */
      position: fixed;
      top: 0;
      left: 0;
    }
  </style>
</head>

<body>
  <script>
    // CODE P5.JS ICI
    let gray = 0;
    function setup() {
      createCanvas(windowWidth, windowHeight, WEBGL);
      connectWebsocket("ws://localhost:8080");
    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }

    function draw() {
      background(gray);
    }

    function messageReceived(data) {
     // gray = data.photo;
     console.log(data);
    }
  </script>
</body>

</html>
```