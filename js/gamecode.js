var saveActivities = localStorage.getItem("mySavedActivities");
saveActivities = JSON.parse(saveActivities);

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

//<<<<<<< HEAD:js/gamecode.js
var beepAlert = document.getElementById("beepAlert");

//var tickAlert = document.getElementById("tickAlert");
//>>>>>>> origin/master:gamecode.js

loadScene();

checkbox.addEventListener("click",function(){
	checkmarkFill.style.fill = "#14275E";
	setTimeout(function(){ 
		advanceGame() 
	}, 500);
})

checkmarkFill.addEventListener("click",function(){
	checkmarkFill.style.fill = "#14275E";
	setTimeout(function(){ 
		advanceGame() 
	}, 500);
})

skipSVG.addEventListener("click",function(){
	skipActivity();
})


function skipActivity(){
	index = index +2;
	stopTimer();
	saveTime();
	loadScene();
}

function loadPic(){
	console.log(window.innerWidth);
	
	//set tablet or mobile display based on screen size 

	if (window.innerWidth < 576){
		
		var gameScenes = ["./assets/game/Mobile/teethbrush_mobile.svg",
					"./assets/game/Mobile/coffee_mobile.svg",
					"./assets/game/Mobile/breakfast_mobile.svg",
					"./assets/game/Mobile/gettingdressed_mobile.svg",
					"./assets/game/Mobile/lunch_mobile.svg"];
        
        warning.style.fontSize = "5vw";
		freeTime.style.fontSize = "5vw";
//        warningContainer.style.height = "50px";
		
	} else {
		var gameScenes = ["./assets/game/Tablet/teethbrush_tablet.svg",
					"./assets/game/Tablet/coffee_tablet.svg",
					"./assets/game/Tablet/breakfast_Tablet.svg",
					"./assets/game/Tablet/gettingdressed_Tablet.svg",
					"./assets/game/Tablet/lunch_Tablet.svg"];
        
        warning.style.fontSize = "3vw";
		freeTime.style.fontSize = "3vw";
//        warningContainer.style.height = "100px";
	}
    
	if (saveActivities[index].pic == "undefined"){
		if (window.innerWidth < 576){
			SVGplaceholder.data = "./assets/game/Mobile/customactivity_mobile.svg";
			var customActTitle = document.createElement("DIV");
			customActTitle.id = "customActTitle";
			customActTitle.innerHTML = saveActivities[index].name;
			document.body.appendChild(customActTitle);
		} else {
			SVGplaceholder.data = "./assets/game/Tablet/customactivity_tablet.svg";
			var customActTitle = document.createElement("DIV");
			customActTitle.id = "customActTitle";
			customActTitle.innerHTML = saveActivities[index].name;
			document.body.appendChild(customActTitle);
		}
			
		//if both of those are untrue, show the pic associated with the activity 
			
		} else {
			var customActTitle = document.getElementById("customActTitle");
			if (customActTitle){
				customActTitle.parentElement.removeChild(customActTitle);	
			}
			SVGplaceholder.data = gameScenes[saveActivities[index].pic];
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
            //displayWarning();
		} 
		
		checkmarkFill.style.fill = "white";
		
	}


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

}

function getDisplayTime(timeSeconds){
		//turn it into minutes
    var minutes = Math.floor(Math.abs(timeSeconds)/60);
	//giving the seconds part 
    var remainingSeconds = Math.abs(timeSeconds) % 60;
	
	if (remainingSeconds == 0){
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
        warningAlert.play();
        warningContainer.style.backgroundColor = "#FFFFE5";
        
    } else {
		warning.style.color = "#14275E";
        warning.innerText = "KEEP IT UP!";
        warningContainer.style.backgroundColor = "#FFFFE5";
    }
    
	if (timeSeconds < 0){
		timerContainer.style.backgroundColor = "black";
		return "-" + minutes + ":" + remainingSeconds
	} else {
        
        return minutes + ":" + remainingSeconds
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

/*function displayWarning(timeSeconds){
    var minutes = Math.floor(Math.abs(timeSeconds)/60);
    var remainingSeconds = Math.abs(timeSeconds) % 60;

    
    if (timeSeconds < 10){
        warning.innerText = "HURRY UP!";
        warning.style.backgroundColor = "#FFFFE5";
    } 
    
    if (timeSeconds < 0){
        warning.innerText = "You're late!";
        warning.fontSize = "20pt";
        warning.style.color = "#ff0000";
        warning.style.backgroundColor = "#FFFFE5";
    } 
    
    else {
        warning.innerText = "";
        warning.style.backgroundColor = "none";
    }
    
}*/


