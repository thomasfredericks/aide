# Atom (Lite)

![](./atom_lite_schematic.webp)

> [!WARNING]
> Il y a des problèmes avec la puce CH552T, qui est utilisée dans le circuit pour **émuler** une puce FTDI VCP.
> Le code actuel de la puce CH552T perd des paquets série lorsque des données sont envoyées vers l’Arduino en même temps que celui-ci en envoie.
> De plus, les connexions électriques de la puce CH552T provoquent également des interférences au niveau du Wi-Fi, ce qui en réduit la portée.
> Plus d'informations :
> [Atom Serial TX is full of errors when it simultaneously receives Serial data · Issue #86 · m5stack/M5Atom](https://github.com/m5stack/M5Atom/issues/86)
> [Bugs and measures for M5Stack ATOM | macsbug](https://macsbug.wordpress.com/2021/10/10/bugs-and-measures-for-m5stack-atom/)
> [ESP32と5V IOのUSB UARTデバイスによるWifi問題まとめ | docs](https://sohtamei.github.io/docs/esp32AndUsbUartWith5V_IO_Issue.html)