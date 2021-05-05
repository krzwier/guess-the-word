/* ---- DOCUMENT ELEMENTS ---- */

// Unordered list where player's guessed letters appears
const guessList = document.querySelector(".guessed-letters");

// Button with text "Guess!" on it
const guessButton = document.querySelector(".guess");

// Text input where player guesses letter
const guessInput = document.querySelector(".letter");

// Paragraph where word in progress appears
const displayWord = document.querySelector(".word-in-progress");

// Paragraph where remaining guesses displays
const displayRemaining = document.querySelector(".remaining");

// Span inside paragraph where remaining guesses displays
const displayRemainingSpan = document.querySelector(".remaining span");

// Paragraph where messages appear when player guesses a letter
const displayMessage = document.querySelector(".message");

// Button that prompts player to play again
const playAgainButton = document.querySelector(".play-again");


/* ---- GLOBAL VARIABLES ---- */
var word = "magnolia";

const transformWord = function (origWord) {
    var circleWord = "";
    for (var letter of origWord) {
        circleWord = circleWord.concat("●");
    }
    return circleWord;
};

const updateDisplayWord = function (origWord) {
    displayWord.innerText = transformWord(origWord);
};

updateDisplayWord(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guessedLetter = guessInput.value;
    console.log(guessedLetter);
    guessInput.value = "";
});

/* ---- WRAPPER: EXPORT ONLY IF RUNNING TESTS ---- */
/* istanbul ignore next */
if (typeof exports !== 'undefined') {
    module.exports = transformWord;
}