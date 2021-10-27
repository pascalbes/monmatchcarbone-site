## monmatchcarbone-site

## C'est quoi ?

Un simulateur d'empreinte carbone personnelle à l'année, utilisant le modèle climat de [nosgestesclimat](https://github.com/pascalbes/monmatchcarbone
Pour contribuer au modèle et données sous-jacentes (calculs, textes, questions, suggestions de saisie), rendez-vous [ici](https://github.com/pascalbes/monmatchcarbone/blob/master/CONTRIBUTING.md).

Pour tout ce qui touche à l'interface (style d'un bouton, graphique de résultat, code javascript, etc.) c'est ici dans les [_issues_](https://github.com/pascalbes/monmatchcarbone-site/issues).

> 🌐 Most of the documentation (including issues and the wiki) is written in french, please raise an [issue](https://github.com/pascalbes/monmatchcarbone-site/issues/new) if you are interested and do not speak French.

## Et techniquement ?

C'est pour l'instant un _fork_ d'un simulateur de cotisations sociales, mon-entreprise.fr, lui-même forké pour futur.eco, qui permet de coder en français des règles de calculs, dans un langage (qui se veut) simple et extensible. De ces règles de calcul, des simulateurs (pour l'utilisateur lambda) et des pages de documentation qui expliquent le calcul (pour l'expert ou le curieux) sont générés automatiquement.

La bibliothèque de calcul publicodes, qui fournit le langage du modèle, vient d'être publiée comme un [paquet NPM](https://www.npmjs.com/package/publicodes), qui sera bientôt intégré ici pour simplifier énormément la base de code et se concentrer sur le domaine métier.

### Installation

You need to clone another repo, https://github.com/pascalbes/monmatchcarbone, in the same directory than this one. The model YAML files will then be loaded locally (no installation needed, they are loaded by webpack), and your changes to these files will refresh the UI instantly.

Then run this command in this repo :

`yarn && yarn start`
