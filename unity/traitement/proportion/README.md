# Unity : Proportion

## Introduction

Lorsqu’un flux de données représente une valeur continue (par exemple un capteur analogique, une glissière, une distance, une intensité, etc), il est souvent nécessaire de transformer cette valeur d’entrée pour l’adapter à une autre plage de valeurs utilisable dans Unity.

Ce type de transformation est appelé **traitement proportionnel** : une valeur située dans une plage d’entrée donnée est mise à l’échelle vers une plage de sortie différente, tout en conservant les proportions relatives.

Par exemple, un capteur peut fournir des valeurs comprises entre `0` et `1023`, alors qu’un paramètre dans Unity (comme une rotation, un volume ou une vitesse) attend une valeur comprise entre `0.0` et `1.0`.

Flux d’entrée :
```
0 -------- 512 -------- 1023
```

Plage de sortie correspondante :
```
0.0 ------ 0.5 -------- 1.0
```

L’objectif est donc de convertir chaque valeur du flux d’entrée en une valeur proportionnelle dans la plage de sortie.

## Principe du calcul proportionnel

Le calcul repose sur trois étapes :

1. **Normaliser** la valeur d’entrée (la ramener entre 0 et 1)
2. **Mettre à l’échelle** cette valeur normalisée vers la plage de sortie
3. **Limiter** le résultat pour éviter les dépassements (clamp)

Formule générale de normalisation et de mise à l'échelle :

```cpp
(value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin
```

## Code

La fonction suivante permet d’effectuer ce traitement proportionnel de manière générique :

```csharp
public static float Proportion(float value, float inputMin, float inputMax, float outputMin, float outputMax)
{
    float normalizedValue = (value - inputMin) / (inputMax - inputMin);
    float scaledValue = normalizedValue * (outputMax - outputMin) + outputMin;
    float shiftedValue = scaledValue + outputMin;
    float clampedValue = Mathf.Clamp(scaledValue, outputMin, outputMax);
    return clampedValue;
}

```

## Utilisation dans un flux de données

Dans **la méthode qui traite la réception du flux de données** (par exemple une méthode de réception OSC ou de lecture de capteur) :

```csharp
float valeurBrute = ... // REMPLACER ici les ... par la valeur reçue du flux

float valeurProportionnelle = Proportion(
    valeurBrute,
    0f,     // minimum du flux d'entrée
    1023f,  // maximum du flux d'entrée
    0f,     // minimum souhaité en sortie
    1f      // maximum souhaité en sortie
);

// METTRE ici le code qui utilise la valeur proportionnelle
// par exemple : rotation, intensité lumineuse, volume, etc.
```

## Exemple d’application

Un traitement proportionnel peut être utilisé pour :

- Mapper un potentiomètre vers une rotation (`0° → 180°`)
- Contrôler l’intensité d’une lumière
- Ajuster un volume audio
- Modifier une vitesse ou une force
- Piloter une animation de manière fluide

Contrairement au traitement de changement, qui détecte des **événements ponctuels**, le traitement proportionnel agit de manière **continue**, en suivant en permanence les variations du flux de données.
