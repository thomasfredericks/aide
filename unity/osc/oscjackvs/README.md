#  Unity : OSC UDP avec oscjackvs

Ce site documente deux paquets pour OSC UDP dans Unity  :
- **extOSC** si Visual Scripting n'est pas utilisé (plus commun) 
- **oscjackvs** si Visual Scripting est utilisé (moins commun)

Cette page présente **oscjackvs**.

## Préalables

* [Activer l'exécution en arrière-plan](/unity/execution_arriere-plan/)

## Intégration d'OSCJackVS

Nous utilisons [OSCJackVS](https://github.com/keijiro/OscJackVS) de Keijiro pour traiter les messages OSC UDP dans Unity.

Voici l'information à inscrire dans les paramètres du gestionnaire de paquets (voir figure ci-bas) :
* Name: `Keijiro`
* URL: `https://registry.npmjs.com`
* Scope: `jp.keijiro`


![Ajoutez le régistre de paquets de Keijiro](./Diapositive1.SVG)

![Installez OSCJackVS](./Diapositive2.SVG)

![Au besoin regénérez les Visual Scripting Nodes pour intégrer le code d'OSCJackVS](./Diapositive7.SVG)

![Créez une connexion](./Diapositive3.SVG)

![Renommez et configurez la connexion](./Diapositive4.SVG)

## Assignation du message /pot à la rotation d'un cylindre

![Créez un cylindre et un nouveau Script Graph](./Diapositive5.SVG)

![Ajoutez le code pour recevoir le message /pot et l'assigner à la rotation du cylindre](./Diapositive6.SVG)