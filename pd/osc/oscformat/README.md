# Pd : `[oscformat]`



> [!NOTE]
> Dans Pure Data, lors de la réception de messages OSC les `/` des adresses sont remplacées par des espaces.
> Inversement, les espaces dans les adresses de messages OSC sont replacés par des `/` lorsqu'ils sont envoyés.


`[oscformat]` permet de créer un message OSC :
- Il détermine le format (type) des arguments. 
- Il détermine l'adresse.

## Déterminer les arguments du message OSC

L'option `-f` suivi d'un ou plusieurs des identifiants `f`, `i`, `b` ou `s` (sans espaces entre eux) indique le ou les types d'arguments du message.

- `[oscformat -f f]` : un argument de type `float`
- `[oscformat -f i]` : un argument de type `int`
- `[oscformat -f s]` : un argument de type `string`
- `[oscformat -f ii]` : deux arguments de type `int`


## Déterminer l'adresse du message OSC

Tous les mots qui suivent le format sont utilisés pour former l'adresse. 

- `[oscformat -f f alpha]` : un argument de type `float` avec l'adresse OSC `/alpha`
- `[oscformat -f i a b c]` : un argument de type `int` avec l'adresse OSC `/a/b/c`

## Assigner une valeur aux arguments du message OSC

Les messages numériques et symboliques sont utilisés pour fournir les valeurs correspondant aux types spécifiés par l’option `-f`. L’ordre des éléments du message entrant doit correspondre à l’ordre des types définis.

- `[1(` envoyé à `[oscformat -f f alpha]` produit un message OSC `/alpha 1.0` 
- `[42(` envoyé à `[oscformat -f i beta]` produit un message OSC `/beta 42`
- `[hello(` envoyé à `[oscformat -f s msg]` produit un message OSC `/msg "hello"`
- `[10 20(` envoyé à `[oscformat -f ii pos]` produit `/pos 10 20`

Si le message entrant contient plus d’éléments que le format n’en définit, les éléments supplémentaires seront convertis selon les règles par défaut de `[oscformat]` (`floats` et `symbols`).


### Utiliser les blobs

Le type `b` permet d’envoyer une liste brute d’octets (blob OSC). Un blob commence par un entier indiquant le nombre d’octets, suivi de cette quantité d’éléments.

Cet exemple envoie un blob de 4 octets : `10 20 30 40` avec l'adresse `/data` :
```
[4 10 20 30 40(
 |
[oscformat -f b data]
```

## Exemples

### Envoyer une note au Virtual MIDI Keyboard de Reaper (selon le default_pattern)

Si le modèle du message à envoyer est le suivant :
```
/vkb_midi/@/note/# i
```
* `@` : canal 0-15 (int)
* `#` : numéro de la note 0-127 (int)
* `i` : vélocité 0-127 (int)

Et l'on veut envoyer un message au canal 1, de la note 64 avec une vélocité de 120 :
 ```
[120(
 |
[oscformat -f i vkb_midi 1 note]
```

### Envoyer un message CC au Virtual MIDI Keyboard de Reaper (selon le default_pattern)

Si le modèle du message à envoyer est le suivant :
```
/vkb_midi/@/cc/# i
```
* `@` : canal 0-15 (int)
* `#` : numéro du CC 0-127 (int)
* `i` : valeur 0-127 (int)

Et l'on veut envoyer un message au canal 3, pour le CC 35 avec une valeur de 109 :
 ```
[109(
 |
[oscformat -f i vkb_midi 3 cc]
```