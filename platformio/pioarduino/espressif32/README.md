# PlatformIO : pioarduino-espressif32 

Les microcontrôleurs _ESP32_ sont supportés dans _PlatformIO_ avec deux dépôts :
- **espressif32** : le dépôt officiel maintenu par _PlatformIO_ (🔗 [GitHub](https://github.com/platformio/platform-espressif32))
- **pioarduino-espressif32**  : un dépôt non-officiel géré par la communauté (🔗 [GitHub](https://github.com/pioarduino/platform-espressif32/))

**pioarduino-espressif32** a été créé pour maintenir le support des microcontrôleurs **Espressif** lorsque le support officiel devient insuffisant. Il permet d'utiliser les versions récentes des _framework_  ESP-IDF et Arduino.

En date du 2025-12-08, voici le support fourni par les deux versions stables des dépôts :  

| _framework_ | [espressif32](https://github.com/platformio/platform-espressif32/releases/tag/v6.12.0) (officiel) | [pioarduino-espressif32](https://github.com/pioarduino/platform-espressif32/releases/tag/55.03.34) (communauté) |
| --- | --- | --- |
|  **Arduino**   |   v2.0.17 (basé sur IDF v4.4.7)   |   v3.3.4   |
|  **ESP-IDF**   |  v5.5.0   |  ESP-IDF v5.5.1.251106   |

Le dépôt **espressif32** est donc en retard d'un version complète du _framework_ Arduino comparativement au dépôt **pioarduino-espressif32**.

> [!WARNING]
> Si le dépôt non-officiel **pioarduino-espressif32** est utilisé dans un projet avec `platform = pioarduino-espressif32`, le dépôt sera téléchargé localement (dans le dossier `.platformio` de l'utilisateur).  
> Ensuite, **tout projet** qui voudrait utiliser la version officielle avec `platform = espressif32`  (**sans préciser de version**) basculera automatiquement sur **pioarduino-espressif32** au lieu de la plateforme officielle **espressif32** qui est désirée!  
> Cela arrive parce que **pioarduino-espressif32** possède un **numéro de version plus élevé**, et PlatformIO choisit la version la plus récente téléchargée ou disponible.

## `pioarduino-espressif32` dans PlatformIO




Pour utiliser la plateforme `pioarduino-espressif32`, il faut changer l'entrée `platform` du fichier `platformio.ini`.

Utiliser la dernière version stable :
```ini
platform = https://github.com/pioarduino/platform-espressif32/releases/download/stable/platform-espressif32.zip
```

Utiliser une version spécifique (ce qui recommandé pour des projets à long terme lorsqu'une version a été choisie, la version 54.03.20 dans cet exemple) :
```ini
platform = https://github.com/pioarduino/platform-espressif32.git#54.03.20
```



