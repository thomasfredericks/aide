# Scénarisation

## Scénarisation de l'interactivité

En interactivité, la scénarisation s'effectue principalement par le découpage de l'expérience en **scènes** subdivisées en **règles**. Les règles sont les instructions explicites qui définissent le fonctionnement. Rappel : [Règles -> Système -> Expérience](/interactivite/design/)

Pour chaque **scène**, créer un tableau :
- 1 règle par ligne 
- 5 colonnes :
    - **Verbe action** de l'interacteur
    - Explication de la condition de **déclenchement** de la règle 
    - Effet **visuel**
    - Effet **sonore**
    - Effet **interactif** 
- Indiquer comment le passage s'effectue d'une scène à l'autre

Voici des exemples :

### Scène 1 

| Verbe action | Condition de déclenchement | Effet visuel | Effet sonore | Effet interactif |
|---------------|----------------------------|---------------|---------------|------------------|
| Entrer | Le visiteur franchit la zone de détection principale | Une lueur douce se répand autour de lui, révélant l’espace | Une nappe sonore légère, presque respiratoire, se déclenche | Activation du système de suivi de mouvement |
| Se déplacer| S'approche du capteur de proximité activé à moins d’1 mètre | L’élément réagit par une pulsation lumineuse | Un son cristallin accompagne la pulsation | L’installation “reconnaît” la présence du visiteur et **passe à la scène 2**|

### Scène 2 

| Verbe action | Condition de déclenchement | Effet visuel | Effet sonore | Effet interactif |
|---------------|----------------------------|---------------|---------------|------------------|
| Gesticuler | Mouvements amples captés par les capteurs | Des flux colorés se forment autour du corps | Des textures sonores réagissent à la vitesse du geste | L’installation traduit les gestes en sons et lumières |
| Taper de mains  | Pic sonore > seuil défini | Flashs lumineux synchronisés avec le rythme | Percussions réverbérées dans l’espace | Le rythme du visiteur devient le tempo principal |
| Parler ou chanter | Détection de fréquence vocale stable | Les projections vibrent selon la tonalité de la voix | Transformation vocale en accords harmoniques | Interaction entre la voix et la matière visuelle |
| Se déplacer | Changement rapide de position | Les lumières se déplacent comme un sillage | Montée en intensité du mix sonore | Transition dynamique vers la scène suivante |
| Se déplacer | Capteurs perdent la présence  | Les lumières s’éteignent en fondu long | Le son décroît jusqu’au silence | Fin de cycle – **passe à la scène 3** |


### Scène 3

| Verbe action | Condition de déclenchement | Effet visuel | Effet sonore | Effet interactif |
|---------------|----------------------------|---------------|---------------|------------------|
| Quitter | Inactivité totale pendant 30 secondes  | Retour à la lumière neutre initiale | Son d’attente discret, presque imperceptible | **Passe à la scène 1** |

---

