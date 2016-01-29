    var planetnext  = "http://swapi.co/api/planets/";
    //var peoplenext  = "http://swapi.co/api/people/";
    var boolnext = false;    
    var donnees = [];
       getData(planetnext);
     //  getData(peoplenext);
        
function getData(url){
    var test = "toto";
    d3.json(url, function(error, json) {
  if (error) return console.warn(error);
        console.log(test);
         traitementjson(json.results);
         
        
        if(json.next!==null){
            getData(json.next);
        }
        else{ 
            boolnext = true;
            bubblechart();
            spacetime();
            return donnees; 
        }
});
    
}

function traitementjson(tab){
    for (var i in tab)/*{*/ donnees.push(tab[i]); /*console.log(tab[i].diameter);}*/
    return donnees;
}