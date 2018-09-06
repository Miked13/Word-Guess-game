//Declartion of variables
var wordContainer = ["Coldplay", "Kyo", "Foo Fighters", "Daft Punk"];
var wins = 0;
var losses = 0;
var chosenWord = "";  //pickedword
var guessedWord = [];  //pickedwordarray
var guessedLetters = [];
var wrongLetters = [];
var guessesLeft = 7;
var gamestart = false;
var audioLoss = document.getElementById("wilhem");
var audio1 = document.getElementById("audio1");
var audio2 = document.getElementById("audio2");
var audio3 = document.getElementById("audio3");
var audio4 = document.getElementById("audio4");
var artwork1 = document.getElementById("Artwork1");
var artwork2 = document.getElementById("Artwork2");
var artwork3 = document.getElementById("Artwork3");
var artwork4 = document.getElementById("Artwork4");

//Play sound when user losses the game
function playaudioLoss() {
    audioLoss.play();
    audio1.pause();
    audio2.pause();
    audio3.pause();
    audio4.pause();
    artwork1.style.display = "none";
    artwork2.style.display = "none";
    artwork3.style.display = "none";
    artwork4.style.display = "none";
    document.getElementById("guesswordText").textContent = "";
}
//Play sound when user wins the game
function playaudioWin(){
    if(guessedWord.join("") == wordContainer[0]){
        audio1.play();
        audio2.pause();
        audio3.pause();
        audio4.pause();
        
    }else if(guessedWord.join("")== wordContainer[2]){
        audio2.play();
        audio1.pause();
        audio3.pause();
        audio4.pause();
    }else if(guessedWord.join("") == wordContainer[1]){
        audio3.play();
        audio1.pause();
        audio2.pause();
        audio4.pause();
    }else{
        audio4.play();
        audio1.pause();
        audio2.pause();
        audio3.pause();
    }
}
//Show the Artwork of the song currently playing when the user wins
function showArtwork(){
    if(guessedWord.join("") == wordContainer[0]){
        artwork1.style.display = "inline";
        artwork2.style.display = "none";
        artwork3.style.display = "none";
        artwork4.style.display = "none";
    }else if(guessedWord.join("")== wordContainer[2]){
        artwork2.style.display = "inline";
        artwork1.style.display = "none";
        artwork3.style.display = "none";
        artwork4.style.display = "none";
    }else if(guessedWord.join("") == wordContainer[1]){
        artwork3.style.display = "inline";
        artwork1.style.display = "none";
        artwork2.style.display = "none";
        artwork4.style.display = "none";
    }else{
        artwork4.style.display = "inline";
        artwork1.style.display = "none";
        artwork2.style.display = "none";
        artwork3.style.display = "none";
    }
}

//the game's statistics are reset upon refreshing the page or pressing the space/enter key
function startGame() {
    gamestart = true;
    guessesLeft = 7;
    guessedWord = [];
    guessedLetters = [];
    chosenWord = wordContainer[Math.floor(Math.random() * wordContainer.length)];
    for (var i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === " ") {
            guessedWord.push(" ");
        } else {
            guessedWord.push("_");
        }
    }
    document.getElementById("guessesLeft").textContent = guessesLeft;
    document.getElementById("guessedWord").textContent = guessedWord.join("");
    document.getElementById("guessedLetters").textContent = guessedLetters;
}

//function to make sure the letters entered lowercase match the same letters inside the wordContainer
function gLetters(letter) {
    console.log(letter);
    if (gamestart === true && guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        for (var i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i].toLowerCase() === letter.toLowerCase()) {
                guessedWord[i] = chosenWord[i];
            }
        }
        document.getElementById("guessedWord").textContent = guessedWord.join("");
        checkwrong(letter);

    } else {
        if (!gamestart) {
            alert("Click the Start button to play!");
        } else {
            alert("The letter was already guessed!");
        }
    }
}
//If the user guessed the wrong letters, the number of guesses left shrink by 1 until the user losses
function checkwrong(letter) {
    if ((guessedWord.indexOf(letter.toLowerCase()) === -1 && guessedWord.indexOf(letter.toUpperCase())) === -1) {
        guessesLeft--;
        wrongLetters.push(letter);
        document.getElementById("guessedLetters").textContent = wrongLetters.join(" ");
        document.getElementById("guessesLeft").textContent = guessesLeft;
    }
    checkLoss();
}
//Run this function if the user loses
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gamestart = false;
        document.getElementById("losses").textContent = losses;
        playaudioLoss();
    }
    checkWin();
}
//Run this function if the user wins
function checkWin() {
    if (chosenWord.toLowerCase() === guessedWord.join("").toLowerCase()) {
        wins++;
        gamestart = false;
        document.getElementById("wins").textContent = wins;
        document.getElementById("guesswordText").textContent = guessedWord.join("");
        playaudioWin();
        showArtwork();
    }
}
//Click the button to start the game
document.getElementById("startbutton").addEventListener("click", startGame);

document.onkeyup = function (event) {
    console.log(event);
    //The user choses only the letters of the alphabet by limiting the range of the keycode
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        gLetters(event.key);
    }
}