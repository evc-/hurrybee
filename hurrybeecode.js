//game js 

		var simpleList = document.getElementById("simpleList");
		
		function deleteMe(item){
			item.parentNode.removeChild(item);
		}
		

		var activityArr = [];
		var activityObjects = [];
		
		console.log(activityArr);
		

		Sortable.create(simpleList, {
//generate array when list is updated/item is dropped
			onUpdate: function (evt) {
			activityArr = this.toArray();
			console.log(activityArr);
			estimateTime();
		},
		
//filter is for anything that should not be drag and dropped
		filter: '.js-remove',
							
		})
		
		function buttonAdd(){
			
			var customActName = document.getElementById("customActName");
			var customActTime = document.getElementById("customActTime");
			addActivity(customActName.value, customActTime.value);
			console.log(activityArr);
			
			
		}
		
		function addActivity(name, time, pic){

			var customActivity= document.createElement("li");
			customActivity.className = "list-group-item";
			customActivity.setAttribute('data-id' , name); 
			customActivity.id = name;
			customActivity.innerHTML = name;
			
			
		
			var customActTimeValue = document.createElement("input");
			customActTimeValue.setAttribute('type', 'number');
			customActTimeValue.value = time;
			customActTimeValue.dataset.pic = pic;
			
			customActivity.appendChild(customActTimeValue);
			
			var customActDelete = document.createElement("i");
			customActDelete.className = "js-remove";
			customActDelete.onclick = function(){deleteMe(customActivity)};
			customActDelete.innerHTML = "✖";
			
			customActivity.appendChild(customActDelete);
			
			simpleList.appendChild(customActivity);
			
		}
		
		
		
		function estimateTime(){
			var timeSum = 0;
			
			for (i=0; i < activityArr.length; i ++){
				var timeValue = document.getElementById(activityArr[i]).childNodes[1].value;
				console.log(document.getElementById(activityArr[i]).childNodes[1].value);
				timeSum = timeSum + parseInt(timeValue);
				
			}
			
			document.getElementById("timeEstimate").innerHTML = timeSum;
		}

		function fillDefault(){
			
			addActivity("Wash Face and Brush Teeth", 5, "1.svg");
			addActivity("Eat Breakfast", 15, "2.svg");
			addActivity("Get Dressed", 15, "3.svg");
			addActivity("Make Coffee", 15, "4.svg");
			addActivity("Pack Lunch and Bag", 10, "5.svg");
		}

//		function fillCustom(){
//			
//		}


		
		function createList(){

			for (i=0; i < activityArr.length; i ++){
				
				activityObjects[i] = {name: activityArr[i], time: document.getElementById(activityArr[i]).childNodes[1].value, pic:document.getElementById(activityArr[i]).childNodes[1].dataset.pic};
				
				console.log(activityObjects);
					
			}
		}

		function storeList(){
			
			var saveActivities = JSON.stringify(activityObjects);
			console.log(saveActivities);
			localStorage.setItem("mySavedActivities", saveActivities);
			
		}


	var startGame = document.getElementById("startGame");

		startGame.addEventListener("click", function(){
			createList();
			storeList();
		})
		
	
		
		//////////////////////

		var saveActivities = localStorage.getItem("mySavedActivities");


		function getList(){
			console.log(saveActivities);
			if (saveActivities != null){
				activityObjects = JSON.parse(saveActivities);
				return activityObjects;	
			}
			
			
		if (saveActivities == null){
			fillDefault();
			console.log(fillDefault);
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
		
		

	
		
		

		
		
		
	