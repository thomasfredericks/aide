# MicroOsc

MicroOsc est une bibliothèque Open Sound Control (OSC) simple et légère pour Arduino, compatible avec les plateformes Arduino, Teensy, esp8266 et ESP32.

MicroOsc peut envoyer et recevoir des messages OSC via Serial (SLIP) ou via UDP (Ethernet ou WiFi).

Code source et documentation officielle : [MicroOsc](https://github.com/thomasfredericks/MicroOsc)

## Installation

### Arduino IDE

- Télécharger la bibliothèque MicroOsc dans le gestionnaire de bibliothèques d'Arduino.

## Fonctionnalités prises en charge
MicroOsc prend actuellement en charge :
* Correspondance complète d'adresse et de format
* Analyse des messages
* Écriture de messages
* Analyse des paquets (en tant que messages individuels)
* Types d'envoi
  * `b` : blob (tableau d'octets)
  * `f` : flottant
  * `d` : double
  * `i` : entier (int32)
  * `h` : int64
  * `s` : chaîne de caractères
  * `m` : midi
  * `I` : impulsion (message sans argument ; OSC v1.1)
  * `T` : VRAI (message sans argument)
  * `F` : FAUX (message sans argument)
  * `N` : NULL (message sans argument)

* Types de réception
  * `b` : blob (tableau d'octets)
  * `f` : flottant
  * `d` : double
  * `i` : entier (int32)
  * `s` : chaîne de caractères
  * `m` : midi

## Classes

MicroOsc contient 2 classes :
- `MicroOsc` : la classe principale
- `MicroOscMessage` : un message OSC reçu

### MicroOsc

#### Réception
| Méthode MicroOsc  | Description |
| --------------- | --------------- |
| `void onOscMessageReceived(callback)` | Vérifie les messages et exécute le callback pour chaque message reçu |

#### Envoi
| Méthode MicroOsc  | Description |
| --------------- | --------------- |
| `void sendInt(const char *address, int32_t i)` | Envoie un message OSC contenant un entier |
| `void sendFloat(const char *address, float f);` | Envoie un message OSC contenant un flottant |
| `void sendString(const char *address, const char *str)` | Envoie un message OSC contenant une chaîne |
| `void sendBlob(const char *address, unsigned char *b, int32_t length)` | Envoie un message OSC contenant un blob (tableau d'octets) |
| `void sendDouble(const char *address,double d)` | Envoie un message OSC contenant un double |
| `void sendMidi(const char *address,unsigned char *midi)` |  Envoie un message OSC contenant des données MIDI |
| `void sendInt64(const char *address, uint64_t h)` | Envoie un message OSC contenant un Int64 |
| `void sendImpluse(const char *address)` | Envoie un message sans arguments |
| `void sendMessage(const char *address, const char *format, ...)` | Envoie un message OSC avec un nombre quelconque d'arguments de types différents |

### MicroOscMessage

| Méthode MicroOscMessage | Description |
| --------------- | --------------- |
| `void onOscMessageReceived(callback)` | Vérifie les messages et exécute le callback pour chaque message reçu |
| `bool checkOscAddress(const char* address)` | Renvoie `true` si l'adresse correspond exactement |
| `bool checkOscAddressAndTypeTags(const char* address,const char * typetags)` | Renvoie `true` si l'adresse et les types d'arguments correspondent exactement |
| `int32_t nextAsInt()` | Renvoie le prochain argument sous forme d'entier 32 bits |
| `float nextAsFloat()` | Renvoie le prochain argument sous forme de flottant 32 bits |
| `const char* nextAsString()` | Traite le prochain argument comme une chaîne C et renvoie un pointeur vers les données |
| `uint32_t nextAsBlob(const uint8_t **blobData)` | Traite le prochain argument comme un blob de données et remplit un pointeur avec l'adresse d'un tableau d'octets |
| `int nextAsMidi(const uint8_t **midiData)` | Traite la prochaine valeur comme un message MIDI et remplit un pointeur avec l'adresse des données MIDI |

#### Méthodes avancées de MicroOscMessage
| Méthode avancée de MicroOscMessage | Description |
| --------------- | --------------- |
| `void copyAddress(char * destinationBuffer, size_t destinationBufferMaxLength)` | Copie l'adresse dans un `char*` destinationBuffer d'une longueur maximale de destinationBufferMaxLength |
| `void copyTypeTags(char * destinationBuffer, size_t destinationBufferMaxLength)` | Copie les types d'arguments dans un `char*` destinationBuffer d'une longueur maximale de destinationBufferMaxLength |




