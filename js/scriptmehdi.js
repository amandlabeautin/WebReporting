(function() {
   d3.json("donnees/planetsSW.json",function(error,data){
        if (error) return console.warn(error);
        var json = data;    
    
	// D3 Bubble Chart 

	var diameter = 600;

	var svg = d3.select('#graph').append('svg')
					.attr('width', diameter)
					.attr('height', diameter);
      
       
     //---//---//---  
    var newPop = d3.select('#graph').append('div')
                    .attr('id', "newPop")
                    .style("display","none");
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
                 .text(d.name)
                 .style("left", (d3.event.pageX + 16)+ "px")
                 .style("top", (d3.event.pageY + 16) + "px");  
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

 for(var prop in obj) {
       // console.log(obj[prop]);
      newDataSet.push({name: obj[prop].name, className: /*obj[prop].name.toLowerCase() + " " + */obj[prop].terrain.toLowerCase()+ " planet", size: obj[prop].diameter});
    }
    return {children: newDataSet};
  }     
  });    
})();