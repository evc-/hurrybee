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
		
		function addActivity(name, time){

			var customActivity= document.createElement("li");
			customActivity.className = "list-group-item";
			customActivity.setAttribute('data-id' , name); 
			customActivity.id = name;
			customActivity.innerHTML = name;
			
		
			var customActTimeValue = document.createElement("input");
			customActTimeValue.setAttribute('type', 'number');
			customActTimeValue.value = time;
			
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

		addActivity("Wash Face and Brush Teeth", 5);
		addActivity("Eat Breakfast", 15);
		addActivity("Get Dressed", 15);
		addActivity("Make Coffee", 15);
		addActivity("Pack Lunch and Bag", 10);

		
		
	

		//function startRoutine(){
			//get the list
				//function createList
			//store the list into local storage
				//function storeList
			//go to the start page
				//link to game page
		//}
	

		
		function createList(){
			
			
			
			for (i=0; i < activityArr.length; i ++){
				
				activityObjects[i] = {name: activityArr[i], time: document.getElementById(activityArr[i]).childNodes[1].value};
				
				console.log(activityObjects);
					
			}
		}
		

//		
//		then a function storeList(list) {
//\\stores the list to local storage
//}
// 
// then a function getList(){
//returns list from local storage
//}
//yeah, let me know if you have any issues or questions.


