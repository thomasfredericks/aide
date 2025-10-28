#  Unity : OSC UDP avec extOSC


Ce site documente deux paquets pour OSC UDP dans Unity  :
- **extOSC** si Visual Scripting n'est pas utilisé (plus commun) 
- **oscjackvs** si Visual Scripting est utilisé (moins commun)

Cette page présente **extOSC**.

## Préalables

* [Activer l'exécution en arrière-plan](/unity/execution_arriere-plan/)

## Installation de extOSC

Trouvez «extOSC» dans l'[Asset Store](https://assetstore.unity.com/) (n'oubliez pas de vous connecter avec votre compte Unity avant) :
![Recherche pour «extOSC» dans l'Asset Store](./extosc_install1.png)

Cliquez le bouton pour ajouter «extOSC» à vos *assets* et cliquez de nouveau sur le bouton pour ouvrir l'*asset* dans Unity :
![Acquisistion du paquet «extOSC»](./extosc_install2.png)

Téléchargez le paquet «extOSC» à partir du gestionnaire de paquet :
![«extOSC» dans le gestionnaire de paquet](./extosc_install3.png)

Cliquez le bouton pour importer le paquet «extOSC» :
![«extOSC» a été téléchargé](./extosc_install4.png)

Installez toutes les dépendances :
![Boîte de dialogue sur l'installation des dépendances](./extosc_install5.png)

Importez tous les *assets* :
![Boîte de dialogue sur les assets à importer](./extosc_install6.png)

Vous devriez maintenant trouver *extOSC* dans vos *assets* :
![«extOSC» dans les Assets du projet](./extosc_install7.png)



## Intégration de l'objet de contrôle OSC

> [!Note]
> Suivre les instructions suivantes une seule fois par scène.

* Créer un nouveau *GameObject* vide nommé `OSC`.
* Ajouter les scripts (inclus avec *extOSC*) `OSCTransmitter` et `OSCReceiver` au  *GameObject* `OSC`.
* Configurer les deux scripts avec la configuration réseau appropriée.

![Le GameObject OSC configuré](./extosc_gameobject_osc.png)

## Exemple d'intégration de la réception d'un message OSC

> [!Note]
> Suivre les instructions suivantes pour chaque objet qui doit recevoir de l'OSC.

Créez un nouveau script (nommé `OscCube` dans cet exemple) :
![Le script OscCube dans les Assets](./script_OscCube_dans_assets.png)

### Dans ce script

Au tout début (après les autres `using`) du script, indiquez que vous allez utiliser le paquet « extOSC » en ajoutant `using extOSC` :
```csharp
using extOSC;
```

Ensuite, dans la classe (avant les méthodes), ajoutez une variable qui pointera vers le script `OSCReceiver` :
```csharp
public extOSC.OSCReceiver oscReceiver;
```

Dans la classe (avant les autres méthodes), ajoutez la méthode `Proportion()` très utile qui permet d'adapter les échelles des valeurs (comme `scale` dans Max ou `Math CHOP` dans TouchDesigner) :
```csharp
 public static float Proportion(float value, float inputMin, float inputMax, float outputMin, float outputMax)
    {
        return Mathf.Clamp( ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin), outputMin,outputMax);
    }
```

Nous ajoutons aussi la méthode `TraiterOscAngle()` suivante à la classe qui va être appelée quand un message OSC (avec l'adresse qui sera définie plus tard dans `Start()`) est reçu :
```csharp
void TraiterOscAngle(OSCMessage message)
{
    // Si le message n'a pas d'argument ou l'argument n'est pas un Int on l'ignore
    if (message.Values.Count == 0)
        return;
    if (message.Values[0].Type != OSCValueType.Int)
        return;

    // Récupérer la valeur de l'angle depuis le message OSC
    int value = message.Values[0].IntValue;   

    // EXEMPLE : Utiliser la valeur pour l'appliquer à la rotation
    // Ajuster proportionnellement la valeur
    float angle = Proportion(value, 0, 4095, -180, 180);
    // Appliquer la rotation à l'objet en fonction de l'angle reçu
    transform.rotation = Quaternion.Euler(0, angle, 0);
}
```

Dans la méthode `Start()` on définit pour chaque adresse OSC le nom de la méthode correspondante qui sera appelée avec un `Bind()`, dans cet exemple, l'adresse OSC `/angle` déclenche la fonction `TraiterOscAngle()` :
```csharp
oscReceiver.Bind("/angle", TraiterOscAngle);
```

### Dans l'éditeur Unity

De retour dans l'éditeur Unity :
- On ajoute un GameObject, un Cube dans cet exemple, sur la scène
- On lui ajoute le script `OscCube`. 
- Ensuite, il faut lier le `OSCReceiver` du GameObject `OSC` à la variable du script que l'on a créé en glissant le GameObject `OSC` sur la variable.

![Glisser le GameObject OSC sur la variable du script que l'on a créé et qu'on a ajouté à notre objet Cube](./glisser_script_OSCCube_et_instance_OSC.png)

### Effet désiré

En exécutant le projet Unity, la rotation du cube devrait suivre la valeur du message OSC '/angle'.


