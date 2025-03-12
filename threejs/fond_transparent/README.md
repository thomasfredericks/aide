# Fond transparent avec Three.js

La transparence est obtenue grâce à deux réglages clés :
```cpp
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
```

De plus, la page Web ne doit pas avoir de fond défini, ou ce fond doit être transparent.

- Exemple : [Three.js Transparent Background Example](https://gllm.codeberg.page/threejs-transparent-background/)
- Code source : [gllm/threejs-transparent-background - Codeberg.org](https://codeberg.org/gllm/threejs-transparent-background)