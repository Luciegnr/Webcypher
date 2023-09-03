# Webcypher

**1. Les technologies :**
* ReactJs pour le front.
* NodeJs et MongoDB pour l'API et la base de données.

**2. Les utilitaires :**
* Postman pour les test API.
* MongoDB Compass pour l'accès à la base de données.

**3. Lancement du projet :**
```bash!
cd webcypher/api
nodemon

cd /webcypher/front
npm start
```

**4. Configuration de base à vérifier:**
<br />
Dans `/api/app.js` configuration de la DB, en mode localhost avec le nom de DB que l'on souhaite ici elle se nomme `pli`
<img src="https://i.imgur.com/fZFrOb0.png" width="500"/>


Dans `/api/`vérifier la présence du dossier `data/` et de ses composants.

<img src="https://i.imgur.com/s7Jtwo3.png" width="500"/>

---



## Présentation des fonctionnalités et pages.
**1. Gestion d'url :** 
<br />
Nous avons mis en place une gestion d'erreur et de redirection en cas d'url inexistant. Ainsi dans le cas ou l'utilisateur renseignerait un url non erronné nous le redirigeons vers une page d'erreur 404:

<img src="https://i.imgur.com/F3XPFHN.png" width="500"/>

Et la plateforme ne fonctionnant uniquement pour les utilisateurs authentifiés nous avons également géré la vérification des tokens d'authentification. C'est pourquoi lorsque un token vient a expirer nous redirigeons l'utilisateur sur la page de connexion de manière automatique.

<img src="https://i.imgur.com/4wU27Gn.png" width="500"/>


**2. Inscription, connexion, déconnexion et gestion du token:**
<br />
Lors de l'inscription nous demandons un certain nombre de champs, ils doivent tous être saisie. À noter que les champs `username` et `password` seront nécessaire afin de se connecter par la suite. Et que le champ `email` nécessite un réel email puisque avant de pouvoir rejoindre réellement la plateforme l'utilisateur va devoir valider son compte via un email que nous lui envoyons au moment de son inscription.

<img src="https://i.imgur.com/CoC3pOO.png" width="500"/>
<br />
<img src="https://i.imgur.com/gVKVK46.png" width="500"/>


Afin de valider le compte il faut donc cliquer sur le boutton du mail. Celui-ci redirige l'utilisateur vers la page de connexion. Après saisie de ses identifiants il peut donc accéder à la plateforme.

<img src="https://i.imgur.com/6aARstn.png" width="500"/>


Une fois l'authentification validée nous récupérons le token généré afin de le stocker dans le local storage. Ce token nous permet par la suite de réaliser les différentes requêtes de notre API. C'est notament grâce à cela que nous pouvons protéger certaines routes et ainsi les rendre accessible uniquement aux utilisateurs authentifiés.

Tant que le token est valide l'utilisateur n'a alors pas besoin de se reconnecter. Il peut cependant se déconnecter de lui même de la plateforme, ainsi dès lors qu'il le souhaite nous supprimons son local storage et le redirigeons vers la page de connexion.




**3. Gestion du compte :**
<br />
Une fois authentifié, l'utilisateur est redirigé sur sa page profil. De cette page il peut consulter et modifier l'ensemble des informations qu'il a renseignées lors de son inscription. Il peut également créer un avatar et par la suite continuer de le personnaliser autant de fois qu'il le souhaite. 

Pour avoir accès à la customisation de l'avatar il lui suffit de cliquer sur la photo avatar présente au dessus du formulaire. Un modal devrait alors apparaitre.


<img src="https://i.imgur.com/cdP295U.jpg" width="500"/>

<br />
<img src="https://i.imgur.com/CWT0ypt.png" width="500"/>

<br />
<img src="https://i.imgur.com/edA82Ca.png" width="500"/>


**4. Les rooms :**
<br />
Via la navbar placée à gauche de l'écran, l'utilisateur peut naviguer sur les différentes page qui compose la plateforme.
L'une des page principale étant la page permettant d'accéder, de rejoindre une room. 

Sur cette page nous retrouvons donc l'ensemble des room créee et active. Nous avons mis en place un premier système de recherche afin de filtrer les rooms a afficher. Sur cette même page nous retrouvons également le bouton permettant de creer de nouvelle room. Celui-ci nous redirige dons vers un nouveau formulaire afin d'ajouter une nouvelle room. (A savoir qu'un utilisateur ne peut avoir q'une seule room de créer à la fois).

La dernière fonctionnalité de cette page est donc de pouvoir rejoindre une room. Pour cela il suffit de cliquer sur la room choisie, cela redirige automatiquement l'utilisateur sur la page "détails" de la room.

<img src="https://i.imgur.com/oFMoxsC.png" width="500"/>
<br />
<img src="https://i.imgur.com/qLHwilp.png" width="500"/>
<br />
<img src="https://i.imgur.com/1mv4UsE.png" width="500"/>


La page détails : 
==> toujours en cours de dev explications a continuer.


**5. Les utilisateurs et conversations privées :**
<br />
Nous avons également mis en place un système de chat privé. Pour ce faire nous avons crée deux pages. La première est une page sur laquelle nous avons fait le choix de lister l'ensemble des utilisateurs existants (autre que celui avec lequel nosu sommes authentifié). Pour chaque utilisateur nous affichons donc son avatar si il en possède et son username pour le moment. Nous avons également affiché une icone message pour chacun des utilisateur. De ce fait quand notre utilisateur clique sur l'icone message associé à un profil nous le redirigeons vers la page conversation privée.

Dans le cas ou nous n'avions pas encore de conversation avec cet utilisateur, nous créeons la converstaion et le redirigeons vers la nouvelle page en revanche si notre user possède déja une conversation avec cette utilisateur, il s'agit d'une simple redirection.


<img src="https://i.imgur.com/P8YRvam.png" width="500"/>
<br />
<img src="https://i.imgur.com/CWBq054.png" width="500"/>

