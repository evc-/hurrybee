//set tablet or mobile display based on screen size 

	if (screen.width < 576){
		
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
	

var saveActivities = localStorage.getItem("mySavedActivities");
saveActivities = JSON.parse(saveActivities);
console.log(saveActivities);

var index = 0;
var SVGplaceholder = document.getElementById("SVGplaceholder");

//this function loads the visual (by changing the svg data) to the "pic" value associated with the array object 

	function loadScene(){
		
		console.log(saveActivities.length); 
		console.log(index);
		
		//if all the activities are done, go to challenges page 
		
		if (index == saveActivities.length) {
			window.location.href = "challenges.html";
			
		//else if the pic is undefined, create a placeholder image 
			
		} else if (saveActivities[index].pic == "undefined"){
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

	loadScene();

//this function advances the game to the next scene by increasing the index by 1 and running the load scene function again

	function advanceGame(){
		index ++
		loadScene();
	}




var seconds = 60;
function secondPassed() {
    var minutes = Math.round((seconds - 30)/60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;  
    }
    document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;
    if (seconds == 0) {
        clearInterval(countdownTimer);
        document.getElementById('countdown').innerHTML = "Buzz Buzz";
    } else {
        seconds--;
    }
}
 
var countdownTimer = setInterval('secondPassed()', 1000);


var activityTimes = [saveActivities[index].time];
console.log(saveActivities[index]);




//so ... need to create a visual timer holder
//make it so that it starts with the saveActivitiies[index].time property 
//counts down 
//when it reaches zero, it counts into the negatives 
//if next is clicked, time value is saved 
//when array is finished, add up all new saved time properties 
//if that is less than the estimated time, show free time remaining 
//if its more than estimated time, bad result



