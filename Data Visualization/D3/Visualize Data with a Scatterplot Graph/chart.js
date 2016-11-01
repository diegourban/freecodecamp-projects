var BicycleRacingTimesChart = BicycleRacingTimesChart || {};

BicycleRacingTimesChart.Config = {
  'data_url' : 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
};

BicycleRacingTimesChart.Scatterplot = (function(){
  var config = BicycleRacingTimesChart.Config;
	
  var url = config.data_url;
  
  function drawChart() { 
  
    $.getJSON(url).done(function(jsonData) {
      console.log(jsonData);
	  });  
  }
  	
  return {
    draw: function() {
	    return drawChart();
	  }
  };
})();

