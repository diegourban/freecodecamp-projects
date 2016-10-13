var GDPChart = GDPChart || {};

GDPChart.Config = {
  'data_url' : 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',
  'months' : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  'currencyFormat' : d3.format("$,.2f")
};

GDPChart.BarChart = (function(){
  var config = GDPChart.Config;
	
  var url = config.data_url;
  var format = config.currencyFormat;
  var months = config.months;
  
  function drawChart() { 
  
    $.getJSON(url).done(function(jsonData) {
	    var data = jsonData.data;
	  
	    var margin = {top: 20, right: 30, bottom: 50, left: 90},
	      width = 1000 - margin.left - margin.right,
	      height = 500 - margin.top - margin.bottom;
    
	    var barWidth = Math.ceil(width / data.length);
	  
	    minDate = new Date(data[0][0]);
      maxDate = new Date(data[data.length-1][0]);

      var x = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

	    var y = d3.scale.linear().range([height, 0])
	      .domain([0, d3.max(data, function(d) {
          return d[1];
        })]);

	    var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(d3.time.years, 5);
  
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "");

      var div = d3.select(".chart").append("div")
        .attr("class", "tooltip-box")
        .style("opacity", 0);
  
      var chart = d3.select("svg")
  	    .attr("width", width + margin.left + margin.right)
  	    .attr("height", height + margin.top + margin.bottom)
        .append("g")
  	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  
	    chart.append("g")
  	    .attr("class", "x axis")
  	    .attr("transform", "translate(0," + height + ")")
  	    .call(xAxis)
      .append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .style("text-anchor", "end")
        .text("Years");
      
      chart.append("g")
  	    .attr("class", "y axis")
  	    .call(yAxis)
  	  .append("text")
  	    .attr("transform", "rotate(-90)")
  	    .attr("y", 0)
        .attr("x",  (height / 3) * -1)
  	    .attr("dy", "-4em")
  	    .style("text-anchor", "end")
  	    .text("Gross Domestic Product");
      
      chart.selectAll(".bar")
  	    .data(data)
  	  .enter().append("rect")
  	    .attr("class", "bar")
  	    .attr("x", function(d) { 
		      return x(new Date(d[0]));
		    })
  	    .attr("y", function(d) { 
		      return y(d[1]); 
		    })
  	    .attr("height", function(d) { 
		      return height - y(d[1]); 
		    })
  	    .attr("width", barWidth)
        .on("mouseover", function(d) {
          var currentDateTime = new Date(d[0]);
          var year = currentDateTime.getFullYear();
          var month = currentDateTime.getMonth();
          var dollars = d[1];
          div.transition()
            .duration(200)
            .style("opacity", 0.9);
          div.html("<span class='amount'>" + format(dollars) + "&nbsp;Billion </span><br><span class='year'>" + year + ' - ' + months[month] + "</span>")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 50) + "px");
        })
        .on("mouseout", function(d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });
	  });  
  }
  	
  return {
    draw: function() {
	    return drawChart();
	  }
  };
})();

