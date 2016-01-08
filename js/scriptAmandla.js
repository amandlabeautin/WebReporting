d3.json("donnees/planetsSW.json",function(error,data){
        if (error) return console.warn(error);
        var json = data.results;

  var w = 800, h = 800;
  var t0 = Date.now();

var svg = d3.select("#graphTerrain").insert("svg")
    .attr("width", w).attr("height", h);

  svg.append("circle").attr("r", 20).attr("cx", w/2)
    .attr("cy", h/2).attr("class", "sun")

  var container = svg.append("g")
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")")

  container.selectAll("g.planet").data(json).enter().append("g")
    .attr("class", "planetOrbit").each(function(d, i) {
      
      d3.select(this).append("circle").attr("class", "orbit")
        .attr("r", d.orbital_period/2);
      d3.select(this).append("circle").attr("r", d.rotation_period/2).attr("cx",d.orbital_period/2)
        .attr("cy", 0).attr("class", "planetOrbit");
    });

  d3.timer(function() {
   var delta = (Date.now() - t0);
    svg.selectAll(".planetOrbit").attr("transform", function(d) {
      return "rotate(" + 90 + delta * d.diameter/200000 + ")";
    });
  });
});