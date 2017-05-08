var saveActivities = localStorage.getItem("mySavedActivities");
saveActivities = JSON.parse(saveActivities);

//saveActivities is now an array of objects with names,times, and pics

console.log(saveActivities);

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


var icons = ["./assets/other/Icons/brushteeth.svg",
					"./assets/other/Icons/coffee.svg",
					"./assets/other/Icons/breakfast.svg",
					"./assets/other/Icons/clothes.svg",
					"./assets/other/Icons/lunch.svg"];

var iconPlaceholder = document.getElementById("iconPlaceholder");
var iconContainer = document.getElementById("iconContainer");
var iconName = document.getElementById("iconName");

//var tickAlert = document.getElementById("tickAlert");

loadScene();
loadIcon();

//this gets the current name of the activity 


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


//pressing the skip button will add the name of the skipped activity to an array, increase the index to change the picture, stop the timer, save the activity time, then load the next picture and scene. if someone is skipping the last activity,it will go to the challenges page. 


function skipActivity(){
	if (index == (saveActivities.length -1)) {
			window.location.href = "challenges.html";
	} else {
		addtoSkipped();
		index ++;
		stopTimer();
		console.log(activityTime);
		saveTime();
		loadPic();
		loadScene();
		loadIcon();
	}
}


function loadPic(){
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
	}
	
	

	
    
    console.log(saveActivities[index]);
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
			
			//gameScenes is an array of paths to the images
			//saveActivities is an array of objects 
			//index is whatever scene you're on 
			//pic is the associated svg scene for the object 
			//how does does the gameScene change based on the order of saveActivities?
			}
	
}

function loadIcon(){
			iconName.innerHTML = saveActivities[index].name;
			iconName.style.fontSize = "2vw";
	
			iconName.style.fontWeight = "700";
			iconPlaceholder.data = icons[saveActivities[index].pic];
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
		addToCompleted();
		index ++;
		stopTimer();
		saveTime();
		loadScene();
		loadIcon();
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


function addToCompleted(){
	completedActs.push(saveActivities[index].name);
	localStorage.setItem('completedActs', JSON.stringify(completedActs));
	console.log(completedActs);
}

function addtoSkipped(){
	skippedActs.push(saveActivities[index].name);
	localStorage.setItem('skippedActs', JSON.stringify(skippedActs));
	console.log(skippedActs);
}

