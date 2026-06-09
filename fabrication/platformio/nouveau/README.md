# Nouveau projet PlatformIO compatible Arduino IDE

## Préalable(s)

- [Installer PlatformIO dans Visual Studio Code](../installation/).
- Si nécessaire, créer un dépôt Git (avec un README.md) et le cloner sur l'ordinateur.
- Pour le nom pas d'espaces ou de caractères spéciaux sauf `_` ou `-`.

> [!WARNING]
> Soit on travaille dans un **nouveau dossier** ou dans un **Git cloné** sur l'ordinateur !

## Structure du dossier

Pour avoir un projet compatible entre Arduino et PlatformIO, le projet doit avoir une structure similaire à ceci :
```
Titre_du_projet // (Ceci est le dossier du projet)
    |- Titre_du_projet.ino // (Ce fichier .ino doit porter le même nom que le projet)
    |- platformio.ini  // (Fichier vide)
    |- .gitignore // (Fichier vide)
```

Pour créer les fichiers, ouvrir le dossier de projet dans **Visual Studio Code**.

## 1. `.gitignore`

Créer un fichier `.gitignore`. Y ajouter le contenu suivant :
```ini
.DS_Store
.pio
.vscode/.browse.c_cpp.db*
.vscode/c_cpp_properties.json
.vscode/launch.json
.vscode/ipch
```

## 2. `platformio.ini`

Créer un fichier `platformio.ini`. Y inclure cette section au début :
```ini
[platformio]
; Tell PIO to treat this folder (containing .ino) as the source directory
src_dir = .
```

Ensuite, il faut ajouter la configuration du bon modèle de plaquette :
- Suivre ces instructions de [configuration](../../nano/configuration/) pour une **plaquette Arduino Nano**

## 3. Ficher `.ino`

Créer un fichier `.ino` qui porte le même nom que le dossier. Y ajouter ceci :
```cpp
// Le code minimal

#include <Arduino.h> 

void setup() {
  
}

void loop() {
 
}
```

## 4. Git commit

Si un dossier Git est utilisé, ne pas oublier de faire un *commit* des modifications.

## 5. Rouvrir le projet

Pour que *Visual Studio Code* charge le dossier en tant que projet PlatformIO il faut le rouvrir.