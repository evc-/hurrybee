console.log(localStorage.myChallenges);

var modal = document.getElementById("myModal"),
    modalContent = document.getElementById("modal-content"),
    modalText = document.getElementById("modal-text"),
    modalIcon = document.getElementById("modal-icon");

var curClick; //to identify selected challenge

var cExercise = document.getElementById("c1"),
    cNews = document.getElementById("c2"),
    cWater = document.getElementById("c3"),
    cVitamin = document.getElementById("c4"),
    cMeditate = document.getElementById("c5"),
    cJournal = document.getElementById("c6"),
    cBed = document.getElementById("c7");

var exitBtn = document.getElementById("exit"),
    completeBtn = document.getElementById("completeBut");

var challengeArr = [];

var challengeObj = {
    type: ""
}

var data = localStorage.getItem("myChallenges");

cExercise.addEventListener("click", function(){
    curClick = "exercise";
    console.log(curClick);
    
    modal.style.display = "block";
    
    if (curClick == "exercise"){
        modalIcon.innerHTML = "";
        
        var nImg = document.createElement("img");
        nImg.src = "assets/challenges/exercise.svg";
        modalIcon.appendChild(nImg);
        
        modalText.innerHTML = "Do a yoga sequence, a few pushups, or jumping jacks! Exercise helps you stay focused through your day.";
    }
    
});

cNews.addEventListener("click", function(){
    curClick = "news";
    console.log(curClick);
    modal.style.display = "block";
    
    if (curClick == "news"){
        modalIcon.innerHTML = "";
        
        var nImg = document.createElement("img");
        nImg.src = "assets/challenges/news.svg";
        modalIcon.appendChild(nImg);
                    
        modalText.innerHTML = "Read one article about a topic you've been meaning to learn more about!";
    }

});

cWater.addEventListener("click", function(){
    curClick = "water";
    console.log(curClick);
    modal.style.display = "block";
    
    if (curClick == "water"){
        modalIcon.innerHTML = "";
        
        var nImg = document.createElement("img");
        nImg.src = "assets/challenges/water.svg";
        modalIcon.appendChild(nImg);
                    
        modalText.innerHTML = "Drink more water! It helps you feel more alert, rehydrates your body, and kick-starts your metabolism.";
    }

});

cVitamin.addEventListener("click", function(){
    curClick = "vitamin";
    console.log(curClick);
    modal.style.display = "block";
    
    if (curClick == "vitamin"){
        modalIcon.innerHTML = "";
        
        var nImg = document.createElement("img");
        nImg.src = "assets/challenges/vitamins.svg";
        modalIcon.appendChild(nImg);
               
        modalText.innerHTML = "Take a vitamin to increase your health! Vitamin C is known to reduce certain cancers and diseases. Vitamin D increases the calcium in your body!";
    }

});

cMeditate.addEventListener("click", function(){
    curClick = "meditate";
    console.log(curClick);
    modal.style.display = "block";
    
    if (curClick == "meditate"){
        modalIcon.innerHTML = "";
        
        var nImg = document.createElement("img");
        nImg.src = "assets/challenges/meditate.svg";
        modalIcon.appendChild(nImg);
                  
        modalText.innerHTML = "Meditate! Devote yourself to a spiritual practice such as meditation or a prayer to prepare yourself for the rush of the day.";
    }

});

cJournal.addEventListener("click", function(){
    curClick = "journal";
    console.log(curClick);
    modal.style.display = "block";
    
    if (curClick == "journal"){
        modalIcon.innerHTML = "";
        
        var nImg = document.createElement("img");
        nImg.src = "assets/challenges/journal.svg";
        modalIcon.appendChild(nImg);
                    
        modalText.innerHTML = "Write down things you're grateful for in a journal! Expressing gratitude is a great way to get a good perspective before starting your fay. It only takes a few minutes, but can make a real difference.";
    }

});

cBed.addEventListener("click", function(){
    curClick = "bed";
    console.log(curClick);
    modal.style.display = "block";
    
    if (curClick == "bed"){
        modalIcon.innerHTML = "";
        
        var nImg = document.createElement("img");
        nImg.src = "assets/challenges/bed.svg";
        modalIcon.appendChild(nImg);
                    
        modalText.innerHTML = "Make your bed! This one minute habit can make you happier and more productive all day long.";
    }

});

exitBtn.addEventListener("click", function(){
    modal.style.display = "none";
});


completeBtn.addEventListener("click", function(){
    modal.style.display = "none";
    
    if (curClick == "exercise"){
        // push completed challenge to array
        challengeArr.push("exercise");
        console.log(challengeArr);
        
        challengeObj.type = 0;
        
        // change cExercise icon to different colour
        cExercise.style.display = "none";
        document.getElementById("c1-complete").style.display = "block";
        
        // save to localStorage
        var txt = JSON.stringify(challengeArr);
        localStorage.setItem("myChallenges", txt);
        data = localStorage.getItem("myChallenges");
        
    } 
    
    else if (curClick == "news"){
        // push completed challenge to array
        challengeArr.push("news");
        console.log(challengeArr);
        
        // change cNews icon to different colour
        cNews.style.display = "none";
        document.getElementById("c2-complete").style.display = "block";
        
        // save to localStorage
        var txt = JSON.stringify(challengeArr);
        localStorage.setItem("myChallenges", txt);
        data = localStorage.getItem("myChallenges");
        
    }
    
    else if (curClick == "water"){
        // push completed challenge to array
        challengeArr.push("water");
        console.log(challengeArr);
        
        // change cWater icon to different colour
        cWater.style.display = "none";
        document.getElementById("c3-complete").style.display = "block";
        
        // save to localStorage
        var txt = JSON.stringify(challengeArr);
        localStorage.setItem("myChallenges", txt);
        data = localStorage.getItem("myChallenges");
        
    }
    
    else if (curClick == "vitamin"){
        // push completed challenge to array
        challengeArr.push("vitamin");
        console.log(challengeArr);
        
        // change cVitamin icon to different colour
        cVitamin.style.display = "none";
        document.getElementById("c4-complete").style.display = "block";
        
        // save to localStorage
        var txt = JSON.stringify(challengeArr);
        localStorage.setItem("myChallenges", txt);
        data = localStorage.getItem("myChallenges");
        
    }
    
    else if (curClick == "meditate"){
        // push completed challenge to array
        challengeArr.push("meditate");
        console.log(challengeArr);
        
        // change cJournal icon to different colour
        cMeditate.style.display = "none";
        document.getElementById("c5-complete").style.display = "block";
        
        // save to localStorage
        var txt = JSON.stringify(challengeArr);
        localStorage.setItem("myChallenges", txt);
        data = localStorage.getItem("myChallenges");

    }
    
    else if (curClick == "journal"){
        // push completed challenge to array
        challengeArr.push("journal");
        console.log(challengeArr);
        
        // change cJournal icon to different colour
        cJournal.style.display = "none";
        document.getElementById("c6-complete").style.display = "block";
        
        // save to localStorage
        var txt = JSON.stringify(challengeArr);
        localStorage.setItem("myChallenges", txt);
        data = localStorage.getItem("myChallenges");
        
    }
    
    else if (curClick == "bed"){
        // push completed challenge to array
        challengeArr.push("bed");
        console.log(challengeArr);
        
        // change cBed icon to different colour
        cBed.style.display = "none";
        document.getElementById("c7-complete").style.display = "block";
        
        // save to localStorage
        var txt = JSON.stringify(challengeArr);
        localStorage.setItem("myChallenges", txt);
        data = localStorage.getItem("myChallenges");
        
    }
});

// display completed challenge icons

if (data){
    challengeArr = JSON.parse(data);
    
    for (var i = 0; i <= challengeArr.length - 1; i++){
            
        if (challengeArr[i].type == 0){
            cExercise.style.display = "none";
            document.getElementById("c1-complete").style.display = "block";
        }
        
    }
    
}

localStorage.clear();