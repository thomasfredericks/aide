# Générer un nombre aléatoire

## La fonction random()

La fonction `random()` permet de générer un entier `int` entre un minimum (inclu) et un maximum (exclu). 

Exemple d'utilisation de `random()`:
```cpp
int monMin = 0;
int monMax = 256;
int maValeurAleatoire = random( monMin , monMax );
```

Par exemple les valeurs possible retournées par `random(0,5)` sont :
* 0
* 1
* 2
* 3
* 4
Notez que le 5 est exclu des valeurs possibles

## Exemple de génération d'une couleur aléatoire

Chaque composant (rouge, vert, bleu) de la couleur peut avoir une valeur entre 0 et *255* (255 est inclu). Le minimum inclu du `random()` est donc 0, mais le maximum exclu est *256*! 

```cpp
int monMin = 0;
int monMax = 256;
int monRouge = random( monMin , monMax );
int monVert = random( monMin , monMax ); 
int monBleu = random( monMin , monMax );
CRGB maCouleur = CRGB( monRouge , monVert , monBleu );
```

