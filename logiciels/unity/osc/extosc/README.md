# Unity : OSC UDP avec extOSC

<!-- toc -->

Intégration de l’OSC UDP dans Unity avec **extOSC**.

## Initialisation d’extOSC dans Unity 

### Préalables

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


### Script de gestion de l’OSC (à faire UNE SEULE FOIS)

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


#### Lier l’adresse OSC à une fonction dans Start()

Retourner dans le script `OscProcess`.

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
        Debug.Log("Le message " + message.Address  + " n’a pas le bon nombre d’arguments");
        return; // Quitte la fonction sans exécuter la suite
    }

    // Vérifiez que l’argument est du type attendu (`int` dans l’exemple) :
    if (message.Values[0].Type != OSCValueType.Int)
    {
        Debug.Log("Le premier argument du message " + message.Address  + "n’est pas un entier");
        return; // Quitte la fonction sans exécuter la suite
    }

    // Récupérer la valeur de l’argument :
    int valeur = message.Values[0].IntValue;

    // Deboguer
    // Debug.Log("Reçu : " + message.Address + " " + valeur);

    // TRAITER LA VALEUR ICI !


}

```

###  Tableau récapitulatif

| Étape | Configuration |
|----|-----------|
| Importer `using extOSC;` | 1️⃣ Une seule fois |
| Créer un script de gestion de l’OSC  ()`OscProcess`) | 1️⃣ Une seule fois |
| Déclarer `oscReceiver` | 1️⃣ Une seule fois |
| Relier le GameObject `OSC` dans l’inspecteur | 1️⃣ Une seule fois |
| Créer une fonction de traitement (`TraiterMessage...`) | ♻️ Pour chaque adresse |
| Ajouter `oscReceiver.Bind()` dans `Start()` | ♻️ Pour chaque adresse |


## Tutoriels

- [Tutoriel relais MicroOsc : Envoi d’OSC SLIP d’un Arduino Nano avec un bouton d’arcade vers OSC UDP](/tutoriels/arcade/relais/)
- [Tutoriel Flappy Bird : Unity, Pd, OSC et Arduino Nano avec bouton d’arcade](/tutoriels/arcade/flappy/)
- [Tutoriel Pong : Unity, Pd, OSC et Arduino Nano avec bouton d’arcade et potentiomètre](/tutoriels/arcade/pong)

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