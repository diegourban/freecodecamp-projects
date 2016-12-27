var GlobalTemperatureChart = GlobalTemperatureChart || {};

GlobalTemperatureChart.Config = {
  'data_url' : 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json'
};

GlobalTemperatureChart.HeatMap = (function(){
  var config = GlobalTemperatureChart.Config;
	
  var url = config.data_url;
  
  function drawChart() { 
    var margin = { top: 50, right: 0, bottom: 100, left: 80 },
      width = 960 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom,
      gridSize = Math.floor(width / 24),
      legendElementWidth = gridSize*2,
      colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
      buckets = colors.length,
      months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
    
    d3.select(".chart").append("div")
        .attr("class", "title")
        .text("Monthly Global Land-Surface Temperature");

    var div = d3.select(".chart").append("div")
        .attr("class", "tooltip-box")
        .style("opacity", 0);

    var svg = d3.select(".chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var monthLabels = svg.selectAll(".monthLabel")
      .data(months)
      .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "monthLabel mono axis axis-workweek" : "dayLabel mono axis"); });

    d3.json(url, function(error, data) {
      if (error) throw error;

      let baseTemperature = data.baseTemperature;
      let temperatures = data.monthlyVariance;

      let lowVariance = d3.min(temperatures, d => d.variance);
      let highVariance = d3.max(temperatures, d => d.variance);

      var yearData = temperatures.map(o => o.year);
      yearData = yearData.filter(function(v, i) {
        return yearData.indexOf(v) == i;
      });

      var gridWidth = width / yearData.length;
      var gridHeight = height / months.length;

      var lowYear = d3.min(yearData);
      var highYear = d3.max(yearData);

      var minDate = new Date(lowYear, 0);
      var maxDate = new Date(highYear, 0);

      var xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([0, width]);
      var xAxis = d3.axisBottom().scale(xScale);

      var colorScale = d3.scaleQuantile()
        .domain([baseTemperature + lowVariance, baseTemperature + highVariance])
        .range(colors);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
      svg.append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", height)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Years");

      var temps = svg.selectAll(".years")
          .data(temperatures, function(d) {return d.year + ':' + d.month;})
        .enter().append("rect")
          .attr("x", function(d) { return (d.year - lowYear) * gridWidth; })
          .attr("y", function(d) { return (d.month - 1) * gridHeight; })
          .attr("class", "hour bordered")
          .attr("width", gridWidth)
          .attr("height", gridHeight)
          .style("fill", colors[0])
        .on("mouseover", function(d) {
          div.transition()
            .duration(200)
            .style("opacity", 0.9);
          var html = "<span>" + d.year + " - " + months[d.month - 1] + "</span><br>" + "<span>Variance: " + d.variance + "</span><br>";
          div.html(html)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function(d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });

      var t = d3.transition().duration(500).ease(d3.easeLinear);

      temps.transition(t).style("fill", function(d) { return colorScale(d.variance + baseTemperature); });
      
      temps.exit().remove();

      var legend = svg.selectAll(".legend")
            .data([0].concat(colorScale.quantiles()), function(d) { return d; })
          .enter().append("g")
            .attr("class", "legend");

      legend.append("rect")
        .attr("x", function(d, i) { return legendElementWidth * i; })
        .attr("y", height + 50)
        .attr("width", legendElementWidth)
        .attr("height", gridSize / 2)
        .style("fill", function(d, i) { return colors[i]; });

      legend.append("text")
        .attr("class", "mono")
        .text(function(d) { return "≥ " + Math.round(d); })
        .attr("x", function(d, i) { return legendElementWidth * i; })
        .attr("y", height + gridSize + 50);

      legend.exit().remove();
    });
  }  
  	
  return {
    draw: function() {
	    return drawChart();
	  }
  };
})();

GlobalTemperatureChart.HeatMap.draw();