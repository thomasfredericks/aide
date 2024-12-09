# Raspberry Pi 

## Scénario distant

![Utilisation d'un Raspberry Pi pour le relais de messages OSC locaux à distance](./scenario_distant.svg)

## Installation de Raspberry Pi OS

Le système d'exploitation choisi pour le Raspberry Pi est le [Raspberry Pi OS](https://fr.wikipedia.org/wiki/Raspberry_Pi_OS).

### 32 bits vs 64 bits

 **La distribution 32 bits est a favorisée** ; au temps d'écrire (janvier 2023), l'accélération matérielle du décodage caméra n'était pas encore active sur la mouture 64 bit.


### Installer Raspberry Pi OS sur une carte micro SD

#### Utiliser Raspberry Pi Imager

Le logiciel [Raspberry Pi Imager](https://www.raspberrypi.com/software/) permet d'installer facilement Raspberry Pi OS :
* [Vidéo survolant Raspberry Pi Imager ](https://www.youtube.com/watch?v=ntaXWS8Lk34).
* [Documentation officielle pour bien démarrer](https://www.raspberrypi.com/documentation/computers/getting-started.html).


### Raspi-config 

Une fois que le système sur le Raspberry Pi s'est initialisé, lancer un terminal et exécuter la commande suivante

Via [raspi-config](https://www.raspberrypi.com/documentation/computers/configuration.html#the-raspi-config-tool)

```
sudo raspi-config
```

#### Hostname

Il est préférable de configurer le *hostname*. Par exemple :  `tim-rpi-x` où `x` devient est le chiffre d'une séquence. Cela permet d'avoir plusieurs Raspberry Pi facilement reconnaissables.

#### Interface option

* IP : [Raspberry Pi Documentation - Remote access](https://www.raspberrypi.com/documentation/computers/remote-access.html#introduction-to-remote-access).
* SSH : [Raspberry Pi Documentation - Setting up and SSH Server](https://www.raspberrypi.com/documentation/computers/remote-access.html#setting-up-an-ssh-server).
* VNC : [Raspberry Pi Documentation - Virtual Network Computing (VNC)](https://www.raspberrypi.com/documentation/computers/remote-access.html#virtual-network-computing-vnc).

### Partage de fichier réseau

* Samba : [Raspberry Pi Documentation - Samba (SMB/CIFS)](https://www.raspberrypi.com/documentation/computers/remote-access.html#samba-smbcifs).


```
sudo apt-get update 
sudo apt-get install samba samba-common-bin
sudo smbpasswd -a tim
sudo service smbd restart
```
```
micro /etc/samba/smb.conf 
```

Modifier le document vers la ligne ~176 :

```diff
- read only = yes
+ read only = no
```

### Affichage réseau SSH

#### Avahi ssh

```
sudo su
curl https://raw.githubusercontent.com/lathiat/avahi/master/avahi-daemon/ssh.service > /etc/avahi/services/ssh.service
exit
sudo systemctl restart avahi-daemon.service 
```

### Clef SSH

Si besoin 

```
ssh-keygen -t rsa -b 2048 -C $HOSTNAME
```

## Applications pour l'électronique

### Arduino Legacy IDE (1.8.X)

La version qui est disponible via le gestionnaire de paquet est désuète. 

* Télécharger et installer la plus récente version de la série Legacy IDE (1.8.X) sur le site suivant [https://www.arduino.cc/en/software](https://www.arduino.cc/en/software).
* Sélectionner **Linux ARM 32 bits** : [https://downloads.arduino.cc/arduino-1.8.19-linux32.tar.xz](https://downloads.arduino.cc/arduino-1.8.19-linux32.tar.xz).
* Décompresser le fichier `tar.xz`
* Exécuter le fichier `install.sh`
* Lancer l'application via l'icône générée dans la barre de menu


## Applications pour la programmation

### Pure Data

La version de [Pure Data](http://msp.ucsd.edu/software.html) qui est disponible via le gestionnaire de paquet de Raspberry Pi OS est désuète. Il faut compiler Pure Data depuis la source.

#### Compiler Pure Data depuis la source

* Lancer les commandes suivantes depuis un terminal 
```
sudo apt-get install autoconf libtool libasound2-dev build-essential autoconf automake libtool gettext git libasound2-dev libjack-jackd2-dev libfftw3-3 libfftw3-dev tcl tk 
mkdir ~/src
cd ~/src
git clone https://github.com/pure-data/pure-data
cd pure-data
./autogen.sh
./configure --enable-jack --enable-fftw
make -j4
sudo make install
```

### PlugData

[PlugData](https://plugdata.org/) n'est pas disponible via le gestionnaire de paquets par défaut. Il faut l'ajouter au gestionnaire de paquets.

#### Ajouter plugdata au gestionnaire de paquets
```
echo 'deb http://download.opensuse.org/repositories/home:/plugdata/Debian_11/ /' | sudo tee /etc/apt/sources.list.d/home:plugdata.list
curl -fsSL https://download.opensuse.org/repositories/home:plugdata/Debian_11/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/home_plugdata.gpg > /dev/null
sudo apt update
sudo apt install plugdata
```

## Applications pour l'audio

### Reaper

Reaper est un DAW.

* Télécharger la version la plus récente pour l'architecture `Linux armv7l` sur le site [REAPER | Download](https://www.reaper.fm/download.php)
* Décompresser 
* Executer install-reaper.sh depuis le terminal
* Lancer l'application via l'icône générée dans la barre de menu

### Cardinal

Cardinal est une version libre de VCV Rack.

* Télécharger la version `armhf` la plus récente depuis [Releases · DISTRHO/Cardinal](https://github.com/DISTRHO/Cardinal/releases)
* Décompresser le fichier `tar.gz`
* Exécuter `CardinalNative` pour lancer l'application
* Configurer les DAW vers le dossier de Cardinal pour indexer Cardinal comme effet (VST, VST3, LV2, CLAP)



