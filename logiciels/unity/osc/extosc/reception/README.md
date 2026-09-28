# Réception d'OSC dans Unity avec extOSC 


## Préalable(s)

* Avoir suivi les instructions sur [l'initialisation d'extOSC](../initialisation/)

## Configuration globale lobale (à faire UNE SEULE FOIS)

Créer un script nommé `MyOsc`.

### Importer le namespace extOSC
Au début du script immédiatement après les autres `using` :
```csharp
using extOSC;
```

### Déclarer la variable du récepteur OSC
Dans la classe (avant les méthodes), déclarez une référence au `OSCReceiver` :
```csharp
public extOSC.OSCReceiver oscReceiver;
```

### Fonction utilitaire ChangerPlageDeValeurs()
Ajouter cette méthode dans la classe :
```csharp
public static float ChangerPlageDeValeurs(float value, float inputMin, float inputMax, float outputMin, float outputMax)
{
    return Mathf.Clamp(((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin), outputMin, outputMax);
}
```

### Dans l'éditeur Unity (à faire une fois par GameObject)
1. Glisser le script `MyOsc` sur le GameObject `OSC`
2. Dans l'Inspecteur, glissez-déposez le GameObject `OSC` sur la variable publique `oscReceiver` du script




## Configuration Par Adresse OSC (à répéter pour CHAQUE adresse)

> [!IMPORTANT] 
> Pour chaque adresse OSC différente (`/angle`, `/position`, `/lumiere`, etc.), vous devez créer **une fonction dédiée** et **un Bind() séparé**.

## Lier l'adresse OSC à une fonction dans Start()
Dans la méthode `Start()`, associez chaque adresse OSC à sa fonction via `Bind()`. Par exemple, ici nous indiquons que lors que le message `"/angle"` est reçu, nous déclenchons la méthode `TraiterOscAngle` (que nous définissons par après) :
```csharp
oscReceiver.Bind("/angle", TraiterOscAngle);
```

> [!WARNING]
> Créez un `oscReceiver.Bind()` et une fonction de traitement différente pour **CHAQUE** adresse OSC à traiter.

### Créer une fonction de traitement dédiée
Chaque adresse nécessite sa propre fonction avec un nom explicite. Ici nous créons la fonction `TraiterOscAngle` :
```csharp
void TraiterOscAngle(OSCMessage message)
{
    // Validez qu'il y a bien le nombre attendu d'arguments (1 dans l'exemple) :
    if (message.Values.Count != 1)
    {
        Debug.Log("Pas le bon nombre d'arguments");
        return; // Quitte la fonction sans exécuter la suite
    }

    // Vérifiez que l'argument est du type attendu (`int` dans l'exemple) :
    if (message.Values[0].Type != OSCValueType.Int)
    {
        Debug.Log("N'est pas un entier");
        return; // Quitte la fonction sans exécuter la suite
    }

    // Récupérer la valeur de l'argument :
    int valeur = message.Values[0].IntValue;

    // CHANGER LA PLAGE DE LA VALEUR
    //  ET FAIRE DE QUOI AVEC LA VARIABLE VALEUR ICI !

}
```

### Changer la plage des valeurs reçues
Appliquez vos transformations et actions sur l'objet :
```csharp
// Exemple : adapter proportionnellement la valeur reçue
float angle = ChangerPlageDeValeurs(value, 0, 4095, -180, 180);

// Exemple : appliquer une rotation à un objet ciblé
tagetGameObjet.transform.rotation = Quaternion.Euler(0, angle, 0);
```



## Structure Complète du Script

Voici un exemple complet illustrant la configuration pour trois adresses OSC différentes :

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using extOSC;

public class OscCube : MonoBehaviour
{
    // --- CONFIGURATION UNIQUE ---
    public extOSC.OSCReceiver oscReceiver;
    
    // Fonction utilitaire optionnelle
    public static float ChangerPlageDeValeurs(float value, float inputMin, float inputMax, float outputMin, float outputMax)
    {
        return Mathf.Clamp(((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin), outputMin, outputMax);
    }
    
    // --- FONCTIONS DE TRAITEMENT (une par adresse OSC) ---
    void TraiterOscAngle(OSCMessage message)
    {
        // Si le message ne contient pas d'argument ou s'il ne contient pas un argument de type 
        // entier, sortir (return) de la fonction.
        if (message.Values.Count == 0 || message.Values[0].Type != OSCValueType.Int)
            return;
        
        // Aller chercher le premier argument en tant qu'un nombre entier.
        int value = message.Values[0].IntValue;
        float angle = ChangerPlageDeValeurs(value, 0, 4095, -180, 180);
        transform.rotation = Quaternion.Euler(0, angle, 0);
    }
    
    void TraiterOscPosition(OSCMessage message)
    {
        // Code pour traiter /position
    }
    
    void TraiterOscLumiere(OSCMessage message)
    {
        // Code pour traiter /lumiere
    }
    
    // --- BINDING DES ADRESSES ---
    void Start()
    {
        oscReceiver.Bind("/angle", TraiterOscAngle);
        oscReceiver.Bind("/position", TraiterOscPosition);
        oscReceiver.Bind("/lumiere", TraiterOscLumiere);
    }
}
```

---

## 4. Tableau Récapitulatif

| Étape | Configuration Unique | Par Adresse OSC |
|-------|---------------------|-----------------|
| Importer `using extOSC;` | ✅ | ❌ |
| Déclarer `oscReceiver` | ✅ | ❌ |
| Ajouter la fonction `ChangerPlageDeValeurs()` | ✅ (si nécessaire) | ❌ |
| Relier le GameObject OSC dans l'Inspector | ✅ | ❌ |
| Créer une fonction de traitement (`TraiterOsc...()`) | ❌ | ✅ |
| Vérifier/nommer les arguments | ❌ | ✅ |
| Ajouter `oscReceiver.Bind()` dans `Start()` | ❌ | ✅ |

---

## 5. Points Clés à Retenir

1. **Une seule fois** : Imports, déclarations, liaison Inspector
2. **Par adresse OSC** : Fonction dédiée + vérification des arguments + Bind()
3. Chaque adresse OSC `/xxx` doit avoir **sa propre fonction** avec **son propre Bind()**
4. Utilisez `Debug.Log()` pour déboguer les problèmes de messages reçus
5. La fonction `ChangerPlageDeValeurs()` est optionnelle mais utile pour adapter les échelles de valeurs
