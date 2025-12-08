# VNC

## VNC pour Windows

### Serveur

* [TightVNC](https://www.tightvnc.com/download.php) (un client est également inclus dans le téléchargement, mais celui-ci offre moins de fonctionnalités que TigerVNC indiqué ci-bas)

### Client

* [TigerVNC](https://github.com/TigerVNC/tigervnc/releases) : en date du 2025-12-08 cliquer sur le lien vers les *binaires* qui sont hébergés sur SourceForge et choisir le téléchargement 64 bits dont le nom ressemble à **vncviewer64-#.#.#.exe**

## VNC pour macOS

### Serveur

Pour configurer un serveur VNC sur macOS, utiliser la fonctionnalité de partage d’écran intégrée, activable depuis les Réglages Système :
- Ouvrir le menu Pomme > **Réglages Système** > **Partage**.
- Activer **Partage d’écran**.
- Cocher **Les visionneuses VNC peuvent contrôler l’écran avec un mot de passe**.
- Définir un mot de passe VNC unique permettant à d’autres de se connecter au Mac.


### Client

macOS intègre un client VNC accessible depuis le Finder; il suffit d’ouvrir « Se connecter au serveur… » et d’entrer l’adresse du serveur VNC précédé de `vnc://` ainsi  : `vnc://adresse.du.serveur`

