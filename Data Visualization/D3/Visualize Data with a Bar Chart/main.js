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
	  var data = jsonData.data;
	  console.log(data);
	})
	.fail(function() {
	  console.log("error");
	})
	.always(function() {
	  console.log("complete");
	});
  }
	
  return {
    draw: function() {
	  return drawChart();
	}
  };
})();