//game js 

		var simpleList = document.getElementById("simpleList");

//when the page loads, the list should be the user's custom list - if they have been there before, and have saved a custom list to local storage 

		var saveActivities = localStorage.getItem("mySavedActivities");		

//these are the arrays that handle the list 

		var activityArr = [];  //this is the array of activities as string form that is generated when the list is rearranged 
		console.log(activityArr);

		var activityObjects = []; //this is the array of objects that have a name, time, and pic. the create, store, and get list functions all use it
		
		var timeSum = 0;

		var resetList = document.getElementById("resetList");
		var testClearStorage = document.getElementById("testClearStorage");
		var testGetList = document.getElementById("testGetList");
		var welcomeMsg = document.getElementById("welcomeMsg");
		var startGame = document.getElementById("startGame");

		var audioSwitch = document.getElementById("audioSwitch");
		
		var audioStatus = JSON.parse(localStorage.getItem("audioSwitch"));
		
		console.log(audioStatus);
		if (audioStatus == undefined){
			audioStatus = false;
		}

		audioSwitch.checked = audioStatus;

//this is the list from the sortable library (https://github.com/RubaXa/Sortable)

var myList = Sortable.create(simpleList, {
			onUpdate: function (evt) { 
			activityArr = this.toArray(); //generate array of strings when list is updated
			estimateTime(); //estimate time when list is updated 
		},
		
		filter: '.js-remove', //filter is for anything that should not be drag and dropped
							
		});

setTimeout(function(){
	activityArr = myList.toArray(); //generate array of strings when list is updated
	console.log(activityArr);
estimateTime(); //estimate time when list is updated 

}, 100);


		

//this is for adding custom activities 
		
		function buttonAdd(){
			
			var customActName = document.getElementById("customActName");
			var customActTime = document.getElementById("customActTime");
			addActivity(customActName.value, customActTime.value);	//give the custom activity a name and a time value 	
			
			setTimeout(function(){
				activityArr = myList.toArray(); //generate array of strings when list is updated
				estimateTime(); //estimate time when list is updated 
			}, 100);
			
		}

//this is for generating a single list item that gets added to the end of the list 
		
		function addActivity(name, time, pic){

			var newActivity= document.createElement("li"); //create list item
			newActivity.className = "list-group-item";
			newActivity.setAttribute('data-id' , name);  //give it a name 
			newActivity.id = name; //make the id the same as the name
			
			newActivity.style.marginTop = "5px";
			
			var dragHandle = document.createElement("span");
			dragHandle.className = "glyphicon glyphicon-resize-vertical grabbable";
			newActivity.appendChild(dragHandle);
			
			newActivity.innerHTML += name + " for "; //show the name in the list items inner html
			
			var activityLength = document.createElement("input"); //set the time for the activity 
			activityLength.setAttribute('type', 'number');
			activityLength.className = "activityLength";
			activityLength.addEventListener("change", function(){
				activityArr = myList.toArray();
				estimateTime();
			});
			activityLength.style.borderLeftStyle = "none";
			activityLength.style.borderRightStyle = "none";
			activityLength.style.borderTopStyle = "none";
			activityLength.min = 1;
			activityLength.max = 60;
			activityLength.value = time; //give it a time value 
			
			newActivity.dataset.pic = pic; //add the visual scene associated with the activity 
			
			newActivity.appendChild(activityLength);
			
			minutesTxt = document.createElement("span");
			minutesTxt.innerHTML ="  minutes";
			newActivity.appendChild(minutesTxt);
			
			var deleteButton = document.createElement("i"); //add an X and an ability to delete the item 
			deleteButton.className = "js-remove";
			deleteButton.className = "deleteButton";
			deleteButton.style.textAlign = "right";
			deleteButton.onclick = function(){deleteMe(newActivity)};
			deleteButton.innerHTML = "  <span class='glyphicon glyphicon-remove'></span>"; 
			
			newActivity.appendChild(deleteButton);
			
//			var newIcon = document.createElement("SVG");
//			newIcon.innerHTML = icon;
//			newActivity.appendChild(newIcon);

			
			simpleList.appendChild(newActivity); //append the new activity to the list 
					
		}

//this function is used to delete an item off the list 

		function deleteMe(item){
			item.parentNode.removeChild(item);
			activityArr = myList.toArray(); //generate array of strings when list is updated
			estimateTime(); //estimate time when list is updated 
			console.log(activityArr);
		}
		
	
//this function is for adding up all the time values and getting a sum. it gets time values from activityArr, which is currently only generated when the list is updated 
		
		function estimateTime(){
			timeSum= 0;
			for (i=0; i < activityArr.length; i ++){  
				var timeValue = document.getElementById(activityArr[i]).childNodes[2].value;
				timeSum = timeSum + parseInt(timeValue); //need parseInt otherwise timevalue is a string 
			}
			
			document.getElementById("timeEstimate").innerHTML = timeSum;
			getFinishTime();
			
			console.log(activityArr);
		}

//this array is all the default objects/activities.

//pic is a number so that you can change from mobile to tablet when you load the page 

		var defaultActivities = [{"name":"Wash Face and Brush Teeth ","time":"5", pic:0, icon:0},
							 {"name":"Make Coffee ","time":"15", pic:1, icon:1},
							 {"name":"Eat Breakfast ","time":"15", pic:2, icon:2},
							 {"name":"Get Dressed ","time":"15", pic:3, icon:3},
							 {"name":"Pack Lunch and Bag ","time":"10", pic:4, icon:4}];
	 

//this loops over the default activities and uses the "add activity" function to generate the visual list 

	function fillDefault(){
			for (i=0; i < defaultActivities.length; i ++){
				addActivity(defaultActivities[i].name, defaultActivities[i].time, defaultActivities[i].pic);
			}
			
		}

//this loops over the saved activity objects and does the same as above - uses the "add activity" function to generate the list 
	function fillCustom(){
		for(i=0; i < activityObjects.length; i ++){
			addActivity(activityObjects[i].name, activityObjects[i].time, activityObjects[i].pic);
		}
			
	}


//this function loops over activityArr, an array of strings, and generates activityObjects, an array of objects. this is not visual - it is preparing a list that can be stored and used 

		function createList(){
			activityObjects =[];
			for (i=0; i < activityArr.length; i ++){
				
				activityObjects[i] = {name: activityArr[i], time: document.getElementById(activityArr[i]).childNodes[2].value, pic:document.getElementById(activityArr[i]).dataset.pic};
					
			}
			
		}



//this function stringifies the new array of objects, and saves them in the local storage as "mySavedActivities" 

		function storeList(){
			
			var saveActivities = JSON.stringify(activityObjects);
			console.log(saveActivities);
			localStorage.setItem("mySavedActivities", saveActivities);
			
		}
		

//when you click the start game button, activityArr (array of strings) --> acitvityObjects (array of objects), then gets saved in local storage 

		startGame.addEventListener("click", function(){
			createList();
			storeList();
			window.location.href = "game.html";
		})
		
	
//this function checks if there is a custom list saved in the local storage. if there is a custom list, the list should be generated with the addActivity function. if there is no custom list stored, a default list should be generated. 
		
	function getList(){
			
			if (saveActivities == null){
				fillDefault();
				welcomeMsg.innerHTML = "Here's what we think might make for a good morning - but feel free to change it up! <br>"
				
			} else {
				activityObjects = JSON.parse(saveActivities);
				fillCustom();
				console.log(activityObjects);
				welcomeMsg.innerHTML = "Welcome back! Here's your custom morning set up. How's it look?<br>"
				
		}
			
		}

	
	function clearList(){
		$( document ).ready(function() {
   			$("#simpleList").empty();
		})
	}

	getList();
		
	resetList.addEventListener("click", function(){
			clearList();
			fillDefault();	
	})
		
		
		
	function getFinishTime(){
		
		//finish time
	var myDate = new Date();

	var currentMins = myDate.getMinutes();
	var currentHours = myDate.getHours();

	var currentTime = document.getElementById("currentTime");
	var timeFinish = document.getElementById("timeFinish");

	currentHours = currentHours % 12;
		
	if (currentMins <10){
		currentMins = "0" + currentMins;
	}
		
	currentTime.innerHTML = currentHours + ":" + currentMins;
		
	var finishMins = parseInt(currentMins) + timeSum;
	var finishHours = currentHours + Math.floor(finishMins/60);
		
	finishMins = finishMins % 60;
		
		if (finishHours > 12) {
			finishHours = finishHours % 12;
		}
		
		if (finishMins < 10){
		finishMins = "0" + finishMins;
		}
		
		timeFinish.innerHTML = finishHours + ":" + finishMins;
		
	}

audioSwitch.addEventListener("click", function(){
	if (audioStatus){
		audioSwitch.value = "checked";
		audioStatus = false;
		console.log(audioStatus);
	} else{
		audioSwitch.value = "unchecked";
		audioStatus = true;
	}
	
	localStorage.setItem("audioSwitch", JSON.stringify(audioStatus));
	
})
