(function() {
   d3.json("donnees/planetsSW.json",function(error,data){
        if (error) return console.warn(error);
        var json = data;    
    
	// D3 Bubble Chart 

	var diameter = 400;

	var svg = d3.select('#graph').append('svg')
					.attr('width', diameter)
					.attr('height', diameter);
      
       
     //---//---//---  
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

     //---//---//--- 
       
       
	var bubble = d3.layout.pack()
				.size([diameter, diameter])
				.value(function(d) {return d.size;})
         // .sort(function(a, b) {
				// 	return -(a.value - b.value)
				// }) 
				.padding(3);      
       
  // generate data with calculated layout values
  var nodes = bubble.nodes(processData(json))
						.filter(function(d) { return !d.children; }); // filter out the outer bubble
 
  var vis = svg.selectAll('circle')
					.data(nodes);

       
  vis.enter().append('circle')
			.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return d.r; })
            .attr('class', function(d) { return d.className; })
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
            .on("mouseup", function(d){
            // CLICK FUNCTION ???
  })
            .on("mouseout", function(d){
            newPop.style("display","none");
  });
              

  function processData(data) {
    var obj = data.results;
    var newDataSet = [];
console.log(obj);
 for(var prop in obj) {
      newDataSet.push({name: obj[prop].name, className: obj[prop].terrain.toLowerCase()+ " planet", size: obj[prop].diameter, population : obj[prop].population,gravite : obj[prop].gravity});
    }
    return {children: newDataSet};
  }     
  });    
})();
