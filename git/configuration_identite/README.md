# Configuration de l'identité Git

L'identité Git (nom et adresse e-mail) peut être configurée à l’échelle globale, ce qui est pratique, car cela évite de la redéfinir pour chaque dépôt. Cependant, dans certains cas, on préfère la configurer à l’échelle locale (dans un dépôt spécifique), par exemple si l’on utilise différentes identités pour le travail, les projets personnels ou différentes plateformes comme GitHub et Codeberg.

## Identité globale

Remplacer "Your Name" par le nom associé au compte Git distant (nom utilisé sur GitHub, Codeberg, etc):
```bash
git config --global user.name "Your Name"
```

Remplacer "your.git.email@example.com" par le courriel associé au compte Git distant (nom utilisé sur GitHub, Codeberg, etc):
```bash
git config --global user.email "your.git.email@example.com"
```

## Identité locale

Remplacer "Your Name" par le nom associé au compte Git distant (nom utilisé sur GitHub, Codeberg, etc) :
```bash
git config --local user.name "Your Name"
```

Remplacer "your.git.email@example.com" par le courriel associé au compte Git distant (nom utilisé sur GitHub, Codeberg, etc) :
```bash
git config --local user.email "your.git.email@example.com"
```


