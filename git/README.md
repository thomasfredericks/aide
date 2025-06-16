



# Git — Démarrage d’un projet

Voici les étapes pour initialiser un dépôt Git local, connecter un projet à une plateforme d’hébergement comme [Codeberg.org](https://codeberg.org/) ou [GitHub.com](https://github.com/), puis envoyer votre code.

## 1. Créer un dépôt distant

Créer un nouveau dépôt sur une plateforme comme :

* [Codeberg.org](https://codeberg.org/)
* [GitHub.com](https://github.com/)
* [GitLab.com](https://gitlab.com/)

> **Note** : Copier l’URL HTTPS du dépôt une fois créé (ex. `https://github.com/mon-nom/projet.git`).



## 2. Créer votre projet localement

Dans **Visual Studio Code** ou un autre éditeur, créer un nouveau dossier pour votre projet et y placer vos fichiers (README, code source, etc.).


## 3. Initialiser Git et envoyer le code

Ouvrir un terminal dans le dossier de votre projet, puis exécuter les commandes suivantes.

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

Connecter le dépôt local à un dépôt distant nommé `origin`, avec l’URL fournie en remplaçant `URL` par l’adresse HTTPS du dépôt distant noté plus haut :
```bash
git remote add origin URL
```
---

Envoyer la branche `main` (et ses commits) vers le dépôt distant.
L’option `-u` indique à Git de suivre cette branche par défaut — il sera ensuite possible d’utiliser simplement `git push` sans arguments :
```bash
git push -u origin main
```



---

Une fois ces étapes complétées, le projet est versionné localement *et* synchronisé avec le dépôt distant.
