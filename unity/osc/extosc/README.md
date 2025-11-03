# Unity : OSC UDP avec extOSC

Ce site documente deux paquets permettant d’utiliser OSC via UDP dans Unity :  
- **extOSC** si Visual Scripting **n’est pas utilisé** (le cas le plus courant)  
- **oscjackvs** si Visual Scripting **est utilisé** (moins fréquent)

Cette page présente **extOSC**.

## Préalables

* [Activer l’exécution en arrière-plan](/unity/execution_arriere-plan/)

## Installation de extOSC

Recherchez « extOSC » dans l’[Asset Store](https://assetstore.unity.com/) (assurez-vous d’être connecté à votre compte Unity avant) :  
![Recherche pour « extOSC » dans l’Asset Store](./extosc_install1.png)

Cliquez sur le bouton pour ajouter « extOSC » à vos *assets*, puis cliquez de nouveau pour ouvrir l’*asset* dans Unity :  
![Acquisition du paquet « extOSC »](./extosc_install2.png)

Téléchargez le paquet « extOSC » à partir du gestionnaire de paquets :  
![« extOSC » dans le gestionnaire de paquets](./extosc_install3.png)

Cliquez sur le bouton pour importer le paquet « extOSC » :  
![« extOSC » a été téléchargé](./extosc_install4.png)

Installez toutes les dépendances :  
![Boîte de dialogue sur l’installation des dépendances](./extosc_install5.png)

Importez tous les *assets* :  
![Boîte de dialogue sur les assets à importer](./extosc_install6.png)

Vous devriez maintenant voir *extOSC* dans vos *assets* :  
![« extOSC » dans les Assets du projet](./extosc_install7.png)

## Intégration de l’objet de contrôle OSC

> [!Note]
> Effectuez les étapes suivantes une seule fois par scène.

* Créez un nouveau *GameObject* vide nommé `OSC`.
* Ajoutez-y les scripts (inclus avec *extOSC*) `OSCTransmitter` et `OSCReceiver`.
* Configurez ces deux scripts avec les paramètres réseau appropriés.

![Le GameObject OSC configuré](./extosc_gameobject_osc.png)

## Exemple : réception d’un message OSC

> [!Note]
> Reproduisez et adaptez les étapes suivantes pour chaque objet devant recevoir des messages OSC.

Dans cet exemple, nous allons contrôler la rotation d’un Cube à partir de la valeur d’un message OSC `/angle`.

Pour chaque *GameObject* qui doit recevoir de l’OSC, créez un nouveau script (appelé `OscCube` dans cet exemple) :  
![Le script OscCube dans les Assets](./script_OscCube_dans_assets.png)

### Dans le script

Au tout début du script (après les autres `using`), ajoutez la ligne suivante pour utiliser le paquet **extOSC** :
```csharp
using extOSC;
```

Ensuite, dans la classe (avant les méthodes), déclarez une variable qui fera référence au script `OSCReceiver` :
```csharp
public extOSC.OSCReceiver oscReceiver;
```

Ajoutez également la méthode `Proportion()` (semblable à la fonction `scale` dans Max ou au `Math CHOP` dans TouchDesigner), utile pour adapter les échelles de valeurs :
```csharp
public static float Proportion(float value, float inputMin, float inputMax, float outputMin, float outputMax)
{
    return Mathf.Clamp(((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin), outputMin, outputMax);
}
```

Ajoutez ensuite la méthode `TraiterOscAngle()` qui sera appelée lorsqu’un message OSC (avec une adresse que nous définirons plus tard dans `Start()`) est reçu :
```csharp
void TraiterOscAngle(OSCMessage message)
{
// Si le message n'a pas d'argument ou l'argument n'est pas un Int on l'ignore
    if (message.Values.Count == 0)
    {
        Debug.Log("No value in OSC message");
        return;
    }
        
    if (message.Values[0].Type != OSCValueType.Int)
    {
        Debug.Log("Value in message is not an Int");
        return;
    }

    // Récupérer la valeur de l’angle depuis le message OSC
    int value = message.Values[0].IntValue;   

    // EXEMPLE : utiliser la valeur pour appliquer une rotation
    // Adapter proportionnellement la valeur reçue
    float angle = Proportion(value, 0, 4095, -180, 180);
    // Appliquer la rotation à l’objet
    transform.rotation = Quaternion.Euler(0, angle, 0);
}
```

Dans la méthode `Start()`, associez chaque adresse OSC à la fonction correspondante grâce à `Bind()`.  
Dans cet exemple, le message OSC `/angle` déclenche la fonction `TraiterOscAngle()` :
```csharp
oscReceiver.Bind("/angle", TraiterOscAngle);
```

### Dans l’éditeur Unity

De retour dans l’éditeur Unity :
- Ajoutez un *GameObject* (un Cube, dans cet exemple) à la scène.  
- Ajoutez-lui le script `OscCube`.  
- Liez le `OSCReceiver` du GameObject `OSC` à la variable publique du script en glissant le GameObject `OSC` sur la variable correspondante dans l’inspecteur.

![Glisser le GameObject OSC sur la variable du script ajouté à l’objet Cube](./glisser_script_OSCCube_et_instance_OSC.png)
