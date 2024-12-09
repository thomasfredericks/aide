# Relais OSC SLIP ⇄ MIDI avec Pure Data

## Prérequis

Cette solution nécessite l'installation de **Pure Data** ou de **Plug Data**.

## OSC SLIP dans Pure Data

### Installation des objets additionnels pour l'OSC SLIP dans Pure Data

Pour recevoir et envoyer de  l'OSC SLIP, il est nécessaire d'ajouter l'object **comport** à Pure Data.

![Ouvrir le menu d'installation des objets supplémentaires](./pd_installer_objets_supplementaires.svg)

![Installer comport](./pd_installation_comport.svg)

![Installation de comport réussie (parfois le logiciel ne confirme pas l'installation réussie)](./pd_installation_comport_reussie.svg)


## Patcher Pure Data pour le relais des messages OSC SLIP ⇄ UDP 

[![Capture d'écran du patcher «osc_slip.pd» (l'opacité du code optionnel a été réduite)](./osc_slip_pd_relay.svg)

Télécharger le patcher ici : [osc_relay.pd](./osc_relay.pd)

