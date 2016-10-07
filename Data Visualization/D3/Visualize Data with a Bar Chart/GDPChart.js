var GDPChart = GDPChart || {};

GDPChart.Config = {
  'data_url' : 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',
  'months' : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  'formatCurrency' : d3.format("$,.2f")
};

GDPChart.BarChart = (function(){
  var config = GDPChart.Config;
	
  var url = config.data_url;
  
  function drawChart() { 
  
    $.getJSON(url).done(function(jsonData) {
	  var data = jsonData.data;

      console.log(data);
      console.log(JSON.stringify(jsonData));
	  
	  var margin = {top: 20, right: 30, bottom: 30, left: 40},
	  width = 960 - margin.left - margin.right,
	  height = 500 - margin.top - margin.bottom;
    
	  var barWidth = Math.ceil(width / data.length);
	  
	  minDate = new Date(data[0][0]);
      maxDate = new Date(data[274][0]);

      var x = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

	  var y = d3.scale.linear().range([height, 0])
	    .domain([0, d3.max(data, function(d) {
          return d[1];
        })]);

	  var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(d3.time.years, 5);;
  
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "");
  
      var chart = d3.select(".chart")
  	    .attr("width", width + margin.left + margin.right)
  	    .attr("height", height + margin.top + margin.bottom)
        .append("g")
  	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  
	  chart.append("g")
  	    .attr("class", "x axis")
  	    .attr("transform", "translate(0," + height + ")")
  	    .call(xAxis);
      
      chart.append("g")
  	    .attr("class", "y axis")
  	    .call(yAxis)
  	  .append("text")
  	    .attr("transform", "rotate(-90)")
  	    .attr("y", 6)
  	    .attr("dy", ".71em")
  	    .style("text-anchor", "end")
  	    .text("Gross Domestic Product, USA");
      
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
  	    .attr("width", barWidth);
	});  
  }
  	
  return {
    draw: function() {
	  return drawChart();
	}
  };
})();
