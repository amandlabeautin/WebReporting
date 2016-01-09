d3.json("donnees/planetsSW.json",function(error,data){
        if (error) return console.warn(error);
        var json = data.results;

  var w = 800, h = 600;
  var t0 = Date.now();

var svg = d3.select("#graphTerrain").insert("svg")
    .attr("width", w).attr("height", h);

var newPopA = d3.select('#graphTerrain').append('div')
                    .attr('id', "newPop")
                    .style("display","none");

  svg.append("circle").attr("r", 30).attr("cx", w/2)
    .attr("cy", h/2).attr("class", "sun")

  var container = svg.append("g")
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")

  container.selectAll("g.planet").data(json).enter().append("g")
    .attr("class", "planetOrbit").each(function(d, i) {
      d3.select(this).append("circle").attr("class", "orbit")
        .attr("r", d.orbital_period/2);
      d3.select(this).append("circle").attr("r", d.rotation_period/2).attr("cx",d.orbital_period/2)
        .attr("cy", 0).attr("class", function(d) { return d.name})
        .on("mousemove", function(d){
           newPopA.style("display","block")
                 .text(d.name + " " + "Rotation : " + d.rotation_period + " " + "Orbit : " + d.orbital_period)
                .style("left", (d3.event.pageX + 16)+ "px")
                 .style("top", (d3.event.pageY + 16) + "px"); 
            })
        .on("mouseout", function(d){
            newPopA.style("display","none");
    })

  d3.timer(function() {
   var delta = (Date.now() - t0);
    svg.selectAll(".planetOrbit").attr("transform", function(d) {
      return "rotate(" + 90 + delta * d.diameter/400000 + ")";
    });
  });
});
    });