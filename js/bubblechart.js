// D3 Bubble Chart 
function bubblechart(){
    var diameter = 450,
        format = d3.format(",d"),
        color = d3.scale.category20c();

    //Creation de la div de graph
    var svg = d3.select('#graph').append('svg')
    .attr('width', diameter*2)
    .attr('height', diameter*2);

    //Création de la popup d'affichage (hover une planète)
    var newPop = d3.select('#graph').append('div')
    .attr('id', "newPop")
    .style("display","none");

    var popName = d3.select('#newPop').append('center')
    .attr('class', "textpopname")
    .attr('id', "popName");

    var hrPop = d3.select('#newPop').append('hr')
    .attr('class', "textpopname")
    .attr('id', "hrPop");

    var diametre = d3.select('#newPop').append('div')
    .attr('class', "textpopname")
    .attr('id', "diametre");

    var population = d3.select('#newPop').append('div')
    .attr('class', "textpopname")
    .attr('id', "population");

    var gravite = d3.select('#newPop').append('div')
    .attr('class', "textpopname")
    .attr('id', "gravite");


    var bubble = d3.layout.pack()
    .size([diameter, diameter])
    .value(function(d) {return d.size;})
    .padding(3);      

    var node = svg.selectAll(".node")
    .data(bubble.nodes(processData(donnees))
          .filter(function(d) { return !d.children; }))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + (d.x)*2 + "," + (d.y)*2 + ")"; })
    .on("mousemove", function(d){
        newPop.style("display","block")
            .style("left", (d3.event.pageX + 16)+ "px")
            .style("top", (d3.event.pageY + 16) + "px");  
        popName.text(d.name);
        diametre.text("Diamètre : "+d.size );
        population.text("Population : "+d.population );
        var grav = d.gravite.split(" ");
        gravite.text("Gravité : "+ grav[0] );
    })
    .on("mouseout", function(d){
        newPop.style("display","none");

    });

    node.append("title")
        .text(function(d) { return d.name});


    //Création d'un cercle (avec attributs HTML et evenement mouseup et mousemove)     
    node.append('circle')
        .attr('r', function(d) { return (d.r)*2; })
        .attr('class', function(d) { return d.className; });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("font-size","100%")
        .style("color","white")
        .text(function(d) { 
        
        return d.name.substring(0, d.r / 3); });

    function processData(data) {
        var newDataSet = [];
        for(var prop in data) {
            newDataSet.push({name: data[prop].name, className: data[prop].terrain.toLowerCase()+ " planet", size: data[prop].diameter, population : data[prop].population,gravite : data[prop].gravity});
        }
        return {children: newDataSet};
    }     
}