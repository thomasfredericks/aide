# Colliders dans Unity

## Tableau des interactions entre les colliders

### Génération de messages de détection de collision

Ce tableau indique si une détection de collision se produit et si des messages sont envoyés lors d'une collision entre différents types de colliders. 

|                        | Collider sans Rigidbody | Collider avec Rigidbody (dynamique) | Collider avec Rigidbody kinématique | Collider trigger sans Rigidbody | Collider trigger avec Rigidbody (dynamique) | Collider trigger avec Rigidbody kinématique |
|------------------------|------------------|--------------------|----------------------|---------------------------|-----------------------------|------------------------------|
| **Collider sans Rigidbody**  |                  | Collision                  |                      |                           |                             |                              |
| **Collider avec Rigidbody (dynamique)** | Collision                | Collision                  | Collision                    |                           |                             |                              |
| **Collider avec Rigidbody kinématique** |                | Collision                  |                      |                           |                             |                              |
| **Collider trigger sans Rigidbody** |         |                    |                      |                           |                             |                              |
| **Collider trigger avec Rigidbody (dynamique)** |       |                    |                      |                           |                             |                              |
| **Collider trigger avec Rigidbody kinématique** |     |                    |                      |                           |                             |                              |


### Génération de messages de trigger

Ce tableau indique si des messages de *trigger* sont envoyés lors d'une collision entre différents types de colliders. 

|                        | Collider sans Rigidbody | Collider avec Rigidbody (dynamique) | Collider avec Rigidbody kinématique | Collider trigger sans Rigidbody | Collider trigger avec Rigidbody (dynamique) | Collider trigger avec Rigidbody kinématique |
|------------------------|------------------|--------------------|----------------------|---------------------------|-----------------------------|------------------------------|
|  **Collider sans Rigidbody** |                  |                    |                      |                           | Trigger                           | Trigger                            |
| **Collider avec Rigidbody (dynamique)** |                  |                    |                      | Trigger                         | Trigger                           | Trigger                            |
| **Collider avec Rigidbody kinématique** |                |                    |                      | Trigger                         | Trigger                           | Trigger                            |
| **Collider trigger sans Rigidbody** |         | Trigger                  | Trigger                    |                           | Trigger                           | Trigger                            |
| **Collider trigger avec Rigidbody (dynamique)** | Trigger      | Trigger                  | Trigger                    | Trigger                         | Trigger                           | Trigger                            |
| **Collider trigger avec Rigidbody kinématique** | Trigger    | Trigger                  | Trigger                    | Trigger                         | Trigger                           | Trigger                            |

