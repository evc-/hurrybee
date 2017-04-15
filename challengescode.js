var modal = document.getElementById("myModal"),
    modalContent = document.getElementById("modal-content"),
    modalText = document.getElementById("modal-text"),
    modalIcon = document.getElementById("modal-icon");

var cExercise = document.getElementById("c1");

cExercise.addEventListener("click", function(){
    modal.style.display = "block";
    
/*    var nImg = document.createElement("img");
    nImg.src = "assets/challenges/exercise.svg";
    modalContent.appendChild(nImg);
*/
    modalText.innerHTML = "Do a yoga sequence, a few pushups, or jumping jacks! Exercise helps you stay focused through your day.";
});


var exitBut = document.getElementById("exit");
exitBut.addEventListener("click", function(){
    modal.style.display = "none";
});
