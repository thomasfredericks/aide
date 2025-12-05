# Plateforme `pioarduino-espressif32` pour ESP32

- **pioarduino-espressif32** a été créé pour maintenir le support des microcontrôleurs **Espressif** lorsque le support officiel devient insuffisant.
- Avec la sortie du **Arduino Core 3.0.0** pour ESP32 (incluant des puces comme ESP32-C6 ou ESP32-H2), PlatformIO n’assurait plus clairement la compatibilité avec les versions **Arduino 3.x**.
- Le projet fournit donc le **support manquant**, via `pioarduino/platform-espressif32`, permettant d'utiliser les versions récentes d’Arduino-core et d’ESP-IDF, même pour des puces non supportées par le PlatformIO officiel.


## `pioarduino-espressif32` dans PlatformIO


> [!WARNING]
> Si vous utilisez **pioarduino-espressif32** dans un projet, le dépôt sera téléchargé localement (dans le dossier `.platformio` de l'utilisateur).  
> Ensuite, **tout projet** qui utilise simplement `platform = espressif32` (donc sans préciser de version) basculera automatiquement sur **pioarduino-espressif32** au lieu de la plateforme officielle de PlatformIO.  
> Cela arrive parce que **pioarduino-espressif32 possède un numéro de version plus élevé**, et PlatformIO choisit toujours la version la plus récente disponible.

Pour utiliser la plateforme `pioarduino-espressif32`, il faut changer l'entrée `platform` du fichier `platformio.ini`.

Utiliser la dernière version stable :
```ini
platform = https://github.com/pioarduino/platform-espressif32/releases/download/stable/platform-espressif32.zip
```

Utiliser une version spécifique (recommandé pour des projets à long terme lorsqu'une version a été choisie) :
```sh
platform = https://github.com/pioarduino/platform-espressif32.git#54.03.20
```



