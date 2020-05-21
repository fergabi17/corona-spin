var slotMachine = {
    smallScreen: function () {
        if (window.innerWidth < 768) {
            console.log("phone mode activated");
            return true;
        }
        return false;
    },
    // Bring information given at index page to the game
    setGame: function () {
        var playersScore = document.getElementById("players-score");
        var playersName = document.getElementById("players-name");
        if (window.sessionStorage.initialScore) {
            playersScore.innerHTML = padNumber(window.sessionStorage.initialScore);
            playersName.innerHTML = window.sessionStorage.playersName;
            return;
        }
        window.location.href = "index.html";
    },
    betMainValue: 2,
    betMultiplierValue: 1,
    // Change the betMultiplierValue in this object and in the html
    betMultiplier: function (multiplier) {
        sounds.button.play();
        this.betMultiplierValue = Number(multiplier);
        // Make this multiplier the only one with bet-multiplier-active class
        $(".bet-multiplier-active").removeClass("bet-multiplier-active");
        $("#betx" + multiplier).addClass("bet-multiplier-active");
        $("#initial-bet-value").html(this.betMainValue * multiplier);
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
    // Needs to be divisible by 1200 (height of the image that spins on the slot)
    rotation: 6000,
    rotationTime: 2500,

    actionPositions: {
        "hug": 100,
        "hand-wash": -100,
        "cough": -300,
        "hand-to-face": -500,
        "mask": -700,
        "alcool": -900
    },

    slotPositions: {
        actionsResult: [],
        slot1: -100,
        slot2: -700,
        slot3: -700,
        setSlotPositions: function () {
            this.actionsResult = [];
            for (i = 1; i <= 3; i++) {
                this["slot" + i] = this.getRandomSlotPosition();
            }
            console.log(this.actionsResult);
        },
        getRandomSlotPosition: function () {
            // Getting a random number that can match a position in the slotActions array
            var actionNumber = Math.floor(Math.random() * slotMachine.slotActions.length);
            // Adding the action result into the result array
            var action = slotMachine.slotActions[actionNumber];
            this.actionsResult.push(action);
            return slotMachine.actionPositions[action];
        }
    }
}

var sounds = {
    spining: new Audio("assets/sounds/spining.wav"),
    spinClick: new Audio("assets/sounds/spin_button_click.wav"),
    spinRelease: new Audio("assets/sounds/spin_button_release.wav"),
    slotStop: new Audio("assets/sounds/slot_stop.wav"),
    button: new Audio("assets/sounds/button.wav"),
    result1: new Audio("assets/sounds/result_1.wav"),
    result2: new Audio("assets/sounds/result_2.wav"),
    result3: new Audio("assets/sounds/result_3.mp3"),
    result4: new Audio("assets/sounds/result_4.mp3"),
    result5: new Audio("assets/sounds/result_5.mp3"),
    playSoundForResult: function(result){
        if(result === 0.5){
            this.result1.play();
        }
        if(result > 0.5 && result < 5){
            this.result2.play();
        }
        if(result >= 5 && result < 50){
            this.result3.play();
        }
        if(result >= 50 && result < 500){
            this.result4.play();
        }
        if(result === 500){
            this.result5.play();
        }
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

function startGame() {
    var playersName = document.getElementById("players-name").value;
    var playersYear = Number(document.getElementById("players-year").value);
    var currentYear = new Date().getFullYear();

    if (playersYear > 1900 && playersYear < currentYear) {
        var playersAge = currentYear - playersYear;
        var initialScore = (playersAge < 90) ? (100 - playersAge) : 10;
        window.sessionStorage.setItem("playersName", playersName);
        window.sessionStorage.setItem("playersAge", playersAge);
        window.sessionStorage.setItem("initialScore", initialScore);
        window.location.href = "game.html";
    } else {
        alert("Please enter a valid year");
    }
}

function spin(slotMachine) {
    var spinButton = document.getElementById("spin");
    var roundScoreSlot = document.getElementById("round-score");
    var playersScore = document.getElementById("players-score");
    var playersScoreValue = Number(playersScore.innerHTML);
    // Bet for this round
    var roundValue = slotMachine.betMultiplierValue * slotMachine.betMainValue;
    if (playersScoreValue < roundValue) {
        if (playersScoreValue < slotMachine.betMainValue) {
            alert("Game Over");
        } else {
            alert("You don't have enough points for this bet");
        }
    } else {
        spinButton.disabled = true;
        roundScoreSlot.innerHTML = "------";
        // Players score after bet
        playersScore.innerHTML = padNumber(playersScoreValue - roundValue);
        slotMachine.getSlotActions();
        slotMachine.slotPositions.setSlotPositions();
        var screenProportion = (slotMachine.smallScreen()) ? 2 : 1;
        sounds.spining.play();
        // Animating slots
        for (i = 1; i <= 3; i++) {
            var position = (slotMachine.rotation * i + slotMachine.slotPositions["slot" + i]);
            $("#slot-" + i).animate({ backgroundPositionY: position / screenProportion }, slotMachine.rotationTime * i);
            $("#slot-" + i).animate({ backgroundPositionY: slotMachine.slotPositions["slot" + i] / screenProportion }, 0);
            setTimeout(function () { sounds.slotStop.play() }, slotMachine.rotationTime * i);
        }

        // Set round result after 3 slots rotated
        setTimeout(function () {
            var result = getResult(slotMachine.slotPositions.actionsResult);
            sounds.playSoundForResult(result);
            result = result * roundValue;
            roundScoreSlot.innerHTML = padNumber(result);
            playersScore.innerHTML = padNumber(Number(playersScore.innerHTML) + result);
            spinButton.disabled = false;
        }, slotMachine.rotationTime * 3)
    }
}

// Checks the result to get the round score
function getResult(result) {
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
                setRoundScore(100, "MEGA BONUS COMBO!");
            } else {
                setRoundScore(50, "BONUS COMBO!");
            }

        } else if (containsAction("hand-wash") || containsAction("alcool")) {
            if (actionIndex(["mask", 0])) {
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
                setRoundScore(10, "Bonus combination");
            } else if (actionIndex(["hand-wash", 0], ["hand-wash", 1], ["alcool", 2])) {
                setRoundScore(20, "Mega bonus combination");
            } else {
                setRoundScore(5, "Combo wash hands and alcool");
            }

            // Hand-to-face scenarios  
        } else if (containsAction("hand-to-face") && !containsAction("cough")) {

            if (containsAction("hand-to-face", 2)) {
                setRoundScore(0, "2x hand-to-face");
            } else {
                setRoundScore((actionIndex(["hand-to-face", 1]) ? 4 : 0.5), "Combo 2x alcool/hand-wash");
            }

            // Cough scenarios
        } else if (containsAction("cough")) {

            if (actionIndex(["cough", 0], ["hand-to-face", 1]) || actionIndex(["cough", 1], ["hand-to-face", 2])) {
                setRoundScore(0, "If hand-to-face comes after cough you lose");
            } else if (containsAction("hand-wash") || containsAction("alcool")) {

                if (containsAction("hand-wash") && containsAction("alcool")) {
                    setRoundScore(5, "Result includes hand-wash and alcool");
                } else if (containsAction("hand-wash", 2) || containsAction("alcool", 2)) {
                    setRoundScore(4, "Result includes 2 hand-wash or alcool");
                } else {
                    setRoundScore(2, "Result includes hand-wash or alcool");
                }

            } else {
                setRoundScore(0.5, "No case was met");
            }
        }
    }
    console.log(`Round score ${roundScore}`);
    return roundScore;
}

/* ------------------------------------------------ Helper functions */

function padNumber(num, digits) {
    digits = digits || 8;
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
