function startGame() {
    var playersName = document.getElementById("players-name").value;
    var playersYear = Number(document.getElementById("players-year").value);
    var currentYear = new Date().getFullYear();
    //currentYear = currentYear;
    if (playersYear != "NaN" && playersYear > 1900 && playersYear < currentYear) {
        var playersAge = currentYear - playersYear;
        var initialScore = 120 - playersAge;
        alert(`Hello ${playersName}! Your age is ${playersAge}.\n
                Your initial score will be ${initialScore}`);
        window.sessionStorage.setItem("playersName", playersName);
        window.sessionStorage.setItem("playersAge", playersAge);
        window.sessionStorage.setItem("initialScore", initialScore);
        window.location.href = "game.html";
    } else {
        alert("Please enter a valid year");
    }
}

function setGame() {
    var scoreSlot = document.getElementById("players-score");
    scoreSlot.innerHTML = window.sessionStorage.initialScore;
}

function game() {
    // Possible results for the slots
    var slotActions = ["hug", "cough", "hand-wash", "alcool", "hand-to-face"];
    // Putting all slots into an slots array
    var slots = [document.getElementById("slot-1"), document.getElementById("slot-2"), 
                document.getElementById("slot-3")];
    // Random number that will define which action takes place on the slot
    var actionNumber;
    
    // Loop to get random results for slots
    for (i = 0; i<slots.length; i++){
        // * 5 to get 5 numbers,from 0 to 4 that will be converted to positions in the array
        var actionNumber = Math.floor(Math.random() * 5);
        // Defining what action each slot takes
        slots[i].innerHTML = slotActions[actionNumber];
        slots[i].classList.add(slotActions[actionNumber]);
    } 

    // Build a new array with the 3 actions result
    var slotsResults = slots.map(function(slot){
        return slot.innerHTML;
    })
    console.log(slotsResults);
}

function spin(){

    // $("p").removeClass("intro");
    var roundValue = 2;
    var scoreSlot = document.getElementById("players-score");
    scoreSlotValue = Number(scoreSlot.innerHTML) - roundValue;
    scoreSlot.innerHTML = scoreSlotValue;
    game();
}
