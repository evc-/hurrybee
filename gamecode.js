//grab the array

var index = 0;
var timePassed = 0;

var saveActivities = localStorage.getItem("mySavedActivities");
saveActivities = JSON.parse(saveActivities);
console.log(saveActivities);

setInterval(function(){
	console.log(timePassed);
	console.log(parseInt(saveActivities[index].time),saveActivities[index].pic, saveActivities[index].name );
	
	if (parseInt(saveActivities[index].time) < timePassed){
		index ++;
		timePassed = 0;
	} else {
		timePassed ++;
	}
}, 1000);
