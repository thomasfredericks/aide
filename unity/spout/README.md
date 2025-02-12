# Spout dans Unity

## Préalables

* [Activer l'exécution en arrière-plan](/unity/execution_arriere-plan/)

## Ajouter le régistre de Keijiro qui a créé KlakSpout dans Unity

Voici l'information à inscrire dans les paramètres du gestionnaire de paquets (voir figure ci-bas) :
* Name: `Keijiro`
* URL: `https://registry.npmjs.com`
* Scope: `jp.keijiro`

![](./scope_registries_keijiro.SVG)


## Installer le paquet KlakSpout dans Unity

![](./install_spout_package.svg)

## Créer une nouvelle *Render Texture* dans les *Assets*

![](./ajouter_render_texture.png)

## Configurer la taille de la *Render Texture* et la renommer *Spout Render Texture*

![](./configurer_render_texture.png)

## Ajouter le script *Spout Sender* à la caméra, nommer le Spout *Unity* et choisir le monde de capture *Texture*

![](./ajouter_spout_sender_a_la_camera.svg)

## Configurer la caméra et *Spout Sender* 

![](./configurer_camera_et_spout_sender.svg)

> [!WARNING] 
> La caméra ne va plus effectuer de rendu dans la Game Window.

> [!NOTE] 
> Ajouter une deuxième caméra pour afficher le rendu dans la Game Window. 

> [!WARNING] 
> Si vous ajoutez une deuxième caméra pour afficher le rendu dans la Game Window, n'oubliez pas de retirer le deuxième Audio Listener! Il ne peut avoir qu'un seul Audio Listener par scène!

## Configurer votre logiciel pour recevoir le flux Spout

* [Suivre ces instructions pour recevoir le flux Spout dans TouchDesigner](/touchdesigner/spout/)
* [Suivre ces instructions pour recevoir le flux Spout dans OBS](/obs/spout/)