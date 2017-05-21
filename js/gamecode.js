//VARIABLES 

var saveActivities = localStorage.getItem("mySavedActivities");
saveActivities = JSON.parse(saveActivities);
//saveActivities is now an array of objects with names,times, and pics
var index = 0;
var SVGplaceholder = document.getElementById("SVGplaceholder");
var activityTime = 0;
var timeDif = [];
var countdownTimer;
var freeTime = document.getElementById("freeTime");
var timeRemainingAct = document.getElementById("timeRemainingAct");
var scheduleUpdate = document.getElementById("scheduleUpdate");
var circle;
var timerContainer = document.getElementById("timerContainer");
var warning = document.getElementById("warning"),
    warningContainer = document.getElementById("warningContainer");
var beepAlert = document.getElementById("beepAlert"),
    warningAlert = document.getElementById("warningAlert");
var checkbox = document.getElementById("checkbox");
var checkmarkFill = document.getElementById("checkmarkFill");
var skipSVG = document.getElementById("skipSVG");
var completedActs = [];
var skippedActs= [];
var beepAlert = document.getElementById("beepAlert");
var audioStatus = JSON.parse(localStorage.getItem("audioSwitch"));
var icons = ["./assets/other/Icons/brushteeth.svg",
					"./assets/other/Icons/coffee.svg",
					"./assets/other/Icons/breakfast.svg",
					"./assets/other/Icons/clothes.svg",
					"./assets/other/Icons/lunch.svg",
					"./assets/other/Icons/custom.svg"];
var iconPlaceholder = document.getElementById("iconPlaceholder");
var iconContainer = document.getElementById("iconContainer");
var iconName = document.getElementById("iconName");
var customIcon = false;
var plannedTime = 0;
var timeTaken = [];
var gameScenes = [];

//FUNCTIONALITY 

//on page load, advance game 
advanceGame();
loadIcon();

console.log("sunday 2");

//either complete or skip activity depending on the button
checkbox.addEventListener("click",function(){
	checkmarkFill.style.fill = "#14275E";
	setTimeout(function(){ 
		completeActivity();
	}, 500);
})

checkmarkFill.addEventListener("click",function(){
	checkmarkFill.style.fill = "#14275E";
	setTimeout(function(){ 
		completeActivity();
	}, 500);
	
})

skipSVG.addEventListener("click",function(){
	skipActivity();
})


//GAME FUNCTION TOOLKIT

//this function advances the game to the next scene by increasing the index by 1 and running the load scene function again.

function advanceGame(){
	if (index == 0){
		loadScene();
	} else {
	stopTimer();
	saveTime();
	loadScene();
	loadIcon();
	}
	
}

//this checks the screen size to determine which SVG to load. it also checks the activity choice image is undefined - in which case, it is a custom activity, so the right scene for that will load. 

function loadPic(){
	
	var newSvg = document.createElement('object');
		newSvg.className = "SVGscenes";
		SVGplaceholder.innerHTML= '';
	
	//set tablet or mobile display based on screen size 
	if (window.innerWidth < 576){
		var gameScenes = ["./assets/game/Mobile/teethbrush_mobile.svg",
					"./assets/game/Mobile/coffee_mobile.svg",
					"./assets/game/Mobile/breakfast_mobile.svg",
					"./assets/game/Mobile/gettingdressed_mobile.svg",
					"./assets/game/Mobile/lunch_mobile.svg"];
		
       	 	warning.style.fontSize = "5vw";
			freeTime.style.fontSize = "5vw";
	} else {
		var gameScenes = ["./assets/game/Tablet/teethbrush_tablet.svg",
					"./assets/game/Tablet/coffee_tablet.svg",
					"./assets/game/Tablet/breakfast_tablet.svg",
					"./assets/game/Tablet/gettingdressed_tablet.svg",
					"./assets/game/Tablet/lunch_tablet.svg"];
		
       	 	warning.style.fontSize = "3vw";
			freeTime.style.fontSize = "3vw";
	}
	
		
		
	
//		window.addEventListener('load', function() {
//		SVGplaceholder.innerHTML= '';
//		SVGplaceholder.appendChild(newSvg);
//			
//	}
							   
		var customActTitle = document.getElementById("customActTitle");
		if (customActTitle){
		customActTitle.parentElement.removeChild(customActTitle);	
		}
	
		if (saveActivities[index].pic == "undefined"){
			if (window.innerWidth < 576){
				newSVG.data = "./assets/game/Mobile/customactivity_mobile.svg";
				SVGplaceholder.appendChild(newSvg);
				var customActTitle = document.createElement("DIV");
				customActTitle.id = "customActTitle";
				customActTitle.innerHTML = saveActivities[index].name;
				document.body.appendChild(customActTitle);
			} else {
				newSvg.data = "./assets/game/Tablet/customactivity_tablet.svg";
				SVGplaceholder.appendChild(newSvg);
				var customActTitle = document.createElement("DIV");
				customActTitle.id = "customActTitle";
				customActTitle.innerHTML = saveActivities[index].name;
				document.body.appendChild(customActTitle);
			}
			customIcon = true;
			//if both of those are untrue, show the pic associated with the activity 
		} else {
			newSvg.data = gameScenes[saveActivities[index].pic];
			SVGplaceholder.appendChild(newSvg);
//			SVGplaceholder.data = gameScenes[saveActivities[index].pic];
			customIcon = false;
			
		}
}


//this function loads the visual (by changing the svg data) to the "pic" value associated with the array object 
function loadScene(){
	//if all the activities are done, go to challenges page 
	if (index == saveActivities.length) {
		window.location.href = "challenges.html";
	//else if the pic is undefined, create a placeholder image
	} else {
		loadPic();
		startTimer();
		showSchedule();
		animateProgress();
	} 
	checkmarkFill.style.fill = "white";
}

//pressing the skip button will add the name of the skipped activity to an array, increase the index to change the picture, stop the timer, save the activity time, then load the next picture and scene. if someone is skipping the last activity,it will go to the challenges page. 

function skipActivity(){
		addtoSkipped();
		index ++;
		advanceGame();
}

function completeActivity(){
		addToCompleted();
		index ++;
		advanceGame();
}


function addToCompleted(){
	completedActs.push({name: saveActivities[index].name,
						time: activityTime});
	localStorage.setItem('completedActs', JSON.stringify(completedActs));
}

function addtoSkipped(){
	skippedActs.push(saveActivities[index].name);
	localStorage.setItem('skippedActs', JSON.stringify(skippedActs));
}


function loadIcon(){
		//if custom icon is true, load the custom icon. otherwise, load the icon associated with the activity 
		if (customIcon){
			iconPlaceholder.data = icons[5];
		} else {
			iconPlaceholder.data = icons[saveActivities[index].pic];
		}	
	iconName.innerHTML = saveActivities[index].name;
	iconName.style.fontSize = "2vw";
	iconName.style.fontWeight = "700";
}


//TIMER FUNCTIONS

//doing something every time 1 second passes 
function secondPassed() {
	timeRemainingAct.innerHTML = getDisplayTime(activityTime);
	//this takes away a second from the activity
	activityTime--;
}

function startTimer(){
	//take time property of the index activity and turn it into seconds 
	activityTime = (saveActivities[index].time * 60);
	//set the time the user wanted the activity to take in seconds 
	plannedTime = activityTime;
	//this runs the seconds passed function every 1 second 
	countdownTimer = setInterval('secondPassed()', 1000);
} 

function stopTimer(){
	clearInterval(countdownTimer);
}

//time that it should have been minus how far ahed or behind schedule it was 

//when the user clicks next, we want to store their time to see if they're ahead or behind schedule.
function saveTime(){
	timeDif.push(activityTime);
	timeTaken.push(plannedTime - activityTime);
	addTimeStorage();
}

function showSchedule(){
	var freeTimeSum = 0;
	for (i=0; i < timeDif.length; i++){
		freeTimeSum = freeTimeSum + timeDif[i];
	}
	if (freeTimeSum  < 0){
        scheduleUpdate.innerHTML = "";
        freeTime.innerHTML =  getDisplayTime(freeTimeSum) + " mins behind schedule!";
        freeTime.style.color = "#ff0000";
	} else if (freeTimeSum > 0) {
        scheduleUpdate.innerHTML = "";
        freeTime.innerHTML = "+ " + getDisplayTime(freeTimeSum) + " mins ahead of schedule!";
        freeTime.style.color = "#22A517";
	} else{
        freeTime.innerHTML = "You are right on track!";
    }

    	localStorage.setItem("freeTime", JSON.stringify(freeTime.innerHTML));
}

function getDisplayTime(timeSeconds){
	//turn it into minutes
    var minutes = Math.floor(Math.abs(timeSeconds)/60);
	//giving the seconds part 
    var remainingSeconds = Math.abs(timeSeconds) % 60;
	if (remainingSeconds == 0 && audioStatus){
		beepAlert.play();
	}
	if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    // display warning at x seconds
    if (timeSeconds < 0){
			warning.innerText = "YOU'RE LATE!";
			warning.style.color = "#ff0000";
			warningContainer.style.backgroundColor = "#FFFFE5";
    	} else if (timeSeconds <= 10) {
			warning.innerText = "HURRY UP!";
			warning.style.color = "#FF9C32";
			if (audioStatus){
				warningAlert.play();
			}
			warningContainer.style.backgroundColor = "#FFFFE5";
    	} else {
			warning.style.color = "#14275E";
			warning.innerText = "KEEP IT UP!";
			warningContainer.style.backgroundColor = "#FFFFE5";
    }
	if (timeSeconds < 0){
		timerContainer.style.backgroundColor = "black";
		return "-" + minutes + ":" + remainingSeconds;
	} else {
        return minutes + ":" + remainingSeconds;
	}
}

function animateProgress() {
	if (circle){
		circle.destroy();
	}
	timerContainer.style.backgroundColor = "#FFFFE5";
	circle = new ProgressBar.Circle('#progress', {
        color: '#FCB03C',
		strokeWidth: 6,
		duration: ((saveActivities[index].time) * 60000) +1000,
		trailWidth: 0.8,
       	easing: 'linear'
    });
	circle.animate(1);
}

function addTimeStorage(){
	localStorage.setItem("timeTaken", JSON.stringify(timeTaken));
}
