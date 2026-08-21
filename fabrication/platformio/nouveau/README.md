# Nouveau projet PlatformIO compatible Arduino IDE

## 0. Installation de PlatformIO dans Visual Studio Code

![Étapes pour l'installation de PlatformIO dans Visual Studio Code](./installation.svg)


## 1. Créer d'un Git

- Créer un dépôt Git (avec un README.md) dont le nom :
    - ne contient pas d'espaces ou de caractères spéciaux sauf `_` ou `-`.


## 2. Cloner le dépôt Git l'ordinateur

## 3. Ouvrir le dépôt Git sur l'ordinateur

Créer les trois fichiers expliqués dans les prochaines sections :
```
📂 titre_du_projet 
    |- 📄 .gitignore 
    |- 📄 titre_du_projet.ino
    |- 📄 platformio.ini 

```

### 3.1 Fichier `.gitignore`

Créer un fichier `.gitignore`. 

> [!WARNING]
> Ne pas oublier le `.` au début du nom de fichier `.gitignore`

Y ajouter le contenu suivant :
```ini
.DS_Store
.pio
.vscode/.browse.c_cpp.db*
.vscode/c_cpp_properties.json
.vscode/launch.json
.vscode/ipch
```

### 3.2 Fichier `.ino`

Créer un fichier `.ino` qui porte le même nom que le dossier. Y ajouter ceci :
```cpp
// Le code minimal

#include <Arduino.h> 

void setup() {
  
}

void loop() {
 
}
```

> [!WARNING]
> Le fichier `.ino` doit avoir le même nom que le dossier !
> Ainsi le projet sera compatible avec Arduino IDE aussi.

### 3.3 Fihcier `platformio.ini`

Créer un fichier `platformio.ini`. Y inclure cette section au début :
```ini
[platformio]
; Tell PIO to treat this folder (containing .ino) as the source directory
src_dir = .
```

Ensuite, il faut ajouter la configuration du bon modèle de carte :
- Suivre ces instructions de [configuration](/fabrication/arduino/carte/nano/configuration/) pour une **carte Arduino Nano**

> [!WARNING]
> Ne pas oublier de suivre la configuration du modèle de carte !

## 4. Git commit

Ne pas oublier de faire un *commit* des modifications.

## 5. Rouvrir le projet dans  *Visual Studio Code*

Pour que *Visual Studio Code* charge le dossier en tant que projet PlatformIO il faut le rouvrir.