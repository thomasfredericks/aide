# Types d’intelligence artificielle


## La confusion autour du terme "IA"

> [!WARNING]
> Le terme « IA », sans qualificatif, est un **buzzword** marketing qui embrouille le public. 
> Il existe en réalité plusieurs types d’IA vastement différents. Dans aucun cas, le système est réellement intelligent ou conscient.

## Tableau comparatif 

| Critère | GML (LLM) | Générateur d’images | IA pour Échecs/Go | IA jeu vidéo | IA Générale |
|-----|------|-------|----------|-------|-------|
| **Spécialité** | Texte, langage naturel | Générer des images | Un jeu **spécifique** | Comportements de PNJ | Remplacer un humain |
| **Fonctionnement** | Reconnaissance de motifs | Reconstitue une image à partir de bruit (diffusion) | Simulation des coups possibles | Scripts de concepteurs | — |
| **Apprentissage** | Données textuelles massives | Corpus d’images + débruitage itératif | Auto-play / renforcement | Scripté par humains | Hypothétique |
| **Flexibilité** | Multi-tâches (superficiel) | Une tâche (visuel), qualité variable | Une tâche, niveau super-humain | Tâche unique, limitée | Illimitée (si existait) |
| **Transparence** | Boîte noire | Boîte noire | Partiellement traçable | Complètement transparente | Inconnue |
| **Conscience** | Aucune | Aucune | Aucune | Aucune | Hypothétique |
| **État** | Disponible | Disponible | Disponible | Disponible | N"existe pas |
| **Exemples** | ChatGPT, Claude | Stable Diffusion, DALL-E 3, Midjourney | AlphaGo, Deep Blue | A*, FSM | N"existe pas |
| **Architecture** | Transformers | Diffusion Models / GANs | MCTS + Réseaux neuronaux | FSM, Behavior Trees | — |



## Grand modèle de langage (GML)

Le GML sont constitués à partir de réseau neuronaux. 
**Les systèmes neuronaux fonctionnent comme un moteur de reconnaissance de motifs.**  
Ils ne comprennent pas le sens, mais identifient des régularités statistiques dans les données d’entraînement pour prédire la suite la plus probable.


> [!NOTE]
> Contrairement à ce que l’on pourrait croire, les technologies d’IA ne sont pas récentes. Elles sont en développement depuis les années 1950.


### Caractéristiques principales

- **Architecture** : Réseaux de neurones profonds (transformers)
- **Données d’entraînement** : Corpus textuels massifs (Internet, livres, articles)
- **Mécanisme** : Reconnaissance de motifs
- **Sorties** : Texte, code, traduction, résumé, dialogue

### Avantages

✅ Large éventail de tâches dans plusieurs domaines  

### Limites et risques

❌ Risques de biais, d’erreurs ou de dérives  
❌ Moins contrôlable, comportements complexes et parfois imprévus  
❌ Plus opaque, explicabilité partielle  
❌ Élevé impact environnemental : modèles massifs, infrastructure lourde  
❌ Moins durable, dépendance aux géants du cloud  
❌ Très élevés coûts : en données, calcul, maintenance  


## Générateur d’image

Le générateur apprend à reconstruire des images en partant d’un bruit aléatoire. Il utilise les motifs appris durant l’entraînement pour débruiter progressivement jusqu"à obtenir une image cohérente correspondant au prompt texte.

### Caractéristiques principales

- **Architecture** : Réseaux de neurones profonds (diffusion models, GANs, transformers)
- **Données d’entraînement** : Millions d’images avec descriptions textuelles associées
- **Mécanisme** : Reconnaissance de motifs visuels et génération progressive
- **Sorties** : Images, illustrations, photographies synthétiques


### Avantages

✅ Création rapide d’illustrations originales   
✅ Grande variété de styles possible  

### Limites et risques

❌ Problèmes de droits d’auteur sur les données d’entraînement  
❌ Difficulté à contrôler précisément les détails  
❌ Risque de deepfakes et désinformation visuelle  
❌ Impact environnemental similaire aux GML  


## IA générale (AGI) hypothétique

L’**IA générale** désigne une intelligence artificielle hypothétique capable de :
- Remplacer un humain
- Comprendre, apprendre et appliquer ses connaissances à travers tous les domaines
- S’adapter contextuellement
- Prendre des décisions autonomes dans des situations inédites


> [!IMPORTANT]
> Contrairement à la confusion véhiculée par le marketing techno-solutionniste, une IA générative (GML) **ne peut pas évoluer** en IA générale (AGI). Ce sont deux technologies fondamentalement distinctes, tant par leur architecture que par leur fonctionnement.
> **Cette technologie n"existe pas aujourd"hui.**  Elle reste de la science-fiction.

##  IA pour jeux de stratégie (Échecs, Go, etc)


L’IA de stratégie fonctionne comme une **base de données de toutes les possibilités** combinée à une simulation des alternatives.  Elle calcule systématiquement les coupes futures ou consulte une bibliothèque exhaustive de positions connues pour choisir le mouvement optimal.

Ces systèmes ont exploré pratiquement toutes les parties possibles dans leurs environnements fermés. Pour les jeux aux règles simples comme les échecs, le nombre de combinaisons reste gérable par force brute assistée. Pour des jeux plus complexes comme le Go, ils combinent recherche arborescente et apprentissage profond pour évaluer les positions sans avoir une mémoire de toutes les parties.

### Explication technique

Il existe deux approches principales :

1. **Base de données exhaustive** : Stockage de millions/milliards de positions déjà jouées avec leur issue connue. Quand une position apparaît, l’IA consulte directement cette base.

2. **Simulation des alternatives** : Arbres de décision où l’algorithme explore virtuellement chaque branche possible, évalue les issues potentielles, et sélectionne la meilleure trajectoire (Minimax, MCTS).

### Architecture technique

- **Environnement** : Espace de règles fermé et parfaitement défini
- **Algorithmes principaux** : Minimax, Monte Carlo Tree Search (MCTS)
- **Approche moderne** : Combinaison de MCTS + réseaux de neurones profonds (AlphaGo)
- **Apprentissage** : Apprentissage par renforcement par auto-play


### Exemples emblématiques

| Système | Jeu | Année | Organisme |
|-----|---|----|------|
| Deep Blue | Échecs | 1997 | IBM |
| AlphaGo | Go | 2016 | DeepMind |
| AlphaZero | Échecs/Go/Shogi | 2017 | DeepMind |
| Pluribus | Poker | 2019 | CMU/Facebook |

### Avantages

✅ Niveau super-humain dans son domaine spécialisé  
✅ Résultats reproductibles et traçables  
✅ Environnement contrôlé et prédictible  

### Limites

❌ Ne fonctionne PAS hors du domaine spécifique  



## IA traditionnelle dans les jeux vidéo 

L’IA de jeu vidéo est **scriptée par les concepteurs**. Chaque comportement est prémédité et codé explicitement, sans aucune capacité d’apprentissage autonome.

L’IA de jeu vidéo n"est **pas de l’apprentissage**. Chaque comportement est scripté et paramétré par les concepteurs. Il n"y a pas d’adaptation autonome.

### Techniques utilisées

| Technique | Usage |
|------|----|
| Machines à états finis | Comportements de PNJ simples |
| Arbres de comportement | Logique décisionnelle complexe |
| Pathfinding (A*) | Navigation et déplacement |
| Behavior Trees | Hiérarchie d’actions conditionnelles |

### Objectifs de conception

1. **Créer l’illusion** d’intelligence pour l’expérience joueur
2. **Maintenir le contrôle** des développeurs sur le gameplay
3. **Assurer la performance temps réel** (60 FPS+)
4. **Garantir la reproductibilité** du comportement

### Avantages

✅ Complètement transparente (code accessible)  
✅ Prévisible et contrôlable  
✅ Légère en ressources computationnelles  

### Limites

❌ Pas d’apprentissage autonome  
❌ Comportement scripté, non adaptatif  
❌ Dépendante entièrement des développeurs  



