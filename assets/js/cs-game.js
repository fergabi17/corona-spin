var slotMachine = {
    // Bring information given at index page to the game
    setGame: function () {
        var playersScore = document.getElementById("players-score");
        playersScore.innerHTML = padNumber(window.sessionStorage.initialScore);
    },
    slotMainActions: ["hug", "cough", "hand-wash", "alcool", "hand-to-face", "cough", "hand-wash", "alcool", "hand-to-face"],
    slotPrimeActions: ["hug", "cough", "mask", "alcool", "hand-to-face", "cough", "hand-wash", "alcool", "hand-to-face"],
    slotActions: this.slotMainActions,
    // Decide if the array will include the mask slot according to milliseconds
    getSlotActions: function () {
        var time = new Date().getMilliseconds();
        if (time % 2 === 0 && time % 5 === 0) {
            this.slotActions = this.slotPrimeActions;
            return;
        }
        this.slotActions = this.slotMainActions;
    },
    betMainValue: 2,
    betMultiplierValue: 1,
    // Change the betMultiplierValue in this object and in the html
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
    getPlayersScore: function () {
        return Number(document.getElementById("players-score").innerHTML);
    },

    data: [],
    addScore: function (name, score) {
        this.data.push([name, score]);
        this.data.sort(function (a, b) {
            return a[1] > b[1];
        });

        // Take just the top 5 elements
        if (this.data.length > 5) {
            this.data = this.data.splice(0, 5);
        }
    },
    getScores: function () {
        return this.data;
    },

    saveScores: function () {
        localStorage.setItem('scoreboard', this.data);
    },

    loadScores: function () {
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
        playersScore.innerHTML = padNumber(playersScoreValue - roundValue);
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
        playersScore.innerHTML = padNumber(Number(playersScore.innerHTML) + getResult(roundResult));
    }, 3001)

}

// Checks the result to get the round score
function getResult(result) {
    var roudScoreSlot = document.getElementById("round-score");
    var roundScore;
    function containsAction(action, times) {
        if (times === undefined) {
            return result.includes(action);
        }
        if (countInArray(result, action) === times) {
            return true;
        }
        return false;
    }

    function setRoundScore(value, message) {
        roundScore = value;
        if (message) {
            console.log(message);
        }
    }

    function actionIndex() {
        for (i = 0; i < arguments.length; i++) {
            if (arguments[i][0] !== result[arguments[i][1]]) {
                return false;
            }
        }
        return true;
    }

    // Contains mask scenarios
    if (containsAction("mask")) {

        if (containsAction("mask", 3)) {
            setRoundScore(500, "Wow, 3 masks! Is that even possible?!");
        } else if (containsAction("mask", 2)) {
            setRoundScore(200, "Wow, 2 masks! Is that even possible?!");
        } else if ((containsAction("hand-wash") && containsAction("alcool")) ||
            (containsAction("hand-wash", 2) || containsAction("alcool", 2))) {

            if (actionIndex(["hand-wash", 0], ["alcool", 1], ["mask", 2])) {
                setRoundScore(100, "Wow, 2 masks! Is that even possible?!");
            } else {
                setRoundScore(50, "MEGA BONUS COMBO!");
            }

        } else if (containsAction("hand-wash") || containsAction("alcool")) {
            if (actionIndex(["mask",0])) {
                setRoundScore(30, "Very well protected by the mask");
            } else {
                setRoundScore(20, "Well protected by the mask");
            }
        }
        // Mask and bad actions scenario
        else {
            if (containsAction("hug")) {
                setRoundScore((actionIndex(["hug", 2]) ? 0.5 : 4), "Oh no! Using the mask but not respecting social distance");
            } else if (actionIndex("mask", 1) || actionIndex("mask", 0)) {
                setRoundScore(10, "Protected by the mask");
            } else {
                setRoundScore(4, "Protected by the mask");
            }
        }

    } else {

        // Always lose slot scenarios
        if (containsAction("hug") || actionIndex(["hand-to-face", 0]) || actionIndex(["cough", 2])) {
            setRoundScore(0, "Always loses: social distance | start with hand-to-face | finish with cough");

            // Only good slots scenarios
        } else if (!containsAction("cough") && !containsAction("hand-to-face")) {

            if (result[0] === result[1] === result[2]) {
                setRoundScore(10,"Bonus combination");
            } else if (actionIndex(["hand-wash",0], ["hand-wash", 1], ["alcool", 2])) {
                setRoundScore(20, "Mega bonus combination");
            } else {
                setRoundScore(5, "Combo wash hands and alcool (does it ever get here?");
            }

            // Hand-to-face scenarios  
        } else if (containsAction("hand-to-face") && !containsAction("cough")) {

            if (containsAction("hand-to-face", 2)) {
                setRoundScore(0, "2x hand-to-face");
            } else {
                setRoundScore((actionIndex(["hand-to-face",1]) ? 4 : 0.5), "Combo 2x alcool/hand-wash");
            }

            // Cough scenarios
        } else if (containsAction("cough")) {

            if (actionIndex(["cough",0],["hand-to-face", 1])  || actionIndex(["cough",1],["hand-to-face", 2])) {
                setRoundScore(0, "If hand-to-face comes after cough you lose");
            } else if (containsAction("hand-wash") || containsAction("alcool")) {

                if (containsAction("hand-wash") && containsAction("alcool")) {
                    setRoundScore(5, "Result includes hand-wash and alcool");
                } else if (containsAction("hand-wash", 2)  || containsAction("alcool",2)) {
                    setRoundScore(4, "Result includes 2 hand-wash or alcool");
                } else {
                    setRoundScore(2, "Result includes hand-wash or alcool");
                }

            } else {
                setRoundScore(0.5,"No case was met");
            }
        }
    }
    console.log(`Round score ${roundScore}`);
    // Multiply the round value by bet multiplier to get final round result
    roundScore = roundScore * slotMachine.betMultiplierValue * slotMachine.betMainValue;
    roudScoreSlot.innerHTML = padNumber(roundScore);
    return roundScore;
}

/* ------------------------------------------------ Helper functions */

function padNumber(num, digits) {
    digits = digits || 5;
    num = String(num);
    var zerosToAdd = digits - num.length;
    for (i = 0; i < zerosToAdd; i++) {
        num = "0" + num;
    }
    return num;
}

function countInArray(array, string) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === string) {
            count++;
        }
    }
    return count;
}