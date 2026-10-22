# extOsc : initialisation

<!-- toc -->

Ces instructions présentent l’intégration de l’OSC UDP dans Unity avec **extOSC**.

## Activer l’exécution en arrière-plan

Avant tout, il faut [activer l’exécution en arrière-plan](../../../execution_arriere-plan/) pour que Unity reçoive les messages OSC quand une autre application est en avant plan. 

## Installation d’extOSC dans Unity 

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



## GameObject OSC

> [!Note]
> Effectuez les étapes suivantes une seule fois par scène.

* Créez un nouveau *GameObject* vide nommé `OSC`.
* Ajoutez-y les scripts (inclus avec *extOSC*) `OSCTransmitter` et `OSCReceiver`.
* Configurez ces deux scripts avec les paramètres réseau appropriés.

![Le GameObject OSC configuré](./extosc_gameobject_osc.png)


## Script OscProcess

Créer un script nommé `OscProcess`. Effectuer les étapes suivantes dans ce script.

### Importer le namespace extOSC
Au début du script immédiatement après les autres `using` :
```csharp
using extOSC;
```

### Déclarer les propriétés du récepteur et de l’émetteur OSC
**Dans la classe** `OscProcess` (avant les méthodes pour plus de clarté), déclarer des propriétés `OSCReceiver` et `OSCTransmitter`:
```csharp
    public OSCReceiver oscReceiver;

    public OSCTransmitter oscTransmitter;
```

### De retour dans l’éditeur Unity lier les propriétés

- Glisser le script `OscProcess` sur le GameObject `OSC`.
- Dans l’Inspecteur, glisser-déposer le GameObject `OSC` sur la variable publique `oscReceiver` du script.
- Dans l’Inspecteur, glisser-déposer le GameObject `OSC` sur la variable publique `oscTransmitter` du script.

![Assignation de OscProcess et d’OSCReceiver dans Unity](./assigner_oscprocess.png)


## Tutoriels

- [Tutoriel relais MicroOsc : Envoi d’OSC SLIP d’un Arduino Nano avec un bouton d’arcade vers OSC UDP](/tutoriels/arcade/relais/)
- [Tutoriel Flappy Bird : Unity, Pd, OSC et Arduino Nano avec bouton d’arcade](/tutoriels/arcade/flappy/)
- [Tutoriel Pong : Unity, Pd, OSC et Arduino Nano avec bouton d’arcade et potentiomètre](/tutoriels/arcade/pong)
