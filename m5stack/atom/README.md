# Atom (Lite)

 Page officielle de l'Atom (Lite) : [Atom-Lite](https://docs.m5stack.com/en/core/ATOM%20Lite)

![](./atom_lite_schematic.webp)

> [!WARNING]
> La puce CH552T, utilisée dans le circuit de l’Atom Lite pour la communication USB série, émule une puce FTDI VCP, mais de manière imparfaite. 
> Le firmware actuel de la CH552T provoque des pertes de paquets série lorsque l’Arduino reçoit des données en même temps qu’il en transmet. 
> De plus, les connexions électriques de la puce CH552T provoquent également des interférences au niveau du Wi-Fi, ce qui en réduit la portée.
> Plus d'informations :
> [Atom Serial TX is full of errors when it simultaneously receives Serial data · Issue #86 · m5stack/M5Atom](https://github.com/m5stack/M5Atom/issues/86)
> [Bugs and measures for M5Stack ATOM | macsbug](https://macsbug.wordpress.com/2021/10/10/bugs-and-measures-for-m5stack-atom/)
> [ESP32と5V IOのUSB UARTデバイスによるWifi問題まとめ | docs](https://sohtamei.github.io/docs/esp32AndUsbUartWith5V_IO_Issue.html)