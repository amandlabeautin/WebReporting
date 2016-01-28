    var next  = "http://swapi.co/api/planets/";
    var donnees  = [];  
    var boolnext = false;    
        getData(next);
        
function getData(url){
    d3.json(url, function(error, json) {
  if (error) return console.warn(error);
        
         traitementjson(json.results);
         
        
        if(json.next!==null){
            getData(json.next);
        }
        else{ 
            boolnext = true;
            bubblechart();
            return donnees; 
        }
});
    
}

function traitementjson(tab){
    for (var i in tab)/*{*/ donnees.push(tab[i]); /*console.log(tab[i].diameter);}*/
}