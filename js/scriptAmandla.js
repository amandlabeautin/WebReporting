function spacetime() {
  var wSpace = 800, hSpace = 700;
  var t0 = Date.now();


  var svgSpace = d3.select("#graphTerrain").insert("svg")
      .attr("width", wSpace).attr("height", hSpace);

  var newPopSpace = d3.select('#graphTerrain').append('div')
                    .attr('id', "newPopSpace")
                    .style("display","none");

  var popNameSpace = d3.select('#newPopSpace').append('center')
                    .attr('class', "textpopnameSpace")
                    .attr('id', "popNameSpace");

    var hrPopSpace = d3.select('#newPopSpace').append('hr')
                    .attr('class', "textpopnameSpace")
                    .attr('id', "hrPopSpace");

    var diametreSpace = d3.select('#newPopSpace').append('div')
                    .attr('class', "textpopnameSpace")
                    .attr('id', "diametreSpace");

    var RotationSpace = d3.select('#newPopSpace').append('div')
                    .attr('class', "textpopnameSpace")
                    .attr('id', "rotationSpace");

    var orbitalSpace = d3.select('#newPopSpace').append('div')
                    .attr('class', "textpopnameSpace")
                    .attr('id', "orbitalSpace");

     //---//---//--- 


  svgSpace.append("circle").attr("r", 30).attr("cx", wSpace/2)
    .attr("cy", hSpace/2).attr("class", "sun")

  var container = svgSpace.append("g")
    .attr("transform", "translate(" + wSpace/2 + "," + hSpace/2 + ")")

  container.selectAll("g.planet").data(donnees).enter().append("g")
    .attr("class", "planetOrbit").each(function(d, i) {
      if(d.rotation_period != "unknown" && d.orbital_period != "unknown"){
        d3.select(this).append("circle").attr("class", "orbit")
          .attr("r", d.orbital_period/2);
        d3.select(this).append("circle").attr("r", d.rotation_period/2).attr("cx",d.orbital_period/2)
          .attr("cy", 0).attr("class", function(d) { return d.name})
          .style("fill", function(d) { 
            if (d.diameter == "unknown" || d.diameter == 0) return "#000000";
            else return getRandomColor();
          })
          .on("mousemove", function(d){
            newPopSpace.style("display","block")
              .style("left", (d3.event.pageX + 16)+ "px")
              .style("top", (d3.event.pageY + 16) + "px"); 
            popNameSpace.text(d.name);
            diametreSpace.text("Diamètre : "+d.diameter );
            RotationSpace.text("Rotation : "+d.rotation_period );
            orbitalSpace.text("Orbite : "+d.orbital_period );
          })
          .on("mouseout", function(d){
              newPopSpace.style("display","none");
          })
        }
    })

  d3.timer(function() {
     var deltaSpace = (Date.now() - t0);
      svgSpace.selectAll(".planetOrbit").attr("transform", function(d) {
        if (d.diameter == "unknown" || d.diameter == 0) {
            d.diameter = Math.random()*(20000-10000)+10000;
        }
        return "rotate(" + 90 + deltaSpace * d.diameter/400000 + ")";
      });
  });
};

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    if (color == '#000000') getRandomColor();
    return color;
};
