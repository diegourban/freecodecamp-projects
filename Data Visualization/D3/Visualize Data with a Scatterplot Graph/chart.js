var BicycleRacingTimesChart = BicycleRacingTimesChart || {};

BicycleRacingTimesChart.Config = {
  'data_url' : 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
};

BicycleRacingTimesChart.Scatterplot = (function(){
  var config = BicycleRacingTimesChart.Config;
	
  var url = config.data_url;
  
  function drawChart() { 
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([width, 0]);

    var y = d3.scaleLinear()
        .range([0, height]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(url, function(error, data) {
      if (error) throw error;

      var fastestTimeInSeconds = d3.min(data.map(function (d) { return d.Seconds; }));

      data.forEach(function(d) {
        d.Place = +d.Place;
        d.Seconds = +d.Seconds - fastestTimeInSeconds;
      });

      x.domain(d3.extent(data, function(d) { return d.Seconds; })).nice();
      y.domain(d3.extent(data, function(d) { return d.Place; })).nice();

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
      svg.append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", height)
          .attr("dy", "-.51em")
          .style("text-anchor", "end")
          .text("Time Behind Fastest (seconds)");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
      svg.append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Ranking")

      svg.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", function(d) { return x(d.Seconds); })
          .attr("cy", function(d) { return y(d.Place); });

      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });
    });
  }  
  	
  return {
    draw: function() {
	    return drawChart();
	  }
  };
})();

