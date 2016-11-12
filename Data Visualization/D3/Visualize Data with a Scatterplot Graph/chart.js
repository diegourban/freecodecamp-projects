var BicycleRacingTimesChart = BicycleRacingTimesChart || {};

BicycleRacingTimesChart.Config = {
  'data_url' : 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
};

BicycleRacingTimesChart.Scatterplot = (function(){
  var config = BicycleRacingTimesChart.Config;
	
  var url = config.data_url;
  
  function drawChart() { 
    var margin = {top: 25, right: 120, bottom: 25, left: 25},
    width = 750 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([width, 0]);

    var y = d3.scaleLinear()
        .range([0, height]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);

    d3.select(".chart").append("div")
        .attr("class", "title")
        .text("Doping in Professional Bicycle Racing");

    var div = d3.select(".chart").append("div")
        .attr("class", "tooltip-box")
        .style("opacity", 0);

    var svg = d3.select(".chart").append("svg")
        .attr("class", "graph")
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
          .attr("r", 5)
          .attr("cx", function(d) { return x(d.Seconds); })
          .attr("cy", function(d) { return y(d.Place); })
          .style("fill", function(d) { return color(d.Doping ? 'Doping' : 'No Doping'); })
        .on("mouseover", function(d) {
          console.log(d);
          div.transition()
            .duration(200)
            .style("opacity", 0.9);
          var html = "<span>" + d.Name + ": " + d.Nationality + "</span><br>" + "<span>Year: " + d.Year + ", Time: " + d.Time + "</span><br>";
          if(d.Doping != "") {
            html += "<br><span>" + d.Doping + "</span>";
          }
          div.html(html)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function(d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });

      svg.selectAll(".dotLabel")
          .data(data)
        .enter().append("text")
          .attr("class", "dotLabel")
          .attr("x", function(d) { return x(d.Seconds); })
          .attr("y", function(d) { return y(d.Place); })
          .text(function(d) {
            return d.Name;
          })
          .attr("transform", "translate(15,+4)");

      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("circle")
          .attr("cx", 50)
          .attr("cy", 10)
          .attr("r", 5)
          .style("fill", color);

      legend.append("text")
          .attr("x", 60)
          .attr("y", 10)
          .attr("dx", "-.2em")
          .attr("dy", ".3em")
          .style("text-anchor", "begin")
          .text(function(d) { return d; });
    });
  }  
  	
  return {
    draw: function() {
	    return drawChart();
	  }
  };
})();

BicycleRacingTimesChart.Scatterplot.draw();