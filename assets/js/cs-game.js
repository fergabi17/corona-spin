function startGame(){
    var playersName = document.getElementById("players-name").value;
    var playersYear = Number(document.getElementById("players-year").value);
    var currentYear = new Date();
    currentYear = currentYear.getFullYear();
    if (playersYear != "NaN" && playersYear > 1900 && playersYear < currentYear){
        var playersAge = currentYear - playersYear;
        var initialScore = 120 - playersAge;
        alert(`Hello ${playersName}! Your age is ${playersAge}.`);
    } else {
        alert("Please enter a valid year");
    }
}