# PlatformIO : Projet de style Arduino

Pour avoir un projet compatible entre Arduino et PlatformIO, le projet doit avoir une structure similaire à ceci :
```
[Titre_du_projet] (dossier)
    |- Titre_du_projet.ino
    |- platformio  
    |- .gitignore
```

Dans le fichier `platformio.ini` inclure cette section au début :
```ini
[platformio]
; Tell PIO to treat this folder (containing .ino) as the source directory
src_dir = .
```