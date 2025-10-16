# TouchDesigner : Globales

Pour créer des variables globales :
- Créer un _BASE COMP OP_
- Le nommer `base_globals`
- Avec un _clic droit_ ouvrir _Customize Component_
- Ajouter des paramètres qui deviendront des globales
    - Assigner des valeurs par défaut
- Changez les valeurs dans l'inspecteur des paramètres
- Accéder aux paramètres avec les lignes suivantes :
    - `op('base_globals').par.Resx`
    - `op('base_globals').par.Resy`
    - ...

![](./ajouter_variables_globales.png)