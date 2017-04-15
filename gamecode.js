//var timePassed = 0;

//setInterval(function(){
//	console.log(timePassed);
//	console.log(parseInt(saveActivities[index].time), saveActivities[index].pic, saveActivities[index].name );
//	
//	if (parseInt(saveActivities[index].time) < timePassed){
//		index ++;
//		timePassed = 0;
//	} else {
//		timePassed ++;
//	}
//}, 1000);


var saveActivities = localStorage.getItem("mySavedActivities");
saveActivities = JSON.parse(saveActivities);
console.log(saveActivities);

var index = 0;
var SVGplaceholder = document.getElementById("SVGplaceholder");

//this function loads the visual (by changing the svg data) to the "pic" value associated with the array object 

	function loadScene(){

		if (saveActivities[index].pic == "undefined"){
			SVGplaceholder.data = "customactivityBG.svg";
			var customActTitle = document.createElement("DIV");
			customActTitle.style.fontSize = "70pt";
			customActTitle.innerHTML = saveActivities[index].name;
			document.body.appendChild(customActTitle);
			
		} else {
			SVGplaceholder.data = saveActivities[index].pic;
		}
	}

	loadScene();

//this function advances the game to the next scene by increasing the index by 1 and running the load scene function again 
	function advanceGame(){
		index ++
		loadScene();
	}
