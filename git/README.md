# Git


1. Créer un dépôt sur [Codeberg.org](https://codeberg.org/) ou [GitHub.com](https://github.com/) ou ailleurs.
2. Créer votre projet dans Visual Studio Code ou logiciel similaire.
3. Excécuter les commandes suivantes dans un terminal en remplaçant **URL** par l'adresse **https** de votre git comme par exemple *https://github.com/SofaPirate/Plaquette.git*

```
git init
git checkout -b main
git add .
git commit -m "first commit"
git remote add origin URL
git push -u origin main
```