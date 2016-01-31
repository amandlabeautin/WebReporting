var donnees = [];
var results = {};
var data = [];
var end = false;
var u = 0; 
var urls = ["http://swapi.co/api/planets/","http://swapi.co/api/people/"];

getData(urls,true,true);

function getData(url,debut,groupnext){ 
    if(groupnext === true){ 
        ajoutcharg(10);
        if (debut !== false){ 
            var url = urls[u];
        }
        else{ 
            data = [];
            u = u + 1; 
            if(typeof urls[u] !== 'undefined') var url = urls[u];
            else end = true;
        }
    }

    if(end === false){
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            var result = json.results;
            for (var i in result) data.push(result[i]);

            if(json.next!==null){
                getData(json.next,false,false);
                ajoutcharg(5);
            }
            else{ 
                donnees.push(data); 
                getData( "",false,true);
            }
        });
    }else{
        results.planets = donnees[0];
        results.people = donnees[1];
        bubblechart();
        spacetime();
        circlepacking();
        axisGraph();
        fadeoutintro();
    }
}

