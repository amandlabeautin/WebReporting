
<p align="center"><img align="center" src="http://img15.hostingpics.net/pics/357724starwarsdynamicbannerlogo.jpg" width="100%" height="196" /></p>

<p align="center"><h1> Les Planètes de l'Univers Star Wars</h1></p>

### Equipe de Projet

- Amandla BEAUTIN
- Mehdi BATISTA
- Kevin VU

Etudiants de Master MIAGE à l'université Paris Descartes

### Que fait cet outil ?
Cette interface présente les planètes de l'univers Star Wars. Il est possible d'en savoir plus sur leur taille, leur relief, leurs habitants ainsi que leur position dans l'univers.

### Ressources utilisées
##### Templating et Style   
                        
> Twitter Bootstrap est utilisé pour le templating, ainsi que pour les effets de pages
> hors contenu. <img src="http://twoggle.com/blog/wp-content/uploads/2015/09/twitter-bootstrap.png" width="255px" height="151px" />


> Le moteur Twitter Bootstrap utilise également Jquery ainsi que Jquery Easing, afin de permettre les animations liées à la page (hors contenu). Les requêtes ne sont donc pas effectuées avec Jquery. <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/JQuery_logo.svg/1280px-JQuery_logo.svg.png" width="300" height="73" />

##### Modélisation du Contenu 

> La librairie d3.js est au coeur du projet car tout le contenu est modélisé à l'aide de cette librairie.  
<img src="http://2.bp.blogspot.com/-XppRAAsXnX0/UwBNUAWk5yI/AAAAAAAALU0/RqjjDdqgMzU/s1600/d3-js.png" width="450" height="197" />


### Source de données  
Dans le cadre du projet, et pour présenter la thématique Star Wars, nous avons eu recours à l'API suivante :

* http://swapi.co/ 

<img src="http://m.c.lnkd.licdn.com/mpr/mpr/AAEAAQAAAAAAAAQ4AAAAJDdkZWYzN2ZlLWNhNzUtNDBhYi1hNTMzLTAyNTkwNmJmNzdjZg.jpg" width="450" height="197" />

### Représentations   

##### Bubble Chart    

Une représentation graphique des planètes, où les cercles sont proportionnel à leur taille "réelles". Elles sont nommées et colorées en fonction de leur relief (un regroupement des reliefs pour chaque couleur a été fait pour faciliter l'affichage).

##### Space Time
Une reprséentation du système solaire de Star Wars, où chaque planète disposent de son cycle de rotation autour du soleil et de son orbite. Les planètes sont affichés proportionnellement par leur diamètre.
ATTENTION :  Les planètes de couleur noir, sont des planètes où nous ne disposont pas de données suffissantes. Ces planètes ont leur cycle de rotation et/ou leur orbite et/ou leur diamètre, créent aléatoirement.

##### Circle Packing
Ce graphique reprèsente, pour chaque planète, les personnages associés. 

##### KEVIN 
todo
