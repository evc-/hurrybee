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

		if (saveActivities[index].pic == "undefined"){
			SVGplaceholder.data = "customactivityBG.svg";
			var customActTitle = document.createElement("DIV");
			customActTitle.style.fontSize = "70pt";
			customActTitle.innerHTML = saveActivities[index].name;
			document.body.appendChild(customActTitle);
			
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
