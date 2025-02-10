# M5Stack Unit 3.96 et bouton d'arcade

## Référence du bouton d'arcade

* Adafruit. (s. d.). Arcade Button with LED – 30mm Translucent Red. [https://www.adafruit.com/product/3489](https://www.adafruit.com/product/3489)

## Préparation

![Soudure du bouton](./unit_396_bouton_arcade_identification.png)

![Connexion du bouton au Unit 3.96](./unit_396_bouton_arcade_connexion.png)

## Utilisation

### Code à ajouter à setup()

Dans `setup()`, initialiser les broches, dans ce cas-ci, les broches du ATOM Lite :
```cpp
  pinMode(32, INPUT_PULLUP);
  pinMode(26, OUTPUT);
```


### Code à utiliser dans la boucle à intervalle régulier dans loop()

Pour obtenir la valeur du bouton :
```cpp
int monEtatBouton = digitalRead(32);
```

Pour allumer la DEL du bouton :
```cpp
digitalWrite(26, 1);
```

Pour éteindre la DEL du bouton :
```cpp
digitalWrite(26, 0);
```

Pour allumer la DEL du bouton quand on appuie dessus :
```cpp
 int monEtatBouton = digitalRead(32);
    if (monEtatBouton == 1) {
      digitalWrite(26, 0);
    } else {
      digitalWrite(26, 1);
    }
```