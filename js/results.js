//resultsjs

var completedActs = JSON.parse(localStorage.getItem("completedActs"));
var skippedActs = JSON.parse(localStorage.getItem("skippedActs"));
var clearStorage = document.getElementById("clearStorage");

showCompleted();
showSkipped();

clearStorage.addEventListener("click", function(){
	localStorage.clear();
})

function showCompleted(){
	for (i=0; i < completedActs.length; i++){
		var completedNames = document.createElement("p");
		completedNames.innerHTML = completedActs[i];
		document.body.appendChild(completedNames);
	}
}

function showSkipped(){
	for (i=0; i < skippedActs.length; i++){
		var skippedNames = document.createElement("p");
		skippedNames.innerHTML = skippedActs[i];
		document.body.appendChild(skippedNames);
	}
}