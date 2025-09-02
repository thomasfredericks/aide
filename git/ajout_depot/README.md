# Git — Ajout d'un projet à un dépôt

Voici les étapes pour ajouter un projet local à un dépôt comme [Codeberg.org](https://codeberg.org/) ou [GitHub.com](https://github.com/).

## Créer votre projet localement

Dans **Visual Studio Code** ou un autre éditeur, créer un projet.


## Initialiser Git

Ouvrir un terminal dans le dossier du projet, et y exécuter les commandes qui suivent.

![Cliquer sur le petit icône de terminal de PlatformIO pour ouvrir son terminal](./vscode_terminal.svg)

Initialiser un nouveau dépôt Git local dans le dossier courant. Cela crée un dossier caché `.git` qui contient l’historique de version :
```bash
git init
```

Créer et basculer sur une nouvelle branche nommée `main` :
```bash
git checkout -b main
```

Ajouter tous les fichiers du projet à l’index Git (préparer les fichiers pour le commit) :
```bash
git add .
```



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

**SEULEMENT SI** par accident la mauvaise adresse URL HTTPS a été ajoutée, la mauvaise adresse peut être enlevée avec la commande suivante (ne pas oublier de remettre la bonne adresse avec la commande `git remote add origin ...` précédente) :
```bash
git remote remove origin
```


Récupérer les informations du dépôt distant :
```bash
git fetch origin
```

Créer une révision (*commit*) avec les fichiers du projet et y associer un message décrivant la révision :
```bash
git commit -m "Initialisation"
```

Envoyer la branche `main` (et ses commits) vers le dépôt distant.
L’option `-u` indique à Git de suivre cette branche par défaut — il sera ensuite possible d’utiliser simplement `git push` sans arguments :
```bash
git push -u origin main
```

**SEULEMENT SI** la commande précédente ne fonctionne pas (parce que le dépôt distant contient un README.md par exemple) exécuter cette commande et ensuite refaire le `push` précédent :
```bash
git merge origin/main --allow-unrelated-histories -m "Fusion"
```

Une fois ces étapes complétées, le projet est versionné localement *et* synchronisé avec le dépôt distant.

## Visual Studio Source Control

Pour utiliser **Visual Studio Source Control**, *git* doit être bien configuré sur l'ordinateur. Dans l'image suivante, on constate que Git n'est pas configuré :

![](./erreur_source_control.png)

Pour régler le problème, il suffit de configurer l'identité de l'utilisateur Git : [Configuration de l'identité Git](../configuration_identite/)