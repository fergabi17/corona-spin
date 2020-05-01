var slotMachine = {
    // Bringing information given at index page to the game
    setGame: function () {
        var playersScore = document.getElementById("players-score");
        playersScore.innerHTML = getDigits(window.sessionStorage.initialScore);
    },
    slotMainActions: ["hug", "cough", "hand-wash", "alcool", "hand-to-face", "cough", "hand-wash", "alcool", "hand-to-face"],
    slotPrimeActions: ["hug", "cough", "mask", "alcool", "hand-to-face", "cough", "hand-wash", "alcool", "hand-to-face"],
    slotActions: this.slotMainActions,
    getSlotActions: function () {
        var time = new Date().getMilliseconds();
        if (time % 2 === 0) {
            this.slotActions = this.slotPrimeActions;
        } else {
            this.slotActions = this.slotMainActions;
        }
    },
    betMainValue: 2,
    betMultiplierValue: 1,
    betMultiplier: function (multiplier) {
        this.betMultiplierValue = Number(multiplier);
        // Make this multiplier the only one with bet-multiplier-active class
        $(".bet-multiplier-active").removeClass("bet-multiplier-active");
        $("#betx" + multiplier).addClass("bet-multiplier-active");
        $("#initial-bet-value").html(this.betMainValue * multiplier);
    }
}

var leaderboard = {
    playersName: window.sessionStorage.getItem("playersName"),
    getPlayersScore: function (){
        return Number(document.getElementById("players-score").innerHTML);
    },
  
    data: [],
    addScore: function (name, score){
        // Add the new score to end of 'data'
		this.data.push([name, score]);

		// Sort data by all of the scores
		this.data.sort(function(a, b) {
			return a[1] > b[1];
		});

		// Take just the top 5 elements
		if (this.data.length > 5) {
			this.data = this.data.splice(0, 5);
        }
    },
    getScores: function() {
		return this.data;
	},

	saveScores: function() {
		localStorage.setItem('scoreboard', this.data);
	},

	loadScores: function() {
		return localStorage.getItem('scoreboard');
    },
}

function endGame(leaderboard) {
    leaderboard.addScore(leaderboard.playersName, leaderboard.getPlayersScore());
    leaderboard.saveScores();
    // ***
    var scores = leaderboard.loadScores();
    console.log(scores);
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

// Spining slots
function spin(slotMachine) {
    // Change the slot actions to get a chance to get the mask
    slotMachine.getSlotActions();
    var playersScore = document.getElementById("players-score");
    var playersScoreValue = Number(playersScore.innerHTML);
    // Bet for this round
    var roundValue = slotMachine.betMultiplierValue * slotMachine.betMainValue;

    if (roundValue > playersScoreValue) {
        if (playersScoreValue < slotMachine.betMainValue) {
            alert("Game Over");
        } else {
            alert("You don't have enough points for this bet");
        }
    } else {
        // Loop to clear all slots from their actions
        for (i = 0; i <= 3; i++) {
            for (a = 0; a <= slotMachine.slotPrimeActions.length; a++) {
                $("#slot-" + (i + 1)).removeClass(slotMachine.slotPrimeActions[a]);
            }
        }

        // Setting the score slot value minus the round bet value
        playersScore.innerHTML = getDigits(playersScoreValue - roundValue);
        // Get score results from this round
        game(slotMachine, playersScore);

    }
}

// Game actions for each spin
function game(slotMachine, playersScore) {
    // Result with the 3 actions for this round
    var roundResult = [];

    // Loop to get random results for slots
    for (i = 0; i < 3; i++) {
        getSlotAction(i, (i + 1) * 1000);
    }

    function getSlotAction(i, time) {
        setTimeout(function () {
            // Getting a random number that can match a position in the slotActions array
            var actionNumber = Math.floor(Math.random() * slotMachine.slotActions.length);
            $("#slot-" + (i + 1)).addClass(slotMachine.slotActions[actionNumber]);
            // Adding the action result into the result array
            roundResult.push(slotMachine.slotActions[actionNumber]);
        }, time);
    }

    // Set time out to wait the result of the 3 spins
    setTimeout(function () {
        // Get round result
        playersScore.innerHTML = getDigits(Number(playersScore.innerHTML) + getResult(roundResult));
    }, 3001)

}

// Checks the result to get the round score
function getResult(result) {
    var roudScoreSlot = document.getElementById("round-score");
    var roundScore;

    if (result.includes("mask")) {
        // 3 masks
        if (countInArray(result, "mask") === 3) {
            roundScore = 500;
            console.log("Wow, 3 masks! Is that even possible?!");

            // 2 masks
        } else if (countInArray(result, "mask") === 2) {
            roundScore = 200;
            console.log("Wow, 2 masks! Is that even possible?!");

            //Mask and hand-wash and alcool scenarios
        } else if (result.includes("hand-wash") && result.includes("alcool") ||
            (countInArray(result, "hand-wash") == 2 || countInArray(result, "alcool") == 2)) {
            if (result[0] === "hand-wash" && result[1] === "alcool" && result[2] === "mask") {
                roundScore = 100;
                console.log("Wow, 2 masks! Is that even possible?!");
            } else {
                roundScore = 50;
                console.log("MEGA BONUS COMBO!");
            }

            //Mask and hand-wash/alcool scenarios
        } else if (result.includes("hand-wash") || result.includes("alcool")) {
            if (result[0] === "mask") {
                roundScore = 30;
                console.log("Very well protected by the mask");
            } else {
                roundScore = 20;
                console.log("Well protected by the mask");
            }
        }
        // Mask and bad actions scenario
        else {
            if (result.includes["hug"]) {
                roundScore = (countInArray(result, "hug") === 2) ? 0.5 : 4;
                console.log("Oh no! Using the mask but not respecting social distance");
            } else if (result[1] === "mask" || result[0] === "mask") {
                roundScore = 10;
                console.log("Protected by the mask");
            } else {
                roundScore = 4;
                console.log("Protected by the mask");
            }

        }
    } else {

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
                console.log("Combo wash hands and alcool (does it ever get here?");
            }

            // Hand-to-face scenarios  
        } else if (result.includes("hand-to-face") && !result.includes("cough")) {
            // If 2x hand to face
            if (result[1] === result[2]) {
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
            if ((result[0] === "cough" && result[1] === "hand-to-face") ||
                (result[1] === "cough" && result[2] === "hand-to-face")) {
                roundScore = 0;
                console.log("If hand-to-face comes after cough you lose");

                // If alcool and/or hand-wash with cough
            } else if (result.includes("hand-wash") || result.includes("alcool")) {
                if (result.includes("hand-wash") && result.includes("alcool")) {
                    roundScore = 5;
                    console.log("Result includes hand-wash and alcool");
                } else if (countInArray(result, "hand-wash") == 2 || countInArray(result, "alcool") == 2) {
                    roundScore = 4;
                    console.log("Result includes 2 hand-wash or alcool");

                    // If alcool or hand-wash appears after cough
                } else {
                    roundScore = 2;
                    console.log("Result includes hand-wash or alcool");
                }


            } else {
                console.log(`No case was met`);
                roundScore = 0.5;
            }
        }
    }
    console.log(`Round score ${roundScore}`);
    // Multiply the round value by bet multiplier to get final round result
    roundScore = roundScore * slotMachine.betMultiplierValue * slotMachine.betMainValue;
    roudScoreSlot.innerHTML = getDigits(roundScore);
    return roundScore;
}

/* ------------------------------------------------ Helper functions */

function getDigits(num, digits) {
    digits = digits || 5;
    num = String(num);
    var zerosToAdd = digits - num.length;
    for (i = 0; i < zerosToAdd; i++) {
        num = "0" + num;
    }
    return num;
}

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}