# Colliders dans Unity

## Tableau des interactions entre les colliders
### Génération de messages de détection de collision

Ce tableau indique si une détection de collision se produit et si des messages sont envoyés lors d'une collision entre différents types de colliders. Un "O" indique une combinaison qui peut générer des messages de détection de collision.

|                        | Collider statique | Collider dynamique | Collider *kinematic* | Collider *trigger* statique | Collider *trigger* dynamique | Collider *trigger* *kinematic* |
|------------------------|------------------|--------------------|----------------------|---------------------------|-----------------------------|------------------------------|
| **Collider statique**  |                  | O                  |                      |                           |                             |                              |
| **Collider dynamique** | O                | O                  | O                    |                           |                             |                              |
| **Collider *kinematic*** |                | O                  |                      |                           |                             |                              |
| **Collider *trigger* statique** |         |                    |                      |                           |                             |                              |
| **Collider *trigger* dynamique** |       |                    |                      |                           |                             |                              |
| **Collider *trigger* *kinematic*** |     |                    |                      |                           |                             |                              |

*Remarque :* Les colliders dynamiques sont des objets avec un Rigidbody non *kinematic*, les colliders *kinematic* ont un Rigidbody avec la propriété `isKinematic` activée, et les colliders statiques n'ont pas de Rigidbody.

### Génération de messages de trigger

Ce tableau indique si des messages de *trigger* sont envoyés lors d'une collision entre différents types de colliders. Un "O" indique une combinaison qui peut générer des messages de trigger.

|                        | Collider statique | Collider dynamique | Collider *kinematic* | Collider *trigger* statique | Collider *trigger* dynamique | Collider *trigger* *kinematic* |
|------------------------|------------------|--------------------|----------------------|---------------------------|-----------------------------|------------------------------|
| **Collider statique**  |                  |                    |                      |                           | O                           | O                            |
| **Collider dynamique** |                  |                    |                      | O                         | O                           | O                            |
| **Collider *kinematic*** |                |                    |                      | O                         | O                           | O                            |
| **Collider *trigger* statique** |         | O                  | O                    |                           | O                           | O                            |
| **Collider *trigger* dynamique** | O      | O                  | O                    | O                         | O                           | O                            |
| **Collider *trigger* *kinematic*** | O    | O                  | O                    | O                         | O                           | O                            |

*Remarque :* Les colliders dynamiques sont des objets avec un Rigidbody non *kinematic*, les colliders *kinematic* ont un Rigidbody avec la propriété `isKinematic` activée, et les colliders statiques n'ont pas de Rigidbody.

