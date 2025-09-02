# Introduction à Pure Data de Max

## Interface générale

- **Patchs** : Comme dans Max, un patch est un fichier `.pd`.  
- **Objets** : Même principe que dans Max, créés dans des boîtes rectangulaires.  
- **Commentaires** : Boîtes de texte (utilisées pour documenter).  
- **Messages** : Boîtes spécifiques avec un texte qui envoie des valeurs ou instructions.  
- **Nombres** : boîtes de contrôle numériques (`floatatom` ou `number`).  
- **Bang** : bouton rond qui envoie une impulsion (équivalent du "button" dans Max).  
- **Toggles, sliders, radios** : éléments d’IU très similaires, mais plus sobres graphiquement.  

⚠️ Pure Data a une esthétique plus minimale que Max : pas d’ombres, de couleurs riches ou d’arrondis, mais la logique reste la même.


## Modes d’édition et d’exécution

- **Edit Mode (édition)** : nécessaire pour créer/déplacer/effacer des objets.  
- **Run Mode (exécution)** : nécessaire pour cliquer sur les bangs, toggles, sliders, etc.  

### Raccourci :
- **⌘ + E** (macOS) ou **Ctrl  + E** (Windows/Linux) : bascule entre édition et exécution.  
*(équivalent du “lock/unlock” dans Max).*



## Raccourcis clavier principaux

| Action                             | Pure Data                         | Max         |
|-----------------------------------|-----------------------------------|---------------------------|
| Basculer édition/exécution         | ⌘E / Ctrl E                        | ⌘E / Ctrl E (lock/unlock)  |
| Créer un objet                     | ⌘1 / Ctrl 1                        | n (new object)            |
| Créer un message                   | ⌘2 / Ctrl 2                        | m (message)               |
| Créer un nombre (floatatom)        | ⌘3 / Ctrl 3                        | i (number)                |
| Créer un symbole (symbolatom)      | ⌘4 / Ctrl 4                        | s (symbol)                |
| Créer un commentaire               | ⌘5 / Ctrl 5                        | c (comment)               |
| Annuler                            | ⌘Z / Ctrl Z                        | ⌘Z / Ctrl Z                |
| Copier / Coller                    | ⌘C / Ctrl C — ⌘V / Ctrl V           | Idem                      |
| Dupliquer                          | ⌘D / Ctrl D                        | ⌘D / Ctrl D                |
| Sauvegarder                        | ⌘S / Ctrl S                        | ⌘S / Ctrl S                |
| Zoom avant/arrière                 | ⌘+/- / Ctrl +/—          | ⌘+/- / Ctrl +/— |
| Connecter/déconnecter un câble     | clic sur sortie → clic sur entrée | idem                      |



## Éléments d’IU principaux

- **Bang** : déclenche une action ponctuelle.  
- **Toggle** : interrupteur marche/arrêt (0 ou 1).  
- **Number box (floatatom)** : valeur numérique affichée ou entrée.  
- **Symbol box** : texte/chaîne.  
- **Slider** : glissière horizontale ou verticale.  
- **Radio** : boutons exclusifs (sélection unique).  
- **Canvas** : zones graphiques de couleur (pour interface personnalisée).  



## Différences à noter

- **Audio on/off** : dans Pd, il faut activer le DSP avec le menu **Media > DSP On** (ou bouton dans la fenêtre principale), contrairement à Max qui a un interrupteur intégré au patch.  
- **Abstractions** : comme les patchers dans Max, mais les fichiers doivent être dans le chemin de recherche de Pd.  
- **Help** : clic droit sur un objet → "Help" ouvre un patch d’exemple/documentation (Max ouvre une fenêtre d’aide intégrée).  
- **Graph-on-parent** : permet de créer des interfaces dans un sous-patch, équivalent à un patcher avec présentation personnalisée dans Max.  


