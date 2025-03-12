# UDP

## Initialisation de l'UDP

### Dans l'espace *global*

Configurer le port de réception :
```cpp
unsigned int myReceptionPort = 8888;
```

Pour l'UDP par Ethernet :
```cpp
EthernetUDP myUdp;
```

### Dans *setup()*

Activer la réception de données UDP sur le port:
```cpp
myUdp.begin(myReceptionPort);
```