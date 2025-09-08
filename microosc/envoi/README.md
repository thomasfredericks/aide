# L'envoi d'OSC avec MicroOsc

## Préalable(s)

- [Installation de MicroOsc](/microosc/)
- [Initialisation de MicroOsc](/microosc/initialisation/)

## Envoyer un entier par `MicroOsc` vers l'ordinateur

Utiliser `void sendInt(const char *address, int32_t i)` pour envoyer un entier. 

![](./microosc_sendint.drawio.png)

Par exemple, pour envoyer la valeur de `maVariable` à l'adresse "/adresse" :
```cpp
int maVariable = 10;
monOsc.sendInt( "/adresse" , maVariable);
```

Un autre exemple pour envoyer la valeur de `maLectureAnalogique` à l'adresse "/angle" :
```cpp
int maLectureAnalogique = analogRead(32);
monOsc.sendInt( "/angle" , maLectureAnalogique);
```