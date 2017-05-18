//resultsjs

var completedActs = JSON.parse(localStorage.getItem("completedActs"));
var skippedActs = JSON.parse(localStorage.getItem("skippedActs"));
var totalTime = JSON.parse(localStorage.getItem("timeTaken"));
var clearStorage = document.getElementById("clearStorage");
var skippedActsResult = document.getElementById("skippedActsResult");
var completedActsResult = document.getElementById("completedActsResult");
var challengesResult = document.getElementById("challengesResult");
var challengesCompleted = localStorage.getItem("myChallenges");
var totalTimeResult = document.getElementById("totalTimeResult");

var unlocked = document.getElementById("unlocked"),
    unlockedProgress = document.getElementById("unlockedProgress");

var summedTime = totalTime.reduce(function(acc, val) {
  return acc + val;
}, 0);

showCompleted();
showChallenges();
showTime();

if (skippedActs != null){
	showSkipped();
}

clearStorage.addEventListener("click", function(){
	localStorage.clear();
})

function showCompleted(){
	console.log(completedActs);
	for (i=0; i < completedActs.length; i++){
		var completedNames = document.createElement("p");
		completedNames.style.backgroundColor = "#FFF1A5";
		completedNames.style.fontSize="13pt";
		completedNames.style.padding ="10px";
		completedNames.style.borderRadius = "6px";
		
		if (completedActs[i].time > 0){
			completedNames.innerHTML = completedActs[i].name + " <br> <span style='font-style:italic;'>Ahead of schedule by </span> " +  overUnderTime(completedActs[i].time) + " <span style='font-style:italic;'>minutes </span>";
		} else {
			completedNames.innerHTML = completedActs[i].name + " <br> <span style='font-style:italic;'>Behind schedule by </span>" +  overUnderTime(completedActs[i].time) + " <span style='font-style:italic;'>minutes </span>";
		}
		
		if (completedActs[i].time > 0){
			var underIcon = document.createElement("span");
			underIcon.className = "glyphicon glyphicon-check";
			underIcon.style.float = "right";
			completedNames.appendChild(underIcon);
		} else {
			var lateIcon = document.createElement("span");
			lateIcon.className = "glyphicon glyphicon-alert";
			lateIcon.style.float = "right";
			completedNames.appendChild(lateIcon)
		}
		
		completedActsResult.appendChild(completedNames);
	}
}


function overUnderTime(time){
	var minutes = Math.floor(Math.abs(time)/60);
    var seconds = Math.abs(time) % 60;
	return minutes + ":" + seconds + "       ";
};

function showSkipped(){
	for (i=0; i < skippedActs.length; i++){
		var skippedNames = document.createElement("p");
		skippedNames.style.backgroundColor = "#BCB69F";
		skippedNames.style.fontSize="13pt";
		skippedNames.style.padding ="10px";
		skippedNames.style.borderRadius = "6px";
		skippedNames.innerHTML = skippedActs[i];
		skippedActsResult.appendChild(skippedNames);
	}
}

unlocked.innerHTML = challengeArr.length + "/7 unlocked";

function showChallenges(){if (challengesCompleted){
    challengeArr = JSON.parse(challengesCompleted);
    for (var i = 0; i <= challengeArr.length - 1; i++){
		var challengeNames = document.createElement("p");
		challengeNames.style.backgroundColor = "#FFDB58";
		challengeNames.style.fontSize="13pt";
		challengeNames.style.padding ="10px";
		challengeNames.style.borderRadius = "6px";
		challengeNames.innerHTML = challengeArr[i];
		challengesResult.appendChild(challengeNames);
        if (challengeArr[i].type == 0){
            cExercise.style.display = "none";
            document.getElementById("c1-complete").style.display = "block";
        	}   
    	}
	}					 
}

function showTime(){
	var minutes = Math.floor(Math.abs(summedTime)/60);
    var seconds = Math.abs(summedTime) % 60;
	totalTimeResult.innerHTML = minutes + " minutes and " + seconds + " seconds";
	totalTimeResult.style.padding = "10px";
	totalTimeResult.style.marginLeft= "20px";
	totalTimeResult.style.borderRadius = "6px";
}



// update the progress bar according to completed challenges
unlockedProgress.value = challengeArr.length;