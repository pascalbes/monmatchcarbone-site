# Comment contribuer ?

Merci de prendre le temps de contribuer ! 🎉

> Attention : ce document vous explique comment contribuer au code de l'interface de Mon Match Carbone. Pour le modèle, les calculs de gaz à effet de serre, les textes des questions, les gestes climat, etc c'est par [ici](https://github.com/pascalbes/monmatchcarbone/blob/master/CONTRIBUTING.md).

> Si vous créez une PR (Pull Request, proposition de changements) de modification du modèle pascalbes/monmatchcarbone, ajoutez simplement `?branch=votre-nouvelle-branche` à l'adresse pour tester le site avec vos modifications des modèles.

Pour contribuer au code du site, RDV dans la section _issues_ pour voir les discussions et avancement actuels.

Ci-dessous des informations plus générales sur la contribution.

### Technologies

Nous utilisons :

-   [publicodes](https://publi.codes) pour notre modèle de calcul nouvelle génération
-   [TypeScript](https://www.typescriptlang.org) pour ajouter un système de typage à notre code JavaScript. Le typage n'est pas utilisé partout et il n'est pas obligatoire de le prendre en compte pour contribuer.
-   [Yarn](https://yarnpkg.com/fr) pour la gestion des dépendances (à la place de NPM qui est souvent utilisé dans les applications JavaScript)
-   [React](https://reactjs.org) pour la gestion de l'interface utilisateur
-   [Redux](https://redux.js.org) pour gérer le “state” de l'application côté client
-   [Prettier](https://prettier.io/) pour formater le code source, l'idéal est de configurer votre éditeur de texte pour que les fichiers soit formatés automatiquement quand vous sauvegardez un fichier. Si vous utilisez [VS Code](https://code.visualstudio.com/) cette configuration est automatique.
-   [Webpack](https://webpack.js.org) pour le “bundling”
-   [Eslint](http://eslint.org) qui permet par exemple d'éviter de garder des variables inutilisées
-   [Ramda](https://ramdajs.com) comme libraire d'utilitaires pour manipuler les listes/objects/etc (c'est une alternative à lodash ou underscore)
-   [Mocha](https://mochajs.org), [Jest](https://jestjs.io) et [Cypress](https://www.cypress.io) pour les l'execution des tests. Plus d'informations dans la section consacrée aux tests.

### Démarrage

Si l'historique des commits est trop volumineux, vous pouvez utiliser le paramètre `depth` de git pour ne télécharger que les derniers commits.

```
# Clone this repo on your computer
git clone --depth 100 git@github.com:pascalbes/monmatchcarbone-site.git && cd monmatchcarbone-site

# Install the Javascript dependencies through Yarn
yarn install

# Watch changes in publicodes and run the server for mon-entreprise
yarn start
```

Pour le développement local, il est important de cloner pascalbes/monmatchcarbone dans le même répertoire que celui-ci : ainsi les modèles sont chargées depuis votre disque, ce qui vous donne accès au rechargement à chaud de l'application si vous modifiez par exemple une question ou un facteur d'émission.

L'application est exécutée sur https://localhost:8080.

### Messages de commit

A mettre sans retenue dans les messages de commit :

https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages

-   🎨 `:art:` when working on the app's visual style
-   🐎 `:racehorse:` when improving performance
-   📝 `:memo:` when writing docs
-   🐛 `:bug:` when fixing a bug
-   🔥 `:fire:` when removing code or files
-   💚 `:green_heart:` when fixing the CI build
-   ✅ `:white_check_mark:` when adding tests
-   ⬆️ `:arrow_up:` when upgrading dependencies
-   :sparkles: `:sparkles:` when formatting, renaming, reorganizing files

Et ceux spécifiques au projet :

-   :gear: `:gear:` pour une contribution au moteur qui traite les YAML
-   :hammer: `:hammer:` pour une contribution à la base de règles
-   :calendar: `:calendar:` pour un changement de règle du à une évolution temporelle (en attendant mieux)
-   :chart_with_upwards_trend: `:chart_with_upwards_trend:` pour une amélioration du tracking
-   :alien: `:alien:` pour ajouter des traductions
-   :wheelchair: `:wheelchair:` pour corriger les problèmes liés à l'accessibilité
-   :fountain_pen: `:fountain_pen:` pour séparer les commits liés à la modification du contenu
-   :mag: `:mag:` pour les modifications liées au référencement naturel

### CI/CD

-   [Netlify](https://www.netlify.com/), s'occupe de l’hébergement du site sur Internet sur internet avec gestion des DNS et diffusion du code sur un réseau de CDN. Le site est donc théoriquement fourni depuis des serveurs fonctionnant à l'électricité bas carbone française.

### Publicodes

Un tutoriel sur publicode est disponible sur https://publi.codes.
