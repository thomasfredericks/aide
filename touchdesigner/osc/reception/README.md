# Réception de l'OSC dans TouchDesigner


> [!WARNING]
> Dans TouchDesigner les adresses de messages OSC perdent leur /.
> L'adresse OSC /bouton devient bouton dans TouchDesigner.


## Ajouter un CHOP _Osc In_

![Un CHOP Osc In qui a reçu des messages OSC avec les adresses /button et /angle](chop-oscin.png)

##  Configurer les paramètres du _Osc In_

Utiliser le même numéro de port que celui défini dans l'expéditeur.

![Paramètres du CHOP Osc In](chop-oscin_parameters.png)


##  Isoler les différents messages OSC avec des CHOP _Select_

![CHOP Select pour les messages OSC avec l'adresse /button](bouton_select_parameters.png)

![CHOP Select pour les messages OSC avec l'adresse /angle](angle_select_parameters.png)


![Réseau pour recevoir l'OSC et distinguer les messages OSC /button et /angle](angle_select-tail-null.png)


