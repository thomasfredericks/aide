# L'envoi d'OSC avec MicroOsc

## Préalable(s)

- [Installation de MicroOsc](/microosc/)
- [Initialisation de MicroOsc](/microosc/initialisation/)

## Envoyer une entier par MicroOsc vers l'ordinateur

Utiliser `void sendInt(const char *address, int32_t i)` pour envoyer un entier. 

Par exemple, pour envoyer la valeur de `maVariable` à l'adresse "/adresse" :
```cpp
int maVariable = 10;
monOsc.sendInt( "/adresse" , maVariable);
```
