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
    var jqxhr = $.getJSON(url, function() {
	  console.log( "success" );
	})
	.done(function(jsonData) {
	  console.log("second success");
	  var jsonData = jsonData.data;
	  //var data = [4, 8, 15, 16, 23, 42];
	  console.log(jsonData);
	  //var json = JSON.parse(data);
	  
      var margin = {top: 20, right: 30, bottom: 30, left: 40},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	  var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

	  var y = d3.scale.linear()
		.range([height, 0]);

	  var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	  var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(10, "%");

	  var chart = d3.select(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	  d3.json(jsonData, type, function(error, data) {
        x.domain(data.map(function(d) { return d.name; }));
		y.domain([0, d3.max(data, function(d) { return d.value; })]);

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
		  .text("Frequency");

	    chart.selectAll(".bar")
		  .data(data)
		.enter().append("rect")
		  .attr("class", "bar")
		  .attr("x", function(d) { return x(d.name); })
		  .attr("y", function(d) { return y(d.value); })
		  .attr("height", function(d) { return height - y(d.value); })
		  .attr("width", x.rangeBand());
			});
	})
	.fail(function() {
	  console.log("error");
	})
	.always(function() {
	  console.log("complete");
	});
  }
  
  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
	
  return {
    draw: function() {
	  return drawChart();
	}
  };
})();
