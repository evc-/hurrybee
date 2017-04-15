//game js 

		var simpleList = document.getElementById("simpleList");

//when the page loads, the list should be the user's custom list - if they have been there before, and have saved a custom list to local storage 

		var saveActivities = localStorage.getItem("mySavedActivities");		

//these are the arrays that handle the list 

		var activityArr = [];  //this is the array of activities as string form that is generated when the list isrearranged 
		var activityObjects = []; //this is the array of objects that have a name, time, and pic. the create, store, and get list functions all use it
		

//this is the list from the sortable library (https://github.com/RubaXa/Sortable)

		Sortable.create(simpleList, {
			onUpdate: function (evt) { 
			activityArr = this.toArray(); //generate array of strings when list is updated
			estimateTime(); //estimate time when list is updated 
		},
		
		filter: '.js-remove', //filter is for anything that should not be drag and dropped
							
		})
		

//this is for adding custom activities 
		
		function buttonAdd(){
			
			var customActName = document.getElementById("customActName");
			var customActTime = document.getElementById("customActTime");
			addActivity(customActName.value, customActTime.value);	//give the custom activity a name and a time value 	
		}

//this is for generating a single list item that gets added to the end of the list 
		
		function addActivity(name, time, pic){

			var newActivity= document.createElement("li"); //create list item
			newActivity.className = "list-group-item";
			newActivity.setAttribute('data-id' , name);  //give it a name 
			newActivity.id = name; //make the id the same as the name
			
			newActivity.style.marginTop = "20px";
			
			var dragHandle = document.createElement("span");
			dragHandle.className = "glyphicon glyphicon-resize-vertical grabbable";
			newActivity.appendChild(dragHandle);
			
			newActivity.innerHTML += name; //show the name in the list items inner html
			
			var activityLength = document.createElement("input"); //set the time for the activity 
			activityLength.setAttribute('type', 'number');
			activityLength.style.borderLeftStyle = "none";
			activityLength.style.borderRightStyle = "none";
			activityLength.style.borderTopStyle = "none";
			activityLength.min = 1;
			activityLength.max = 60;
			activityLength.value = time; //give it a time value 
			
			newActivity.dataset.pic = pic; //add the visual scene associated with the activity 
			
			newActivity.appendChild(activityLength); 
			
			var deleteButton = document.createElement("i"); //add an X and an ability to delete the item 
			deleteButton.className = "js-remove";
			deleteButton.style.textAlign = "right";
			deleteButton.onclick = function(){deleteMe(newActivity)};
			deleteButton.innerHTML = "  <span class='glyphicon glyphicon-remove'></span>"; 
			
			newActivity.appendChild(deleteButton);
			
			
			
			
			simpleList.appendChild(newActivity); //append the new activity to the list 
			
		}

//this function is used to delete an item off the list 

		function deleteMe(item){
			item.parentNode.removeChild(item);
		}
		
	
//this function is for adding up all the time values and getting a sum. it gets time values from activityArr, which is currently only generated when the list is updated 
		
		function estimateTime(){
			var timeSum = 0;
			
			for (i=0; i < activityArr.length; i ++){  
				var timeValue = document.getElementById(activityArr[i]).childNodes[2].value;
				timeSum = timeSum + parseInt(timeValue); //need parseInt otherwise timevalue is a string 
			}
			
			document.getElementById("timeEstimate").innerHTML = timeSum;
		}

//this array is all the default objects/activities.
//todo: add associated pics 

	var defaultActivities = [{"name":"Wash Face and Brush Teeth ","time":"5", pic:"washtest.svg"},
							 {"name":"Make Coffee ","time":"15", pic:"coffeetest.svg"},
							 {"name":"Eat Breakfast ","time":"15", pic:"breakfasttest.svg"},
							 {"name":"Get Dressed ","time":"15", pic:"dressedtest.svg"},
							 {"name":"Pack Lunch and Bag ","time":"10", pic:"packtest.svg"}];

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

			for (i=0; i < activityArr.length; i ++){
				
				activityObjects[i] = {name: activityArr[i], time: document.getElementById(activityArr[i]).childNodes[1].value, pic:document.getElementById(activityArr[i]).dataset.pic};
					
			}
			console.log(activityObjects);
		}



//this function stringifies the new array of objects, and saves them in the local storage as "mySavedActivities" 

		function storeList(){
			
			var saveActivities = JSON.stringify(activityObjects);
			console.log(saveActivities);
			localStorage.setItem("mySavedActivities", saveActivities);
			
		}

//when you click the start game button, activityArr (array of strings) --> acitvityObjects (array of objects), then gets saved in local storage 

	var startGame = document.getElementById("startGame");

		startGame.addEventListener("click", function(){
			createList();
			storeList();
			window.location.href = "game.html";
		})
		
	
//this function checks if there is a custom list saved in the local storage. if there is a custom list, the list should be generated with the addActivity function. if there is no custom list stored, a default list should be generated. 
		
		
var welcomeMsg = document.getElementById("welcomeMsg");

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



	var testGetList = document.getElementById("testGetList");
		getList();
		testGetList.addEventListener("click", function(){
			getList();
			console.log(activityObjects);
		})
		
	var testClearStorage = document.getElementById("testClearStorage");

		testClearStorage.addEventListener("click", function(){
			saveActivities = null;
			localStorage.removeItem("mySavedActivities");
			console.log(saveActivities);
	})
		
	