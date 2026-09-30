# Unity : OSC UDP avec extOSC

<!-- toc -->

Intégration de l’OSC UDP dans Unity avec **extOSC**.

## Initialisation d’extOSC dans Unity 

### Préalables

- [Ajouter le bon `.gitignore` au projet Unity](../../git/) s’il n’y en a pas
- [Activer l’exécution en arrière-plan](../../execution_arriere-plan/)

### Installation de extOSC

Recherchez « extOSC » dans l’[Asset Store](https://assetstore.unity.com/) (assurez-vous d’être connecté à votre compte Unity avant) :  
![Recherche pour « extOSC » dans l’Asset Store](./extosc_install1.png)

Cliquez sur le bouton pour ajouter « extOSC » à vos *assets*, puis cliquez de nouveau pour ouvrir l’*asset* dans Unity :  
![Acquisition du paquet « extOSC »](./extosc_install2.png)

Téléchargez le paquet « extOSC » à partir du gestionnaire de paquets :  
![« extOSC » dans le gestionnaire de paquets](./extosc_install3.png)

Cliquez sur le bouton pour importer le paquet « extOSC » :  
![« extOSC » a été téléchargé](./extosc_install4.png)

Installez toutes les dépendances :  
![Boîte de dialogue sur l’installation des dépendances](./extosc_install5.png)

Importez tous les *assets* :  
![Boîte de dialogue sur les assets à importer](./extosc_install6.png)

Vous devriez maintenant voir *extOSC* dans vos *assets* :  
![« extOSC » dans les Assets du projet](./extosc_install7.png)



## Initialisation de l’objet de contrôle OSC

> [!Note]
> Effectuez les étapes suivantes une seule fois par scène.

* Créez un nouveau *GameObject* vide nommé `OSC`.
* Ajoutez-y les scripts (inclus avec *extOSC*) `OSCTransmitter` et `OSCReceiver`.
* Configurez ces deux scripts avec les paramètres réseau appropriés.

![Le GameObject OSC configuré](./extosc_gameobject_osc.png)



## Réception d’OSC dans Unity avec extOSC 


### Préalable(s)

* Avoir suivi les instructions sur l’initialisation d’extOSC.

####  Tableau récapitulatif

| Étape | Configuration |
|----|-----------|
| Importer `using extOSC;` | 1️⃣ Une seule fois |
| Déclarer `oscReceiver` | 1️⃣ Une seule fois |
| Relier le GameObject `OSC` dans l’inspecteur | 1️⃣ Une seule fois |
| Créer une fonction de traitement (`TraiterMessage...`) | ♻️ Pour chaque adresse |
| Ajouter `oscReceiver.Bind()` dans `Start()` | ♻️ Pour chaque adresse |

### Configuration globale (à faire UNE SEULE FOIS)

Créer un script nommé `OscProcess`. Effectuer les étapes suivantes dans ce script.

#### Importer le namespace extOSC
Au début du script immédiatement après les autres `using` :
```csharp
using extOSC;
```

#### Déclarer la variable du récepteur OSC
Dans la classe `OscProcess` et avant les méthodes, déclarer une référence au `OSCReceiver` :
```csharp
public extOSC.OSCReceiver oscReceiver;
```

#### De retour dans l’éditeur Unity lier les propriétés

- Glisser le script `OscProcess` sur le GameObject `OSC`.
- Dans l’Inspecteur, glisser-déposer le GameObject  `OSC` sur la variable publique `oscReceiver` du script.

![Assignation de OscProcess et d’OSCReceiver dans Unity](./assigner_oscprocess.png)

### Configuration par adresse OSC (à répéter pour chaque adresse)

> [!IMPORTANT] 
> Pour chaque adresse OSC différente (`/but0`, `/but1`, `/angle`, `/lumiere`, etc.), vous devez créer **une fonction dédiée** et **un Bind() séparé**.

#### Retourner dans le script `OscProcess`

#### Lier l’adresse OSC à une fonction dans Start()
Dans la méthode `Start()`, associez chaque adresse OSC à sa fonction via `Bind()`. Par exemple, ici nous indiquons que lors que le message `"/but0"` est reçu, nous déclenchons la méthode `TraiterMessageBut0` (que nous définissons par après) :
```csharp
oscReceiver.Bind("/but0", TraiterMessageBut0);
```

> [!WARNING]
> Créez un `oscReceiver.Bind()` et une fonction de traitement différente pour **CHAQUE** adresse OSC à traiter.

#### Créer une fonction de traitement dédiée
Chaque adresse nécessite sa propre fonction avec un nom explicite. Ici nous ajoutons la méthode `TraiterMessageBut0` dans la classe `OscProcess` (à la fin) :
```csharp
void TraiterMessageBut0(OSCMessage message)
{
    // Validez qu’il y a bien le nombre attendu d’arguments (1 dans l’exemple) :
    if (message.Values.Count != 1)
    {
        Debug.Log("Le message " + message.Address  + " n"a pas le bon nombre d’arguments");
        return; // Quitte la fonction sans exécuter la suite
    }

    // Vérifiez que l’argument est du type attendu (`int` dans l’exemple) :
    if (message.Values[0].Type != OSCValueType.Int)
    {
        Debug.Log("Le premier argument du message " + message.Address  + "n"est pas un entier");
        return; // Quitte la fonction sans exécuter la suite
    }

    // Récupérer la valeur de l’argument :
    int valeur = message.Values[0].IntValue;

    // Deboguer
    // Debug.Log("Reçu : " + message.Address + " " + valeur);

    // FAIRE DE QUOI AVEC LA VARIABLE VALEUR ICI !
    if ( valeur == 1 ) {

    } else {

    }

}

```

## Exemple Flappy Bird Unity et Arduino Nano avec bouton d’arcade par OSC

Quand on appuie sur un bouton d’Arcade, cela envoie le message OSC SLIP `/but0 1` à Pd qui le relaye par UDP à Unity.

```mermaid
flowchart LR

    A[Arduino] -- OSC SLIP --> Pd
    
    Pd -- OSC UDP --> C[Unity]
```

### Préalables

- Suivre les instructions pour l’exemple du bouton d’Arcade au bas de la page [MicroOsc SLIP](/fabrication/arduino/microosc/slip/).
- Cloner le dépôt [github.com/thomasfredericks/unity-flappybird](https://github.com/thomasfredericks/unity-flappybird).
- [Ajouter le bon `.gitignore` au projet Unity](../../git/) s’il n’y en a pas
- Suivre les instructions pour l’intégration d’extOSC ci-haut.

### Investiguer le code Unity

Identifier le code Unity pour trouver le bloc de code ou la méthode qui :
- Démarre le jeu.
- Bat les ailes du personnage.

Dans le script `InputProcess` on retrouve les lignes suivantes :
```csharp
    public GameManager gameManager;
    public Player player;
```

Ainsi que celles-ci :
```csharp
    void Update()
    {
        if ( (Input.GetKeyDown(KeyCode.Space) || Input.GetMouseButtonDown(0)))
        {
            gameManager.StartGame(); // Ignored if game is already playing, handled in GameManager
            player.Jump();}
    }
```

![Le script InputProcess sur le GameObject EventSystem](./inputprocess_script.png)

### Modifier le code Unity

Il faut ajouter les propriétés suivantes dans la classe de notre script `OscProcess` :
```csharp
    public GameManager gameManager;
    public Player player;
```

Nous modifions aussi notre méthode `TraiterMesageBut0` du script `OscProcess` :
```csharp
    // FAIRE DE QUOI AVEC LA VARIABLE VALEUR ICI !
    if (valeur == 1)
    {
        gameManager.StartGame(); // Ignored if game is already playing, handled in GameManager
        player.Jump();
    } else {

    }

```

![Assignation de Player et GameState au script OscProcess](./assigner_gamestate_et_player.png)

> [!NOTE]
> Appuyer sur Play pour partir le projet Unity!

### Le patcher Pd

Le patcher Pd `relais_osc_slip_vers_udp.pd` permet :
- D’envoyer des messages OSC UDP à Unity.
- De relayer les messages OSC SLIP reçus par `comport` en OSC UDP à Unity.

![Patcher relais_osc_slip_vers_udp.pd](./relais_osc_slip_vers_udp_pd.png)

Télécharger le patcher ici : [relais_osc_slip_vers_udp.pd](./relais_osc_slip_vers_udp.pd)

> [!WARNING]
> Dans le patcher `relais_osc_slip_vers_udp.pd`, il faut s’assurer que le port UDP est le même que celui du `OSC Receiver` du GameObject `OSC` dans Unity. Il est de 8001 dans l’image plus bas, mais est-ce que c’est le bon ?

Il est possible de tester la réception de l’OSC dans Unity à l’aide de `pdchoco/osc_formatter`. Y entrer les informations suivantes et appuyer sur `send` :
- **address** : `but0` (ce qui correspond en OSC à /but0)
- **format** : `i` (un entier)
- **arguments** : `1`

![Zoom sur une portion du patcher relais_osc_slip_vers_udp.pd](./relais_osc_slip_vers_udp_pd_zoom.png)


> [!NOTE]
> Terminer de configurer `comport` et appuyer sur le bouton d’arcade ; Flappy devrait battre des ailes !

Les messages OSC SLIP sont envoyés à Pure Data qui les relaye à Unity en OSC UDP.

```mermaid
flowchart LR

    A[Arduino] -- OSC SLIP --> comport
    
    subgraph Pd
        direction LR
        comport --> deslip[SLIP parse] 
        deslip ---> netsend
    end
    
    netsend -- OSC UDP --> C[Unity]
```
<!--
### Tester avec des messages OSC

Tester en envoyant à Unity un messages OSC de type entier avec une valeur 0 ou 1 tel que :
- `but0 0`
- `but0 1`


## Fonction utilitaire ChangerPlageDeValeurs()

Si les données reçues ne sont pas limitées entre les valeurs 0 et 1, il faut souvent ajuster la plage des valeurs. Supposons la lecture analogique d’un potentiomètre 12 bits (valeurs 0 à 4095) pour contrôler la rotation d’un objet dans Unity. La fonction suivante effectue une reconversion linéaire de plage de valeurs (aussi appelée mapping ou remapping). Elle transforme proportionnellement une valeur d’une plage d’entrée vers une plage de sortie différente.

Ajouter cette méthode dans la classe `OscProcess` :
```csharp
public static float ChangerPlageDeValeurs(float value, float inputMin, float inputMax, float outputMin, float outputMax)
{
    return Mathf.Clamp(((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin), outputMin, outputMax);
}
```

### Lors de la réception des valeurs dans TraiterMessage...

Appliquez vos transformations et actions sur l’objet :
```csharp
// Récupérer la valeur de l’argument :
int valeur = message.Values[0].IntValue;

// Exemple : adapter proportionnellement la valeur reçue
float angle = ChangerPlageDeValeurs(valeur, 0, 4095, -180, 180);

// Exemple : appliquer une rotation à un objet ciblé
tagetGameObjet.transform.rotation = Quaternion.Euler(0, angle, 0);
```

->