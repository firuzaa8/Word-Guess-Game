// data/object for the main game
var wordList = [
    {word: "paella", hint: "Rice dish from Spain"},
    {word: "poutine", hint: "Canadian mixed dish"},
    {word: "tacos", hint: "Mexican food in a shell"},
    {word: "french*toast", hint: "Common breakfast in US"},
    {word: "croissant", hint: "Parisian delight"},
    {word: "kebab", hint: "Middle Eastern staple"},
    {word: "lechon", hint: "A Filipino national dish"},
    {word: "hummus", hint: "Middle Eastern bean dish"},
    {word: "pierogi", hint: "Polish dumplings"},
    {word: "hamburger", hint: "American favorite from Germany"},
    {word: "sushi", hint: "Japanese staple food"},
    {word: "chocolate", hint: "The most popular dessert from the Mayans"},
    {word: "pizza", hint: "Italian staple dish"},
    {word: "fish*and*chips", hint: "British fast food"},
    {word: "pho", hint: "Vietnamese soup"},
    {word: "arepas", hint: "Corn cakes from Venezuela"}  
]
//all of the variables set
var gameStarted = false;
var pcRandomPick;
var lettersGuessed;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var wins = 0;
var remainingGuesses;
var lettersMatchCount;
var gameArray;

//new game start + sets new game
function newGame() {
    //select random word from the object
    pcRandomPick = wordList[Math.floor(Math.random()*wordList.length)];
    //reset the  game tracking
    lettersGuessed = [];
    remainingGuesses = 4;
    // count the * in advance and include them
    lettersMatchCount = pcRandomPick.word.split("*").length - 1
    //hide the pic
    document.getElementById("pic").style.display = "none";

 //clear game + refill with blanks
    gameArray = [];
    for (var i = 0; i < pcRandomPick.word.length; i++) {
        if (pcRandomPick.word[i] === "*") {
            gameArray.push("&nbsp;"); 
        }
        else {
            gameArray.push("_");
        }
    }
    updateScreen();
}
// loads info from var connects to html
function updateScreen() {
    document.querySelector("#wins").innerHTML = wins;
    document.querySelector("#remainingGuesses").innerHTML = remainingGuesses;
    document.querySelector("#hint").innerHTML = pcRandomPick.hint;
    document.querySelector("#lettersGuessed").innerHTML = lettersGuessed.join(" ");
    document.querySelector("#word").innerHTML = gameArray.join(" ");
}
//when letter clicked checks if game is on; if ON displays game
document.onkeyup = function(event) {
    if (gameStarted == false) {
        newGame();
        gameStarted = true;
        document.getElementById("start").style.display = "none";
        document.getElementById("game").style.display = "inline";
        return;
    }
    //only accepts alpahbet
    if (alphabet.indexOf(event.key)==-1) {
        return;
    }
    //ignore already guessed letters
    if (lettersGuessed.indexOf(event.key)!== -1) {
        return;
    }
    //set a Match var for the game and pushing letters into _
    lettersGuessed.push(event.key)
    var match = false;
    for (var i = 0; i < pcRandomPick.word.length; i++) {
        if (event.key == pcRandomPick.word[i]) {
            gameArray[i] = event.key;
            match = true;
            lettersMatchCount++;
        }
    }
    //deducts remaining guesses, stops the game when guesses are 0
    if (match == false) {
        remainingGuesses--;
    }
    if (remainingGuesses == 0) {
        alert ("You lose");
        gameArray = pcRandomPick.word.split("")
        document.getElementById("pic").style.display = "block";
        document.getElementById("pic").src = "assets/images/"+pcRandomPick.word + ".jpg"
    }
    // if matched letters equal to length of the word, display win and a pic
    if (lettersMatchCount == pcRandomPick.word.length) {
        wins++
        alert ("YOU WIN!!")
        document.getElementById("pic").style.display = "block";
        document.getElementById("pic").src = "assets/images/"+pcRandomPick.word + ".jpg"
    }
    updateScreen();
};
