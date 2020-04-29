var slotMachine = {
    // Bringing information given at index page to the game
    setGame: function () {
        var playersScore = document.getElementById("players-score");
        playersScore.innerHTML = window.sessionStorage.initialScore;
    },
    slotActions: ["hug", "cough", "hand-wash", "alcool", "hand-to-face", "cough", "hand-wash", "alcool", "hand-to-face"],
    betMainValue: 2,
    betMultiplierValue: 1,
    betMultiplier: function (multiplier) {
        this.betMultiplierValue = Number(multiplier);
        // Make this multiplier the only one with bet-multiplier-active class
        $(".bet-multiplier-active").removeClass("bet-multiplier-active");
        $("#betx" + multiplier).addClass("bet-multiplier-active");
        console.log(`Bet value changed to ${this.betMultiplierValue}`);
    }
}

// Getting information to start game
function startGame() {
    var playersName = document.getElementById("players-name").value;
    var playersYear = Number(document.getElementById("players-year").value);
    var currentYear = new Date().getFullYear();

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

// Game actions for each spin
function game(slotMachine) {
    // Random number that will define which action takes place on the slot
    var roundResult = [],
        roundScore,
        actionNumber;

    // Loop to get random results for slots
    for (i = 0; i < 3; i++) {
        // slotActions.length = 5 gives 5 numbers,from 0 to 4 that will be converted to positions in the array
        var actionNumber = Math.floor(Math.random() * slotMachine.slotActions.length);
        // Defining what action each slot takes
        $("#slot-" + (i + 1)).addClass(slotMachine.slotActions[actionNumber]);
        roundResult.push(slotMachine.slotActions[actionNumber]);
    }
    // Get round result
    roundScore = getResult(roundResult);
    return roundScore;
}

// Spining slots
function spin(slotMachine) {
    var playersScore = document.getElementById("players-score");
    var playersScoreValue = Number(playersScore.innerHTML);
    // Bet for this round
    var roundValue = slotMachine.betMultiplierValue * slotMachine.betMainValue;

    if (roundValue > playersScoreValue) {
        if(playersScoreValue < slotMachine.betMainValue){
            alert("Game Over");
        } else {
            alert("You don't have enough points for this bet");
        }
    } else {
        // Loop to clear all slots from their actions
        for (i = 0; i <= 3; i++) {
            for (a = 0; a <= slotMachine.slotActions.length; a++) {
                $("#slot-" + (i + 1)).removeClass(slotMachine.slotActions[a]);
            }
        }

        // Setting the score slot value minus the round bet value
        playersScore.innerHTML = playersScoreValue - roundValue;
        // Get score results from this round
        var roundScore = game(slotMachine);
        // Adding results to final score
        playersScore.innerHTML = Number(playersScore.innerHTML) + roundScore;
    }
}

// Checks the result to get the round score
function getResult(result) {
    var roudScoreSlot = document.getElementById("round-score");
    var roundScore;

    // Always lose slot scenarios
    if (result.includes("hug") || result[0] === "hand-to-face" || result[2] === "cough") {
        roundScore = 0;
        console.log("Always loses: social distance | start with hand-to-face | finish with cough");

        // Only good slots scenarios
    } else if (!result.includes("cough") && !result.includes("hand-to-face")) {
        // All equal
        if (result[0] === result[1] === result[2]) {
            roundScore = 10;
            console.log("Bonus combination");
            // Mega bonus combination
        } else if (result[0] === "hand-wash" && result[1] === "hand-wash" && result[2] === "alcool") {
            roundScore = 20;
            console.log("Mega bonus combination");
            // Any combo wash-hands + alcool
        } else {
            roundScore = 5;
            console.log("Combo wash hands and alcool");
        }

        // Hand-to-face scenarios  
    } else if (result.includes("hand-to-face") && !result.includes("cough")) {
        // If 2x hand to face
        if(result[1] === result[2]){
            roundScore = 0;
            console.log("2x hand-to-face");

            // If the other slots are alcool and hand-wash
        } else {
            roundScore = (result[1] === "hand-to-face") ? 4 : 0.5;
            console.log("Combo 2x alcool/hand-wash");
        }
        
        // Cough scenarios
    } else if (result.includes("cough")) {  
            // If hand-to-face comes after cough
        if (result.indexOf("cough") == (Number(result.indexOf("hand-to-face")) - 1)) {
            roundScore = 0;
            console.log("If hand-to-face comes after cough you lose");

            // If alcool or hand-wash appears after cough
        } else if ((result.indexOf("hand-wash") == (Number(result.indexOf("cough")) + 1)) ||
            (result.indexOf("alcool") == (Number(result.indexOf("cough")) + 1))) {
            roundScore = (result.includes("alcool") && result.includes("hand-wash")) ? 4 : 2;
            console.log("Result includes hand-wash and/or alcool");
        } else {
            roundScore = 0.5;
        }
    } else {
        console.log(`No case was met`);
        roundScore = 0.5;
    }

    console.log(`${slotMachine.betMultiplierValue} x ${roundScore}`);
    // Multiply the round value by bet multiplier to get final round result
    roundScore = roundScore * slotMachine.betMultiplierValue * slotMachine.betMainValue;
    roudScoreSlot.innerHTML = roundScore;
    return roundScore;
}