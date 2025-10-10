# TD : Aide mémoire Python

Source : [TouchDesigner Python Cheat Sheet for Developers - The Interactive & Immersive HQ](https://interactiveimmersive.io/blog/python/python-cheat-sheet-for-touchdesigner-developers/) par Jack DiLaura

## Formatage F-String

Les **f-strings** permettent de formater rapidement des chaînes. Préfixez une chaîne avec `f` ou `F`, puis ajoutez des expressions entre accolades `{}`. Vous pouvez utiliser un spécificateur de format (comme `:.2f` pour deux décimales) après un `:` suivant la variable.


La variable `piStr` s'évalue à _π est environ 3.14_ dans l'exemple suivant :
```python
pi = 3.14159
piStr = f'π est environ {pi:.2f}' 
```

## Récupération d'informations sur les Opérateurs (OPs)

| Description | Expression Python | Exemple de Résultat |
| :--- | :--- | :--- |
| Obtenir le chemin d'un OP par rapport à la racine | `op('text1').path` | `/project1/text1` |
| Obtenir le nom d'un OP | `op('text1').name` | `text1` |
| Obtenir le dernier chiffre (ou chiffres) dans le nom d'un OP | `op('json8Fmt24').digits` | `24` |
| Obtenir la partie de base du nom d'un OP avant le(s) dernier(s) chiffre(s) | `op('json8Fmt24').base` | `json8Fmt` |
| Interroger la valeur d'un paramètre d'OP | `op('noise1').par.seed.eval()` | `1.0` |
| Accéder au parent de l'opérateur | `op('noise1').parent()` | `/project1` |


## Travailler avec des Opérateurs

| Description | Code Python |
| :--- | :--- |
| Créer un OP | `op('/project1').create(textDAT)` |
| Créer un OP avec un nom spécifique | `op('/project1').create(textDAT, 'textJson')` |
| Copier des OPs | `op('/project1').copy(op('textJson'), name='textJson2')` |
| Supprimer un OP | `op('textJson').destroy()` |
| Renommer un OP | `op('textJson').name = 'textData'` |
| Changer le type d'un OP | `op('textData').changeType(jsonDAT)` |
| Définir le commentaire d'un OP | `op('textData').comment = 'This DAT contains test weather data for the project'` |
| Changer un paramètre d'OP | `op('noise1').par.seed = 10` |
| Pulser une valeur de paramètre | `op('timer1').par.start.pulse()` |
| Cuisiner un OP (Cooking) | `op('base1').cook()` |
| Modifier les drapeaux Render et Display d'un OP | `op('box1').render = True` <br> `op('box1').display = False` |
| Connecter des opérateurs ensemble | `op('ramp1').outputConnectors[0].connect(op('feedback1'))` |
| Exécuter du code Python après un délai | `run('op("timer1").par.start.pulse()', delayFrames=60)` |

## Temps

Le **Temps Absolu** est le temps écoulé depuis le démarrage de TouchDesigner.

| Description | Expression Python | Exemple de Résultat |
| :--- | :--- | :--- |
| Récupérer le numéro de trame local d'un nœud | `me.time.frame` | `102.0` |
| Récupérer le temps local d'un nœud en secondes | `me.time.seconds` | `1.6833333333333333` |
| Récupérer le temps absolu en trames | `absTime.frame` | `2036595` |
| Récupérer le temps absolu en secondes | `absTime.seconds` | `33942.25` |

## Accéder aux données CHOP

| Description | Expression Python | Exemple de Résultat |
| :--- | :--- | :--- |
| Évaluer le canal `chan1` à la trame actuelle | `op('noise1')['chan1'].eval()` | `0.21917423605918884` |
| Obtenir l'échantillon 2 du canal `chan1` | `op('noise1')['chan1'].eval(2)` | `0.2202223539352417` |
| Obtenir le nombre de canaux CHOP | `op('noise1').numChans` | `5` |
| Obtenir la longueur du CHOP (nombre d'échantillons) | `op('noise1').numSamples` | `600` |
| Obtenir le troisième échantillon du premier canal | `op('noise1')[0][2]` | `0.2202223539352417` |
| Obtenir le nom du 2ème canal | `op('noise1')[2].name` | `chan3` |
| Obtenir l'index du canal `chan5` | `op('noise1')['chan5'].index` | `4` |

## Travailler avec des données DAT

| Description | Expression Python |
| :--- | :--- |
| Obtenir la valeur d'une cellule par index | `op('table1')[1,2]` |
| Obtenir la valeur d'une cellule par étiquette (label) | `op('table1')['position1', 'tx']` |
| Obtenir la valeur d'une cellule par index de ligne, étiquette de colonne | `op('table1')[1, 'ty']` |
| Obtenir le nombre de lignes du tableau | `op('table1').numRows` |
| Obtenir le nombre de colonnes du tableau | `op('table1').numCols` |
| Définir la valeur d'une cellule par indices ou étiquettes | `op('table1')[3,4] = 0.24163`<br>`op('table1')[2, 'label'] = 'position1'`<br>`op('table1')['tx', 1] = 3` |
| Définir la valeur d'une cellule par étiquette | `op('table1')['position1', 'tx'] = 0.24163` |
| Copier un tableau vers un autre tableau | `op('table1').copy(op('fromTable'))` |
| Ajouter une ligne à un tableau | `op('table1').appendRow([label, 'xPos','yPos'])` |
| Ajouter une colonne à un tableau | `op('table1').appendCol(['tz', pos1tz, pos2tz ])` |
| Effacer le contenu d'un tableau | `op('table1').clear()` |
| Effacer le contenu d'un tableau, mais conserver la première ligne | `op('table1').clear(keepFirstRow = True)`♠︎ |

 ♠︎ : peut aussi utiliser `keepFirstCol = True` pour garder la première colonne, et `keepSize=True` pour garder la taille du tableau, mais supprimer tout le contenu des cellules

## Le module TDU : Une variété d'utilitaires Python utiles

Le module TDU est un fourre-tout de fonctions utiles. Pour plus de détails, consultez la page de référence sur le module TDU : `https://docs.derivative.ca/Tdu_Module`

| Description | Expression Python | Exemple de Résultat |
| :--- | :--- | :--- |
| Retourne une valeur aléatoire reproductible | `tdu.rand(seed)` | 1. `tdu.rand(me)` - *résulte en 0.749...* <br> 2. `tdu.rand(5)` - *résulte en 0.184...* <br> 3. `tdu.rand(absTime.frame)` - *résulte en 0.174... et changera à chaque trame* |
| Clampe une valeur entre min et max. | `tdu.clamp(valeur_input, min, max)` | 1. `tdu.clamp(7.35, 0, 6)` - *résulte en 6* <br> 2. `tdu.clamp('c', 'a', 'b')` - *résulte en 'b'* <br> 3. `tdu.clamp(6, 5, 5.55)` - *résulte en 5.55* |
| Remap une valeur d'entrée d'une plage initiale à une nouvelle plage | `tdu.remap(valeur_input, deMin, deMax, aMin, aMax)` | `tdu.remap(0.75, 0, 1, -180, 180)` - *résulte en 90.0* |
| Formate une chaîne pour qu'elle soit adaptée à un nom d'opérateur. Convertit les caractères illégaux en underscores. | `tdu.validName(str)` | `tdu.validName('text-dat$%JSON?')` - *retourne 'text_dat__JSON_'* |

