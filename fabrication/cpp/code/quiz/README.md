Bien sûr. Voici la version sans headers, avec chaque question en gras, tout en conservant le format Markdown brut entre quatre backticks.

# C++ : Quiz

**1. Quelle est la syntaxe générale utilisée pour créer une variable ?**

A. `nom type = valeur;`  
B. `type nom = valeur;`  
C. `type = nom valeur;`  
D. `valeur nom type;`  

**2. Que signifie la déclaration suivante ?**

```cpp
int compteur = 0;
```

A. `compteur` est une variable de type `float` contenant 0  
B. `compteur` est une fonction qui retourne 0  
C. `compteur` est une variable de type `int` dont la valeur initiale est 0  
D. `compteur` est une constante qui ne peut pas être modifiée  

**3. Quel type est le plus approprié pour stocker une valeur qui peut être uniquement `true` ou `false` ?**

A. `char`  
B. `float`  
C. `int`  
D. `bool`  

**4. Quelle déclaration permet de créer une variable pouvant contenir un nombre compris entre 0 et 255 ?**

A. `byte valeur = 200;`  
B. `bool valeur = 200;`  
C. `char valeur = 200.5;`  
D. `float valeur = false;`  

**5. Quelle instruction permet de modifier la valeur d'une variable existante appelée `compteur` pour lui donner la valeur 10 ?**

A. `int compteur = 10;`  
B. `compteur == 10;`  
C. `compteur = 10;`  
D. `compteur := 10;`

**6. À quoi servent principalement les parenthèses `()` après le nom d'une fonction ?**

A. À définir les paramètres de la fonction  
B. À délimiter le bloc d'instructions  
C. À indiquer le type de retour  
D. À terminer la fonction  

**7. Quel symbole délimite le bloc d'instructions d'une fonction en C ?**

A. `[ ]`  
B. `( )`  
C. `{ }`  
D. `< >`  

**8. Laquelle de ces déclarations de fonction est correcte ?**

A. `int bonjour() { }`  
B. `int bonjour[] { }`  
C. `int bonjour() [ ]`  
D. `int bonjour{} ( )`  

**9. Dans ce code, quel rôle jouent les parenthèses ?**

```cpp
if (x > 5) {
    printf("OK");
}
```

A. Elles contiennent la condition du `if`  
B. Elles contiennent le bloc du `if`  
C. Elles indiquent le type de `x`  
D. Elles terminent l'instruction `printf`  

**10. Que fait ce code si `x` vaut 10 ?**

```cpp
if (x > 5) {
    printf("Oui");
}
```

A. Il affiche `Oui`  
B. Il affiche `Non`  
C. Il n'affiche rien  
D. Il provoque une erreur  

**11. Que se passe-t-il si `x` vaut 3 ?**

```cpp
if (x > 5) {
    printf("Oui");
}
```

A. `Oui` est affiché  
B. Rien n'est affiché  
C. `Non` est affiché  
D. Le programme s'arrête  

**12. Quel est le rôle du `else` dans une structure `if...else` ?**

A. Exécuter un bloc lorsque la condition du `if` est fausse  
B. Exécuter toujours les deux blocs  
C. Déclarer une nouvelle fonction  
D. Répéter le bloc du `if`  

**13. Quelle écriture est correcte pour un `if` en C++ ?**

A. `if x > 5 { }`  
B. `if (x > 5) { }`  
C. `if { x > 5 }`  
D. `if [x > 5] { }`  

**14. Que se passe-t-il si `age` vaut 16 ?**

```cpp
if (age >= 18) {
    printf("Adulte");
} else {
    printf("Mineur");
}
```

A. `Adulte` est affiché  
B. `Mineur` est affiché  
C. Les deux sont affichés  
D. Rien n'est affiché  

**15. Pourquoi utilise-t-on `{ }` dans une fonction ?**

A. Pour commencer et terminer son bloc d'instructions  
B. Pour commencer la liste des paramètres  
C. Pour indiquer le type de retour  
D. Pour appeler automatiquement la fonction  

**16. Que signifie l'accolade `}` à la fin d'une fonction ?**

A. Le début de la fonction  
B. La fin du bloc de la fonction  
C. L'appel de la fonction  
D. La déclaration d'un paramètre  

**17. Que va afficher ce code si `x` vaut 8 ?**

```cpp
if (x >= 10) {
    printf("A");
} else {
    printf("B");
}
```

A. `A`  
B. `B`  
C. `A` puis `B`  
D. Rien  

**18. Laquelle de ces écritures appelle correctement une fonction nommée `calculer` qui ne reçoit aucun argument ?**

A. `calculer;`  
B. `calculer();`  
C. `calculer{};`  
D. `calculer[];`  

**19. Que va afficher ce code si `x` vaut 5 ?**

```cpp
if (x > 5) {
    printf("Grand");
} else {
    printf("Petit ou égal");
}
```

A. `Grand`  
B. `Petit ou égal`  
C. Les deux  
D. Rien  

**20. Laquelle de ces fonctions est correctement structurée ?**

A.

```cpp
void test(int x) {
    if (x > 0) {
        printf("Positif");
    } else {
        printf("Non positif");
    }
}
```

B.

```cpp
void test(int x) (
    if x > 0 {
        printf("Positif");
    }
)
```

C.

```cpp
void test(int x) {
    if x > 0 [
        printf("Positif");
    ]
}
```

D.

```cpp
void test(int x) {
    if (x > 0) (
        printf("Positif");
    )
}
```