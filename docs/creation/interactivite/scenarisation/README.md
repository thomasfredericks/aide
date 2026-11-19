# Interactivité : scénarisation

Cette section présente une méthode de scénarisation pour l’interactivité.

## Le parcours du spectateur en interactivité

* Le parcours de l’expérience se construit dans l’interaction.
* L’utilisateur agit, explore et prend des décisions.
* Le système réagit aux actions de l’utilisateur.
* Les actions de l’utilisateur peuvent influencer le déroulement de l’expérience.
* L’utilisateur peut expérimenter, échouer et recommencer.
* L’utilisateur développe progressivement une compréhension du système.
* L’expérience peut évoluer en fonction des choix et des actions de l’utilisateur.
* L’expérience se construit par l’action, dans l’espace et dans le temps.

## Le scénario 

- Le scénario se divise en scènes.
- Chaque scène regroupe un ensemble d’éléments audiovisuels, automatiques et interactifs.  
- Lorsqu’**une** modalité d’interactivité change ou lorsque l’audiovisuel change de manière significative, il faut passer à une nouvelle scène.  
- Le passage d’une scène à l’autre est déterminé par des déclencheurs précis (automatiques ou liés aux actions de l’interacteur).

Voici le modèle à utiliser :
```markdown
## Scène ID_DE_SCENE

**Ce que l’interacteur voit :**
- ...

**Ce que l’interacteur entend :**
- ...

### Tableau des automatisations
| Déclenchement | Effet visuel | Effet sonore | Effet interactif |
| -- | -- | -- | -- |
|     |     |     |     |

### Tableau des actions
| Verbe d’action | Condition / contexte | Effet visuel | Effet sonore | Effet interactif |
| -- | -- | -- | -- | -- |
|     |     |     |     |     |
```

> ## Scène ID_DE_SCENE
> 
> **Ce que l’interacteur voit :**
> - ...
> 
> **Ce que l’interacteur entend :**
> - ...
> 
> ### Tableau des automatisations
> | Déclenchement | Effet visuel | Effet sonore | Effet interactif |
> | -- | -- | -- | -- |
> |     |     |     |     |
> 
> ### Tableau des actions
> | Verbe d’action | Condition / contexte | Effet visuel | Effet sonore | Effet interactif |
> | -- | -- | -- | -- | -- |
> |     |     |     |     |     |

## Exemples de verbes d’action


- Appuie / Presse / 
- Maintient 
- Lâche / Relâche  
- Touche / Effleure / Caresse  
- Saisit / Attrape / Ramasse  
- Pousse / Tire / 
- Brasse 
- Bascule 
- Tourne  
- Marche  
- Court  
- Roule
- Se roule 
- Saute  
- Rentre / Sort  
- S’approche / S’éloigne  
- Traverse / Contourne  
- Déplace  
- Scrute  
- Écoute  
- Renifle  
- Clique  
- Sélectionne  
- Active / Désactive  
- Ouvre / Ferme  
- Allume / Éteint  
- Rempli / Vide
- Charge  
- Déverrouille  
- Connecte  
- Déconnecte  
- Combine  
- Modifie  
- Attend  
- Évite / Esquive  
- Défend  
- Attaque / Combat  
- Protège  
- Sauve   
- Parle
- Crie
- Chante  
- Construit  
- Casse / Détruit  
- Lance / Balance  
- Pointe  
- Pose  


## Exemple 

### Scène 1 

| Verbe action | Condition de déclenchement | Effet visuel | Effet sonore | Effet interactif |
|--------|--------------|--------|--------|---------|
| Entrer | Le visiteur franchit la zone de détection principale | Une lueur douce se répand autour de lui, révélant l’espace | Une nappe sonore légère, presque respiratoire, se déclenche | Activation du système de suivi de mouvement |
| Se déplacer| S’approche du capteur de proximité activé à moins d’1 mètre | L’élément réagit par une pulsation lumineuse | Un son cristallin accompagne la pulsation | L’installation “reconnaît” la présence du visiteur et **passe à la scène 2**|

### Scène 2 

| Verbe action | Condition de déclenchement | Effet visuel | Effet sonore | Effet interactif |
|--------|--------------|--------|--------|---------|
| Gesticuler | Mouvements amples captés par les capteurs | Des flux colorés se forment autour du corps | Des textures sonores réagissent à la vitesse du geste | L’installation traduit les gestes en sons et lumières |
| Taper de mains  | Pic sonore > seuil défini | Flashs lumineux synchronisés avec le rythme | Percussions réverbérées dans l’espace | Le rythme du visiteur devient le tempo principal |
| Parler ou chanter | Détection de fréquence vocale stable | Les projections vibrent selon la tonalité de la voix | Transformation vocale en accords harmoniques | Interaction entre la voix et la matière visuelle |
| Se déplacer | Changement rapide de position | Les lumières se déplacent comme un sillage | Montée en intensité du mix sonore | Transition dynamique vers la scène suivante |
| Se déplacer | Capteurs perdent la présence  | Les lumières s’éteignent en fondu long | Le son décroît jusqu’au silence | Fin de cycle – **passe à la scène 3** |


### Scène 3

| Verbe action | Condition de déclenchement | Effet visuel | Effet sonore | Effet interactif |
|--------|--------------|--------|--------|---------|
| Quitter | Inactivité totale pendant 30 secondes  | Retour à la lumière neutre initiale | Son d’attente discret, presque imperceptible | **Passe à la scène 1** |