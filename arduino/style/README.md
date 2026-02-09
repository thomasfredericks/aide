# Arduino : Guide de style

Ce document décrit les conventions de codage suggérées pour Arduino.  
L’objectif est d’assurer un code **cohérent, lisible et maintenable**.


## Principes généraux

- La **lisibilité** prime sur tout
- La **cohérence interne** est plus importante que les préférences personnelles
- Le style doit faciliter la revue de code et la maintenance à long terme
- Le code doit être clair pour un développeur Arduino expérimenté n’ayant jamais vu le projet

## Fonctions

 - **lowerCamelCase** (pas de majuscule initiale)
- Pour des fonctions qui effectuent des actions, utiliser des verbes

Exemples :
```cpp
void readFile();
int computeHash(const std::string& input);
bool isValid() const;
```

## Variables globales ou arguments de fonctions


- **lowerCamelCase**
- Noms courts mais explicites

Exemples :
```cpp
int fileSize;
std::string fileName;
```

## Classes, structures et types

- **UpperCamelCase** (PascalCase)

Exemples :
```cpp
class FileManager;
struct TokenInfo;
enum class ColorMode;
```

## Membres (variables) privées d'une classe

- **snake_case_** (suffixe _ obligatoire)

Exemple :
```cpp
class Reader {
  private:
    int buffer_size_;
};
```

## Constantes

- **ALL_CAPS_WITH_UNDERSCORES**

Exemples : 
```cpp
constexpr int MAX_BUFFER_SIZE = 4096;
constexpr double PI_VALUE = 3.14159;
```

## Macros

- À éviter autant que possible
- Si nécessaires : **ALL_CAPS_WITH_UNDERSCORES**

```cpp
#define LLVM_DEBUG_MODE 1
```