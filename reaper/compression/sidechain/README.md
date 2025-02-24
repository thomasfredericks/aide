# Compression *sidechain* dans Reaper

La compression *sidechain* permet à une piste ou une groupe de piste de contrôler le volume d'une piste ou d'un groupe de piste. Voici un exemple : [Understanding Compression: Sidechaining in REAPER - YouTube](https://www.youtube.com/watch?v=JEKKGup1J68)


## Démonstration

Dans la démonstration qui suit, on veut que le volume des sons interactifs baisent automatiquement le volume de la piste d'ambiance/musique.

### Grouper les pistes qui vont contrôler le volume de l'ambiance ou de la musique

![ Cliquer le petit dossier pour grouper les pistes ](./grouper_pistes.png)

![On voit ici les pistes groupées](./pistes_groupes.png)

![Cliquer plusieurs fois sur le «dossier» de la piste au dessus de la piste d'ambiance/musique pour la dégrouper](./degrouper_piste.png)

### Effectuer le routage du gorupe de sons interactifs vers l'entrée auxiliaire du compresseur de l'ambiance/musique

![Sur le groupe de sons interactifs, on ajoute un send sur les entrées 3/4 (les entrées auxiliaires) de l'Ambiance/musique](./configurer_routing_sidechain.svg)

![On ajoute un ReaComp à la piste d'Ambiance/musique et on le configure pour écouter les entrées 3/4 (les entrés auxiliaires)](./configurer_routing_sidechain2.svg)

![Poursuivre la configuration de ReaComp et baisser le threshold pour quand du son interactif joue, cela réduit le volume de l'ambiance/musique](./configurer_routing_sidechain3.svg)
