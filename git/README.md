



# Git — Ajout d'un projet à un dépôt

Voici les étapes pour ajouter un projet local à un dépôt comme [Codeberg.org](https://codeberg.org/) ou [GitHub.com](https://github.com/).

## Créer votre projet localement

Dans **Visual Studio Code** ou un autre éditeur, créer un projet.


## Initialiser Git

Ouvrir un terminal dans le dossier du projet, puis exécuter les commandes suivantes.

Initialiser un nouveau dépôt Git local dans le dossier courant. Cela crée un dossier caché `.git` qui contient l’historique de version :
```bash
git init
```
---

Créer et basculer sur une nouvelle branche nommée `main` :
```bash
git checkout -b main
```
---

Ajouter tous les fichiers du projet à l’index Git (préparer les fichiers pour le commit) :
```bash
git add .
```
---

Créer un commit avec les fichiers ajoutés et y associer un message décrivant ce commit (`"first commit"` ici) :
```bash
git commit -m "first commit"
```
---

## Créer un dépôt distant

Créer un nouveau dépôt sur une plateforme comme :

* [Codeberg.org](https://codeberg.org/)
* [GitHub.com](https://github.com/)
* [GitLab.com](https://gitlab.com/)

Copier dans le presse-papier l’URL HTTPS du dépôt une fois créé (par exemple `https://github.com/mon-nom/projet.git`). 

Dans le terminal, connecter le dépôt local au dépôt distant `origin` en remplaçant `https://github.com/mon-nom/projet.git` par l'adresse URL HTTPS du dépôt distant copiée juste plus haut :
```bash
git remote add origin https://github.com/mon-nom/projet.git
```

Envoyer la branche `main` (et ses commits) vers le dépôt distant.
L’option `-u` indique à Git de suivre cette branche par défaut — il sera ensuite possible d’utiliser simplement `git push` sans arguments :
```bash
git push -u origin main
```



Une fois ces étapes complétées, le projet est versionné localement *et* synchronisé avec le dépôt distant.
