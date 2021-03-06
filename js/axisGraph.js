// HELPERS
function parseData(d) {
  var keys = _.keys(d[0]);
  var stringTypes = ["name", "climate", "terrain", "residents", "films", "url"];
  return _.map(d, function(d) {
    var o = {};
    if (d['diameter'] != "unknown" && d['population'] != "unknown")
    {
        _.each(keys, function(k) {
            if(stringTypes.indexOf(k) != -1)
              o[k] = d[k];
            else {
              if(typeof d[k] == "string")
              {
                // Population = 0; 
                if(d[k] == "unknown")
                  o[k] = 0;
                else
                  o[k] = d[k];
              }
              else
                o[k] = parseFloat(d[k]);
            }
        });
    }
    return o;
  });
}

function getBounds(d, paddingFactor) {
  // Find min and maxes (for the scales)
  paddingFactor = typeof paddingFactor !== 'undefined' ? paddingFactor : 1;

  var keys = _.keys(d[0]), b = {};
  _.each(keys, function(k) {
    b[k] = {};
    _.each(d, function(d) {
      if(isNaN(d[k]))
        return;
      if(b[k].min === undefined || parseInt(d[k]) < parseInt(b[k].min))
      {
        b[k].min = d[k];
      }
      if(b[k].max === undefined || parseInt(d[k]) > parseInt(b[k].max))
      {
        b[k].max = d[k];
      }
    });
    b[k].max > 0 ? b[k].max *= paddingFactor : b[k].max /= paddingFactor;
    b[k].min > 0 ? b[k].min /= paddingFactor : b[k].min *= paddingFactor;
  });
  return b;
}

function getCorrelation(xArray, yArray) {
  function sum(m, v) {return m + v;}
  function sumSquares(m, v) {return m + v * v;}
  function filterNaN(m, v, i) {isNaN(v) ? null : m.push(i); return m;}

  // clean the data (because we know that some values are missing)
  var xNaN = _.reduce(xArray, filterNaN , []);
  var yNaN = _.reduce(yArray, filterNaN , []);
  var include = _.intersection(xNaN, yNaN);
  var fX = _.map(include, function(d) {
    return parseFloat(xArray[d]);
  });
  var fY = _.map(include, function(d) {
    return parseFloat(yArray[d]);
  });

  var sumX = _.reduce(fX, sum, 0);
  var sumY = _.reduce(fY, sum, 0);
  var sumX2 = _.reduce(fX, sumSquares, 0);
  var sumY2 = _.reduce(fY, sumSquares, 0);
  var sumXY = _.reduce(fX, function(m, v, i) {return m + v * fY[i];}, 0);

  var n = fX.length;
  var ntor = ( ( sumXY ) - ( sumX * sumY / n) );
  var dtorX = sumX2 - ( sumX * sumX / n);
  var dtorY = sumY2 - ( sumY * sumY / n);
 
  var r = ntor / (Math.sqrt( dtorX * dtorY )); // Pearson ( http://www.stat.wmich.edu/s216/book/node122.html )
  var m = ntor / dtorX; // y = mx + b
  var b = ( sumY - m * sumX ) / n;

  return {r: r, m: m, b: b};
}

function axisGraph() {
  /*var json = donnees.results;*/

  var xAxis = 'diameter', yAxis = 'population';
  /*var xAxisOptions = ["GDP", "Equality", "Food consumption", "Alcohol consumption", "Energy consumption", "Family", "Working hours", "Work income", "Health spending", "Military spending"]*/
  // var yAxisOptions = ["Well-being"];
  var descriptions = {
    "diameter" : "Diamètre de la planète",
    "population" : "Population de la planète"
  };

  var keys = _.keys(donnees[0]);
  var data = parseData(results.planets);
  var bounds = getBounds(data, 1);

  // SVG AND D3 STUFF
  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", 1300)
    .attr("height", 950);
  var xScale, yScale;

  svg.append('g')
    .classed('chart', true)
    .attr('transform', 'translate(80, -60)');

  // Country name
  d3.select('svg g.chart')
    .append('text')
    .attr({'id': 'name', 'x': 0, 'y': 170})
    .style({'font-size': '80px', 'font-weight': 'bold', 'fill': '#ddd'});

  // Best fit line (to appear behind points)
  d3.select('svg g.chart')
    .append('line')
    .attr('id', 'bestfit');

  d3.select('svg g.chart')
    .append('text')
    .attr('transform', 'translate(-75, 500)rotate(-90)')
    .attr({'id': 'yLabel', 'text-anchor': 'middle'})
    .text('Population de la planète');

  d3.select('svg g.chart')
    .append('text')
    .attr('transform', 'translate(550, 980)')
    .attr({'id': 'xLabel', 'text-anchor': 'middle'})
    .text('Diamètre de la planète');

  // Render points
  updateScales();
  var pointColour = d3.scale.category20b();
  d3.select('svg g.chart')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return isNaN(d[xAxis]) ? d3.select(this).attr('cx') : xScale(d[xAxis]);
    })
    .attr('cy', function(d) {
      return isNaN(d[yAxis]) ? d3.select(this).attr('cy') : yScale(d[yAxis]);
    })
    .attr('fill', function(d, i) {return pointColour(i);})
    .style('cursor', 'pointer')
    .on('mouseover', function(d) {
      d3.select('svg g.chart #name')
        .text(d.name)
        .transition()
        .style('opacity', 1);
    })
    .on('mouseout', function(d) {
      d3.select('svg g.chart #name')
        .transition()
        .duration(1500)
        .style('opacity', 0);
    });

  updateChart(true);
  updateMenus();

  // Render axes
  d3.select('svg g.chart')
    .append("g")
    .attr('transform', 'translate(0, 930)')
    .attr('id', 'xAxis')
    .call(makeXAxis);

  d3.select('svg g.chart')
    .append("g")
    .attr('id', 'yAxis')
    .attr('transform', 'translate(-10, 0)')
    .call(makeYAxis);



  //// RENDERING FUNCTIONS
  function updateChart(init) {
    updateScales();

    d3.select('svg g.chart')
      .selectAll('circle')
      .transition()
      .duration(500)
      .ease('quad-out')
      .attr('cx', function(d) {
        return isNaN(d[xAxis]) ? d3.select(this).attr('cx') : xScale(d[xAxis]);
      })
      .attr('cy', function(d) {
        return isNaN(d[yAxis]) ? d3.select(this).attr('cy') : yScale(d[yAxis]);
      })
      .attr('r', function(d) {
        return isNaN(d[xAxis]) || isNaN(d[yAxis]) ? 0 : 12;
      });

    // Also update the axes
    d3.select('#xAxis')
      .transition()
      .call(makeXAxis);

    d3.select('#yAxis')
      .transition()
      .call(makeYAxis);

    // Update correlation
    var xArray = _.map(data, function(d) {return d[xAxis];});
    var yArray = _.map(data, function(d) {return d[yAxis];});
    var c = getCorrelation(xArray, yArray);
    var x1 = xScale.domain()[0], y1 = c.m * x1 + c.b;
    var x2 = xScale.domain()[1], y2 = c.m * x2 + c.b;

    // Fade in
    d3.select('#bestfit')
      .style('opacity', 0)
      .attr({'x1': xScale(x1), 'y1': yScale(y1), 'x2': xScale(x2), 'y2': yScale(y2)})
      .transition()
      .duration(1500)
      .style('opacity', 1);
  }

  function updateScales() {
    xScale = d3.scale.linear()
                    .domain([0, 30000])
                    .range([20, 1000]);

    yScale = d3.scale.linear()
                    .domain([0, 40000000000])
                    .range([900, 100]);
  }

  function makeXAxis(s) {
    s.call(d3.svg.axis()
      .scale(xScale)
      .orient("bottom"));
  }

  function makeYAxis(s) {
    s.call(d3.svg.axis()
      .scale(yScale)
      .orient("left"));
  }

  function updateMenus() {
    d3.select('#x-axis-menu')
      .selectAll('li')
      .classed('selected', function(d) {
        return d === xAxis;
      });
    d3.select('#y-axis-menu')
      .selectAll('li')
      .classed('selected', function(d) {
        return d === yAxis;
    });
  }
}