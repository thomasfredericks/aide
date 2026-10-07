
# Tutoriel relais MicroOsc : Envoi d’OSC SLIP d’un Arduino Nano avec un bouton d’arcade vers OSC UDP

Ce tutoriel montre comment utiliser [MicroOsc SLIP](/fabrication/arduino/microosc/slip/) pour envoyer les changements d’état d’un bouton vers Pd qui les relaye à d’autres logiciels (comme Unity) par OSC UDP.

Préalables :
- Suivre les instruction pour partir un [nouveau projet PlatformioIO](/fabrication/platformio/nouveau/).
- Suivre les instructions pour l’installation de [MicroOsc SLIP](/fabrication/arduino/microosc/slip/).


```mermaid
flowchart LR

    A[Arduino] -- OSC SLIP --> Pd
    
    Pd -- OSC UDP --> C[Autre logiciel (ex: Unity)]
```


Branchement sur Arduino Terminals :

| Bouton d’arcade | Arduino Terminals |
|---------|---------|
| Positif de la DEL (+)     | 3 (sortie analogique) |
| Négatif de la DEL (–)     | GND |
| Une broche de l’interrupteur | 2 (entrée numérique) |
| Autre broche de l’interrupteur | GND (via le négatif de la DEL) |

![Un bouton d’arcade branché à un Arduino Terminals](./arduino_terminals_arcade.png)

```cpp
#include <Arduino.h>

#include <Bounce2.h>
Bounce2::Button but0;

#include <MicroOscSlip.h>
MicroOscSlip<128> monOsc(&Serial); 

void setup()
{
    Serial.begin(115200);

    but0.attach(2, INPUT_PULLUP);
    but0.setPressedState(LOW);

    pinMode(3, OUTPUT);

}

void loop()
{
    but0.update();


    if (but0.pressed()) { // Bouton vient d’être appuyé
        /*
        // Ancienne méthode d’envoi ASCII 
        Serial.print("but0");
        Serial.print(" ");
        Serial.print(1);
        Serial.println();
        */
        monOsc.sendInt("/but0", 1);
    }

    if (but0.released()) { // Bouton vient d’être relâché
         /*
        // Ancienne méthode d’envoi ASCII 
        Serial.print("but0");
        Serial.print(" ");
        Serial.print(0);
        Serial.println();
        */
        monOsc.sendInt("/but0", 0);
    }

    if (but0.isPressed()) { // Bouton maintenu
        digitalWrite( 3 , HIGH );
    } else {
        digitalWrite( 3 , LOW );
    }

}
```

Télécharger et ouvrir le patcher Pd pour transmettre les messages OSC.

![Patcher relais_osc_slip_vers_udp.pd](./relais_osc_slip_vers_udp_pd.png)

Télécharger le patcher ici : [relais_osc_slip_vers_udp.pd](./relais_osc_slip_vers_udp.pd)