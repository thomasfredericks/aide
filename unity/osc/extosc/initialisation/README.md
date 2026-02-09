# Unity+extOSC : initialisation

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
