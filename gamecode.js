

var saveActivities = localStorage.getItem("mySavedActivities");
saveActivities = JSON.parse(saveActivities);
console.log(saveActivities);

var index = 0;
var SVGplaceholder = document.getElementById("SVGplaceholder");

var activityTime = 0;
var timeDif = [];
var countdownTimer;
var freeTime = document.getElementById("freeTime");
var timeRemainingAct = document.getElementById("timeRemainingAct");


function loadPic(){
	console.log(window.innerWidth);
	//set tablet or mobile display based on screen size 

	if (window.innerWidth < 576){
		
		var gameScenes = ["./assets/game/Mobile/teethbrush_mobile.svg",
					"./assets/game/Mobile/coffee_mobile.svg",
					"./assets/game/Mobile/breakfast_mobile.svg",
					"dressedtest.svg",
					"./assets/game/Mobile/lunch_mobile.svg"];
		
	} else {
		var gameScenes = ["./assets/game/Tablet/teethbrush_tablet.svg",
					"./assets/game/Tablet/coffee_tablet.svg",
					"./assets/game/Tablet/breakfast_Tablet.svg",
					"dressedtest.svg",
					"./assets/game/Tablet/lunch_Tablet.svg"];
	}
	
	if (saveActivities[index].pic == "undefined"){
			SVGplaceholder.data = "customactivityBG.svg";
			var customActTitle = document.createElement("DIV");
			customActTitle.style.fontSize = "70pt";
			customActTitle.innerHTML = saveActivities[index].name;
			document.body.appendChild(customActTitle);
			
		//if both of those are untrue, show the pic associated with the activity 
			
		} else {
			SVGplaceholder.data = gameScenes[saveActivities[index].pic];
			
		} 
	
}


//this function loads the visual (by changing the svg data) to the "pic" value associated with the array object 

	function loadScene(){
		
		console.log(saveActivities.length); 
		console.log(index);
		
		//if all the activities are done, go to challenges page 
		
		if (index == saveActivities.length) {
			window.location.href = "challenges.html";
			
		//else if the pic is undefined, create a placeholder image 
			
		} else {
			loadPic();
		} 
		
		startTimer();
		showSchedule();
	}

	loadScene();

//this function advances the game to the next scene by increasing the index by 1 and running the load scene function again

function advanceGame(){
		index ++;
		stopTimer();
		saveTime();
		loadScene();
	}



//doing something every time 1 second passes 
function secondPassed() {
	
	timeRemainingAct.innerHTML = getDisplayTime(activityTime);

	//this takes away a second from the activity 
    activityTime--;
}


function startTimer(){
	//take time property of the index activity and turn it into seconds 
	activityTime = (saveActivities[index].time * 60)
	//this runs the seconds passed function every 1 second 
	countdownTimer = setInterval('secondPassed()', 1000);
} 

function stopTimer(){
	clearInterval(countdownTimer);
}

//when the user clicks next, we want to store their time to see if they're ahead or behind schedule.
function saveTime(){
	timeDif.push(activityTime);
}

function showSchedule(){
	var freeTimeSum = 0;
	
	for (i=0; i < timeDif.length; i++){
		freeTimeSum = freeTimeSum + timeDif[i];
	}
	

	freeTime.innerHTML = getDisplayTime(freeTimeSum);
	console.log(freeTimeSum);
}

function getDisplayTime(timeSeconds){
		//turn it into minutes
    var minutes = Math.floor(Math.abs(timeSeconds)/60);
	//giving the seconds part 
    var remainingSeconds = Math.abs(timeSeconds) % 60;
	
	if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;  
    }
	
	if (timeSeconds < 0){
		return "-" + minutes + ":" + remainingSeconds
	} else {
		return minutes + ":" + remainingSeconds
	}
	
	
}

