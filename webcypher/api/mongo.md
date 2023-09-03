# Mise en place de Mongo


### Installation de mongoDB en local

#### Étape 1
Vérifier si `brew`est installé via la commande `brew --version`.
Si `brew`n'est pas présent installé le via la commande :
```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Étape 2
Installer l'édition Community de MongoDB. 
Pour ce faire, tapez la commande suivante :
```bash
$ brew tap mongodb/brew
```
#### Étape 3
Cette commande demande à Homebrew de préparer l'installation d'un package venant de mongodb. Pour finaliser l'installation, taper la commande :
```bash
$ brew install mongodb-community@4.4
```

#### Étape 4
Pour vérifier que l'installation mongoDB s'est bien passé sur votre mac, taper cette commande :
```bash
$ mongo --version
```

#### Étape 5
Une fois la bonne version de mongo installée sur votre ordinateur, il faut maintenant lancer le serveur mongo en local via la commande:
```bash
$ mongod
```

#### Étape 6
Puis le lancer via la commande :
```bash
$ brew services start mongodb-community
```
ou 
```bash
$ brew services start mongodb-community@4.4
```

#### Étape 7
Vous pourrez ensuite accéder au Mongo Shell - le terminal de commande propre à Mongo - avec la commande :
```bash
$ mongo
```

### Mise en place mongo Atlas en cloud

#### Étape 1
Aller dans le projet : 

![](https://i.imgur.com/W5gk4q8.png)

#### Étape 2
Ajouter son addresse IP, pour ce faire via la side bar a gauche aller dans l'onglet : `Network Access`

![](https://i.imgur.com/85LbCCz.png)


Pour ajouter cliquer sur le bouton `Add IP Address` puis sur `add current IP address` en commentaire vous pouvais mettre a qui ça appartient

![](https://i.imgur.com/Kv25O0F.png)

:warning: Il faudra refaire cette opération si vous changer de lieu car entre votre entreprise et votre maison par exemple les IP's seront différentes.

#### Étape 3

Lancer le serveur coté back avec `npm run start`

#### Étape 4

Pour vérifier que la liaison soit faite aller dans l'onglet `database` puis `Browse Collections` pour voir toutes nos tables et données

![](https://i.imgur.com/Ly1elvt.png)

Vous pouvais créer un compte via le front ou via l'api directement et voir si vos données d'affichent bien.


### Commandes de base
- `show dbs`: permet d'afficher les bases de données présentes sur votre machine
- `use <dbName>`: permet d'indiquer à mongo que vous voulez utiliser cette base de données pour les futures opérations
- `show collections` : permet d'afficher l'ensemble des collections pour une base de données
- `db.<collectionName>.find()` : permet d'afficher l'ensemble des objets présents dans cette collection
