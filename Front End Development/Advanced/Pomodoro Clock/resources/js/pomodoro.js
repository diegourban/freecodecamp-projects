var Pomodoro = Pomodoro || {};

Pomodoro.Config = {
	'pomodoroTime' : 25,
	'breakTime' : 5,
	'debug' : false,
	'pomodoroSession' : 'POMODORO',
	'breakSession' : 'BREAK'
};

Pomodoro.Timer = (function(){
	var config = Pomodoro.Config;
	
	var myTimer;
	var currentSession = config.pomodoroSession;
	var totalSeconds = 0;
	var sessionTime = config.pomodoroTime;
	var minutesLabelId = "minutes";
	var secondsLabelId = "seconds";
  
	function startSession() {
		initializeTimer();
		$('button[name=stop]').removeClass('hidden');
		$('button[name=start]').addClass('hidden');
		$('button[name=restart]').addClass('hidden');
	}
	
	function stopSession() {
		clearInterval(myTimer);
		$('button[name=restart]').removeClass('hidden');
		$('button[name=start]').addClass('hidden');
		$('button[name=stop]').addClass('hidden');
	}
	
	function restartSession() {
		setInitialTime();
		updateTime();
		initializeTimer();
		
		$('button[name=restart]').addClass('hidden');
		$('button[name=start]').addClass('hidden');
		$('button[name=stop]').removeClass('hidden');	
	}
	
	function initializeTimer() {
		myTimer = setInterval(runTime, 1000);
	}
	
	function runTime() {
		--totalSeconds;
	
		updateTime();
	
		if(sessionEnded()) {
			endSession();
			playAlarm();
		
		}
	}
	
	function updateTime() {
		var minutes = Math.floor(totalSeconds / 60);
		var seconds = totalSeconds - (minutes * 60);

		document.getElementById(minutesLabelId).innerHTML = pad(minutes);
		document.getElementById(secondsLabelId).innerHTML = pad(seconds);
	}
	
	function pad(val) {
		var valString = val + "";
		if (valString.length < 2) {
			return "0" + valString;
		} else {
			return valString;
		}
	}
	
	function sessionEnded() {
		return totalSeconds === 0;
	}
	
	function endSession() {
		clearInterval(myTimer);
		changeSession();
		setInitialTime();
		updateTime();
		
		$('button[name=restart]').addClass('hidden');
		$('button[name=start]').removeClass('hidden');
		$('button[name=stop]').addClass('hidden');
	}
	
	function changeSession() {
		if(currentSession === config.pomodoroSession) {
			currentSession = config.breakSession;
			sessionTime = config.breakTime;
		} else {
			currentSession = config.pomodoroSession;
			sessionTime = config.pomodoroTime;
		}
	}
	
	function playAlarm() {
		document.getElementById('endedAudio').play();
	}
	
	function setInitialTime() {
		totalSeconds = sessionTime*60;
	}

	setInitialTime();
	
	return {
		startSession: function() {
			return startSession();
		},
		stopSession: function() {
			return stopSession();
		},
		restartSession: function() {
			return restartSession();
		}
	};
})();