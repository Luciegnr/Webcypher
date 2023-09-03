# PLI - WEBCYPHER

#### ALIASES

Paste this https://pastebin.com/ZG54SE5C at the end of your .zshrc to get these aliases

`drm` (coupe tous les containers docker)

 `drmv` (supprime les volumes (drop la DB)), 


`ga .` = `git add .` 

`gc "Mon message de commit"` = `git commit -m "Mon message de commit"` 

`git-sp` => `git add .` + `git commit --amend --no-edit` + `git push -f` => rajoute les modifs faites depuis le dernier commit SUR le dernier commit et push en force


### HOW TO INSTALL

Clone the repository.

```cd WEBCYPHER/```

```docker-compose up --build``` to build and up containers or `dc-bu` with aliases

Once up, you should  be able to acces Swagger [here](http://localhost:5001/swagger/index.html) 

Once up, you should  be able to acces React [here](http://localhost:3000) 

```bash
docker exec -it webcypher_back bash
``` 
to get a shell inside the dotnet container

Once up, you should  be able to acces Swagger [here](http://localhost:5001/swagger/index.html) 
Once up, you should  be able to acces React [here](http://localhost:3000) 

```docker exec -it webcypher_back bash``` to get a shell inside the dotnet container
```docker exec -it webcypher_front bash``` to get a shell inside the react container

### Troubleshooting

#### Manage Docker containers and volumes

```docker ps``` to show containers (running or not).

```docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)``` to stop ALL docker containers or `drm` if you have aliases

```docker volume rm $(docker volume ls -q)``` to remove ALL volumes (most often used to drop the database & restart from a fresh DB) or `drmv` if you have aliases

#### What's using my port  ?

On Unix use either ```sudo netstat -tln``` or ```sudo ss -ltpn``` to get a list of all services that are using a port on your machine.

#### Stop mySQL

[Go here to learn how to stop mySQL on a Mac Install](https://stackoverflow.com/a/102094)

On Linux, just type ```sudo service mysqld stop```.
