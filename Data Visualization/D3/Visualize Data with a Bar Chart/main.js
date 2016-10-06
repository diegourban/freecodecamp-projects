var GDPChart = GDPChart || {};

GDPChart.Config = {
	'url' : 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',
	'months' = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	'formatCurrency' = d3.format("$,.2f");
};

GDPChart.BarChart = (function(){
	var config = GDPChart.Config;
	
	var myTimer;
	var currentSession = config.pomodoroSession;
	var totalSeconds = 0;
	var sessionTime = config.pomodoroTime;
	var minutesLabelId = "minutes";
	var secondsLabelId = "seconds";
  
	function drawChart() {
		// carregar os dados
		//
	}
	
	return {
		draw: function() {
			return drawChart();
		}
	};
})();