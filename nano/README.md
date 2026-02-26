# Arduino Nano

L'Arduino Nano est disponible en trois modèles :
- `Arduino Nano ATmega168`.
- `Arduino Nano ATmega328` est très similaire au modèle précédent, mais porte l'inscription `328` sur la puce principale.
- `Arduino Nano R4` dont la puce principale a beaucoup plus de broches que les deux autres modèles.

Il est important d'identifier le modèle avant de poursuivre avec [l'initialisation](./initialisation/).

Tous les Arduino Nano fonctionnent sous 5 volts, ce qui signifie :
- Toutes les broches numériques utilisent des niveaux logiques 5 volts (HAUT = 5 V, BAS = 0 V)
- Les entrées analogiques peuvent accepter en toute sécurité une tension de 0 à 5 volts
- Les broches de communication (I²C, SPI, UART) fonctionnent avec des niveaux logiques 5 volts

## Arduino Nano ATmega168 et ATmega328

![Arduino Nano ATmega168](./arduino_nano_168.png)

![Arduino Nano ATmega328](./arduino_nano_328.png)

En bref, la seule différence entre ces deux modèles est la quantité de mémoire disponible.

| Caractéristique        | Arduino Nano 168 | Arduino Nano 328 |
|------------------------|----------------|----------------|
| Microcontrôleur        | ATmega168      | ATmega328P     |
| Flash (pour code)      | 16 kB          | 32 kB          |
| SRAM (variables)       | 1 kB           | 2 kB           |
| EEPROM (persistante)   | 512 bytes      | 1 kB           |
| Vitesse d'horloge      | 16 MHz         | 16 MHz         |
| Broches numériques     | 14             | 14             |
| Broches analogiques    | 8              | 8              |
| Sketch maximum         | ~16 kB         | ~32 kB         |


## Arduino Nano R4

![Arduino Nano R4](./arduino_nano_r4.png)

![Broches du Arduino Nano R4](./arduino_nano_r4_pins.png)

Informations complémentaires sur ce modèle : [Nano R4 User Manual | Arduino Documentation](https://docs.arduino.cc/tutorials/nano-r4/user-manual/)
