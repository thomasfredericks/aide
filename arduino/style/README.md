# Arduino : Guide de style

Ce document décrit les conventions de codage suggérées pour Arduino.  
L’objectif est d’assurer un code **cohérent, lisible et maintenable**.


## Principes généraux

- La **lisibilité** prime sur tout
- La **cohérence interne** est plus importante que les préférences personnelles
- Le style doit faciliter la revue de code et la maintenance à long terme
- Le code doit être clair pour un développeur Arduino expérimenté n’ayant jamais vu le projet


## Classes, structures et types

- **UpperCamelCase** (PascalCase)
- Pas de préfixes inutiles

```cpp
class FileManager;
struct TokenInfo;
enum class ColorMode;
```

## Fonctions et méthodes

 - **lowerCamelCase**
- Les verbes décrivent une action
- Pas de majuscule initiale

```cpp
void readFile();
int computeHash(const std::string& input);
bool isValid() const;
```

## Variables locales et paramètres

- **lowerCamelCase**
- Noms courts mais explicites

```cpp
int fileSize;
std::string fileName;
```

## Membres de classe

- **snake_case_** 
- Suffixe _ obligatoire

```cpp
class Reader {
  int buffer_size_;
};
```

## Constantes

- **kConstantName**
- Doivent être clairement identifiables

```cpp
constexpr int kMaxBufferSize = 4096;
constexpr double kPiValue = 3.14159;
```

## Macros

- À éviter autant que possible
- Si nécessaires : **ALL_CAPS_WITH_UNDERSCORES**

```cpp
#define LLVM_DEBUG_MODE 1
```