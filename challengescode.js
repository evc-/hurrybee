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

cExercise.addEventListener("click", function(){
    curClick = "exercise";
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
    modal.style.display = "block";
    
    if (curClick == "water"){
        modalIcon.innerHTML = "";
        
      /*  var nImg = document.createElement("img");
        nImg.src = "assets/challenges/news.svg";
        modalIcon.appendChild(nImg);
       */             
        modalText.innerHTML = "Drink more water! It helps you feel more alert, rehydrates your body, and kick-start your metabolism.";
    }

});

cVitamin.addEventListener("click", function(){
    curClick = "vitamin";
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
    modal.style.display = "block";
    
    if (curClick == "meditate"){
        modalIcon.innerHTML = "";
        
      /*  var nImg = document.createElement("img");
        nImg.src = "assets/challenges/news.svg";
        modalIcon.appendChild(nImg);
       */             
        modalText.innerHTML = "Meditate! Devote yourself to a spiritual practice such as meditation or a prayer to prepare yourself for the rush of the day.";
    }

});

cJournal.addEventListener("click", function(){
    curClick = "journal";
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
    modal.style.display = "block";
    
    if (curClick == "bed"){
        modalIcon.innerHTML = "";
        
      /*  var nImg = document.createElement("img");
        nImg.src = "assets/challenges/news.svg";
        modalIcon.appendChild(nImg);
       */             
        modalText.innerHTML = "Make your bed! This one minute habit can make you happier and more productive all day long.";
    }

});

var exitBut = document.getElementById("exit");
exitBut.addEventListener("click", function(){
    modal.style.display = "none";
});
