//resultsjs

var completedActs = JSON.parse(localStorage.getItem("completedActs"));
var skippedActs = JSON.parse(localStorage.getItem("skippedActs"));
var clearStorage = document.getElementById("clearStorage");

var skippedActsResult = document.getElementById("skippedActsResult");
var completedActsResult = document.getElementById("completedActsResult");
var challengesResult = document.getElementById("challengesResult");
var challengesCompleted = localStorage.getItem("myChallenges");


showCompleted();
showChallenges();

if (skippedActs != null){
	showSkipped();
}

clearStorage.addEventListener("click", function(){
	localStorage.clear();
})

function showCompleted(){
	for (i=0; i < completedActs.length; i++){
		var completedNames = document.createElement("p");
		completedNames.style.backgroundColor = "#FFF1A5";
		completedNames.style.fontSize="13pt";
		completedNames.style.padding ="10px";
		completedNames.style.borderRadius = "6px";
		completedNames.innerHTML = completedActs[i];
		completedActsResult.appendChild(completedNames);
	}
}

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

function showChallenges(){if (challengesCompleted){
	console.log(challengesCompleted);
    challengeArr = JSON.parse(challengesCompleted);
    
    for (var i = 0; i <= challengeArr.length - 1; i++){
		
		var challengeNames = document.createElement("p");
		challengeNames.innerHTML = challengeArr[i];
		challengesResult.appendChild(challengeNames);
            
        if (challengeArr[i].type == 0){
            cExercise.style.display = "none";
            document.getElementById("c1-complete").style.display = "block";
        }
        
    }
    
}
						 
}