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
var guessedLetters = [];

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

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        return "Guess was empty!";
    } else if (input.length > 1) {
        return "Please guess only one letter at a time.";
    }
    else if (!input.match(acceptedLetter)) {
        return "Guess must be a letter.";
    } else {
        return input;
    }

};

const makeGuess = function (letter) {
    const upperCaseLetter = letter.toUpperCase();

};

updateDisplayWord(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetter = guessInput.value;
    guessInput.value = "";
    displayMessage.innerText = "";
    const checkedLetter = validateInput(guessedLetter);
    console.log(checkedLetter);
    
});


/* ---- WRAPPER: EXPORT ONLY IF RUNNING TESTS ---- */
/* istanbul ignore next */
if (typeof exports !== 'undefined') {
    module.exports = { 
        transformWord: transformWord, 
        updateDisplayWord: updateDisplayWord,
        validateInput: validateInput,
        guessedLetters: guessedLetters
    };
}