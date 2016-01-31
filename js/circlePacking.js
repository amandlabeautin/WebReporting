function circlepacking() {
  var margin = 20,
    diameter = 960;

 var newPopPacking = d3.select('#graphResidents').append('div')
                    .attr('id', "newPopPacking")
                    .style("display","none");

    var popNamePacking = d3.select('#newPopPacking').append('center')
                    .attr('class', "textpopNamePacking")
                    .attr('id', "popNamePacking");

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(212, 80%,80%)", "hsl(182,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(1)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return d.size; }); 

var svg = d3.select("#graphResidents").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

  var root = processDataPacking(results.planets);

  var focus = root,
      nodes = pack.nodes(root),
      view;

  var circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth + 1) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });


  var text = svg.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.name; });

  var node = svg.selectAll("circle,text");

  d3.select("#graphResidents")
      .style("background", color(-1))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

   transition.select("#graphResidents").selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }

d3.select(self.frameElement).style("height", diameter + "px");
}

function processDataPacking(data) {
  var newDataSet = [];
  var prop;
  var child = [];
  var index = 0
  for (prop in data) {
    child = nameMoviesPacking(data[prop].residents);
    newDataSet.push({name: data[prop].name, size: data[prop].diameter, children : child});
  }

  return {children : newDataSet};
}

function nameMoviesPacking(arrayURL, random) {
  var people =  results.people;
  var dataIdPeople;
  var nameMovies = [];
  if (arrayURL.size != 0) {
     for (var i in arrayURL) {
        for (dataIdPeople in people){
            /([0-9]+)/.exec(arrayURL[i]);
            if (dataIdPeople === RegExp.$1){
              var poids = people[dataIdPeople].mass.substr(1,2);
              nameMovies.push({name : people[dataIdPeople].name, size : poids});
            }
        }
      }
  }
  return nameMovies;
}
