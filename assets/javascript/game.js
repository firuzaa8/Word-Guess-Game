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
var gameStarted = false;
var pcRandomPick;
var lettersGuessed;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var wins = 0;
var remainingGuesses;
var lettersMatchCount;
var gameArray;

//new game -start 
function newGame() {
    wins=0;
    pcRandomPick = wordList[Math.floor(Math.random()*wordList.length)];
    lettersGuessed = [];
    remainingGuesses = 4;
    lettersMatchCount = 0;
    gameArray = [];
    for (var i = 0; i < pcRandomPick.word.length; i++) {
        if (pcRandomPick.word[i] === "*") {
            gameArray.push(" "); 
        }
        else {
            gameArray.push("_");
        }
    }
    updateScreen();
}
function updateScreen() {
    document.querySelector("#wins").innerHTML = wins;
    document.querySelector("#remainingGuesses").innerHTML = remainingGuesses;
    document.querySelector("#hint").innerHTML = pcRandomPick.hint;
    document.querySelector("#lettersGuessed").innerHTML = lettersGuessed.join(" ");
    document.querySelector("#word").innerHTML = gameArray.join(" ");
}
document.onkeyup = function(event) {
    if (gameStarted == false) {
        newGame();
        gameStarted = true;
        document.getElementById("start").style.display = "none";
        document.getElementById("game").style.display = "inline";
    }
    if (alphabet.indexOf(event.key)==-1) {
        return;
    }
    lettersGuessed.push(event.key)
    var match = false;
    for (var i = 0; i < pcRandomPick.word.length; i++) {
        if (event.key == pcRandomPick.word[i]) {
            gameArray[i] = event.key;
            match = true;
        }
    }
    if (match == false) {
        remainingGuesses--;
    }
    updateScreen();
};
