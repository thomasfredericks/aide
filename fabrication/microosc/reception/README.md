# La réception d'OSC avec MicroOsc

## Préalable(s)

- [Initialisation de MicroOsc](/microosc/initialisation/)
- Cette documentation assume une instance de `MicroOsc` nommée `monOsc`

## Principe général

La réception d’un message OSC avec MicroOsc repose sur deux éléments :

1. Définir une fonction de rappel globale.
2. Vérifier l’adresse et éventuellement les types.
3. Lire les arguments dans l’ordre.
4. Appeler `onOscMessageReceived()` à chaque passage dans `loop()`.
5. Éviter `delay()` pour ne pas bloquer la réception.

La réception OSC suit une logique événementielle : chaque message déclenche immédiatement un traitement. Cette structure permet de construire des systèmes interactifs réactifs, robustes et clairement organisés.

La réception suit également un modèle structuré :
- **ACQUISITION** : `MicroOsc` reçoit le message OSC et l'envoi à la fonction de rappel.
- **CONDITION** : vérifier l’adresse OSC et les types d’arguments du `MicroOscMessage`.
    - **ACTION** : lire les arguments pour modifier le comportement du système.

## Types supportés en réception

MicroOsc peut recevoir les types suivants :

- `i` : int32
- `f` : float
- `d` : double
- `s` : string
- `b` : blob
- `m` : MIDI (4 bytes)

Les arguments doivent toujours être lus dans l’ordre défini par les type tags.

## Intégration

### Dans l’espace global

Créer une **fonction de rappel** qui sera appelée chaque fois qu’un message OSC est reçu :

```cpp
// FONCTION APPELÉE LORSQU'UN MESSAGE OSC EST REÇU
void maFonctionRappelOsc(MicroOscMessage & message) {
    // CONDITIONS ET ACTIONS ICI
}
```

### Dans la fonction de rappel

Chaque message OSC possède :

- une **adresse** (ex. `"/alpha"`)
- une **liste de types** appelée *type tags* (ex. `"i"` (un entier), `"if"` (un entier et un nombre réel), `"f"` (un nombre réel))

La méthode `checkOscAddressAndTypeTags()` permet de vérifier simultanément :

- que l’adresse correspond exactement
- que les types d’arguments correspondent exactement

Cette vérification constitue la **CONDITION** du traitement.

```cpp
// FONCTION APPELÉE LORSQU'UN MESSAGE OSC EST REÇU
void maFonctionRappelOsc(MicroOscMessage & message) {

   // CONDITION : vérifier adresse ET types
   if (message.checkOscAddressAndTypeTags("/alpha", "i")) {  // MODIFIER l’adresse si nécessaire

        int valeur = message.nextAsInt();  // ACTION : lire l’argument

        // ACTION utilisant la valeur
   } 
   else if (message.checkOscAddressAndTypeTags("/beta", "if")) {  // MODIFIER l’adresse si nécessaire

        int index   = message.nextAsInt();
        float angle = message.nextAsFloat();

        // ACTION utilisant les deux arguments
   }
}
```

Pourquoi vérifier aussi les types :

- Cela évite de lire un `float` comme un `int`.
- Cela protège le programme contre des messages inattendus.
- Cela rend le comportement du système plus robuste et prévisible.

Si seule l’adresse doit être vérifiée, la méthode `checkOscAddress()` peut être utilisée, mais la vérification des types est recommandée dans les systèmes interactifs complexes.


### Lire les arguments du MicroOscMessage dans la fonction de rappel

Points importants :
- Les arguments doivent être lus **dans le même ordre** que celui utilisé lors de l’envoi.
- Chaque appel à `nextAs...()` avance un pointeur interne vers l’argument suivant.
- Il faut utiliser la méthode de lecture appropriée à chaque type.

Si l’argument envoyé est de type `i` (int32), la lecture se fait avec `nextAsInt()` :

```cpp
if (message.checkOscAddressAndTypeTags("/valeur", "i")) { // CONDITION

    int valeur = message.nextAsInt();

    // ACTION utilisant la valeur entière
}
```

Si l’argument envoyé est de type `f` (float), la lecture se fait avec `nextAsFloat()` :

```cpp
if (message.checkOscAddressAndTypeTags("/valeur", "f")) { // CONDITION

    float valeur = message.nextAsFloat();

    // ACTION utilisant la valeur flottante
}
```

Dans le cas de plusieurs arguments, ils doivent être lus successivement, dans l’ordre exact d’envoi :

```cpp
if (message.checkOscAddressAndTypeTags("/coordonnees", "if")) { // CONDITION

    int index   = message.nextAsInt();
    float angle = message.nextAsFloat();

    // ACTION utilisant les deux valeurs
}
```

Chaque appel à `nextAsInt()` ou `nextAsFloat()` déplace le pointeur interne vers l’argument suivant. Si l’ordre de lecture ne correspond pas aux type tags du message, les valeurs récupérées seront incorrectes.

Il est donc essentiel que l’ordre et les types de lecture correspondent exactement à ceux définis lors de l’envoi du message OSC.


### Déclencher l'acquisition dans `loop()`

Dans `loop()`, il faut appeler :

```cpp
monOsc.onOscMessageReceived(maFonctionRappelOsc); // ACQUISITION DES MESSAGES
```

Cet appel :

- vérifie si des données sont disponibles
- parse les messages reçus
- appelle la fonction de rappel pour chaque message


Il est fortement déconseillé d’utiliser `delay()` dans `loop()` lors de la réception OSC.

Pourquoi :

- `delay()` bloque l’exécution
- les messages OSC peuvent être perdus
- la latence augmente

Si un ralentissement est nécessaire, utiliser un chronomètre avec la bibliothèque `Chrono` comme dans cet extrait :
```cpp
#include <Chrono.h>

Chrono monChrono;

void loop() {

    // ACQUISITION instantannée des messages OSC
    monOsc.onOscMessageReceived(maFonctionRappelOsc);

    // CONDITION temporelle pour ralentir une autre partie du code
    if (monChrono.hasPassed(5)) {
        monChrono.restart();

        // ACTION exécutée toutes les 5 ms
        // Exemple : mise à jour d’un affichage
    }
}
```

Dans cette structure :

- La réception OSC reste rapide et non bloquante.
- Les traitements plus lents sont contrôlés séparément.
- Le système reste réactif et stable.





## Exemple complet

```cpp

#include <MicroOscSlip.h>
MicroOscSlip<128> monOsc(&Serial); // <#> : nombre d'octets pour la réception de messages

#include <Chrono.h>
Chrono monChrono;

void setup() {
    Serial.begin(115200);
}

// FONCTION APPELÉE LORSQU'UN MESSAGE OSC EST REÇU
void maFonctionRappelOsc(MicroOscMessage & message) {

   // CONDITION : vérifier adresse ET types
   if (message.checkOscAddressAndTypeTags("/alpha", "i")) {  // MODIFIER l’adresse si nécessaire

        int valeur = message.nextAsInt();  // ACTION : lire l’argument

        // ACTION utilisant la valeur
   } 
}

void loop() {

    // ACQUISITION des messages OSC
    monOsc.onOscMessageReceived(maFonctionRappelOsc);

}
```