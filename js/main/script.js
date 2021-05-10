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
var remainingGuesses = 8;

const transformWord = function (origWord, guessArray) {
    const wordUpper = origWord.toUpperCase();
    const wordArray = wordUpper.split("");
    var hiddenWord = "";
    for (var letter of wordArray) {
        if (guessArray.includes(letter)) {
            hiddenWord = hiddenWord.concat(letter);
        } else {
            hiddenWord = hiddenWord.concat("●");
        }
    }
    return hiddenWord;
};


const updateDisplayWord = function (origWord, guessArray) {
    displayWord.textContent = transformWord(origWord, guessArray);
    checkForWin();
};

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        displayMessage.innerText = "Guess was empty!";
        return -1; // Error code -1: Guess input was empty
    } else if (input.length > 1) {
        displayMessage.innerText = "You may only guess one letter at a time.";
        return -2; // Error code -2: Guess input had more than one character
    }
    else if (!input.match(acceptedLetter)) {
        displayMessage.innerText = "Guess must be a letter.";
        return -3; // Error code -3: Guess was not a letter
    } else {
        return input;
    }

};

const makeGuess = function (letter) {
    const upperCaseLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperCaseLetter)){
        displayMessage.innerText = "You already guessed that letter. Try again!";
        return "-4"; // Error code -4: Already guessed that letter
    } else {
        guessedLetters.push(upperCaseLetter);
        updateGuessDisplay();
        updateRemainingGuesses(letter);
        updateDisplayWord(word,guessedLetters);
    }
};

const updateGuessDisplay = function () {
    guessList.innerHTML = "";
    for (var letter of guessedLetters) {
        const li = document.createElement("li");
        li.textContent = letter;
        guessList.append(li);
    }
}

const updateRemainingGuesses = function (guess) {
    const capitalWord = word.toUpperCase();
    if (capitalWord.includes(guess.toUpperCase())) {
        displayMessage.textContent = `Yes! You guessed a letter in the word!`;
    } else {
        displayMessage.textContent = `Sorry, the word does not contain the letter "${guess.toUpperCase()}".`;
        remainingGuesses--;
    }
    if (remainingGuesses === 0) {
        displayMessage.textContent = `Game over. The word was '${word.toUpperCase}'`;
    } else if (remainingGuesses === 1) {
        displayRemaining.innerHTML = `You have <span>1 guess</span> remaining.`;
    } else {
        displayRemaining.innerHTML = `You have <span>${remainingGuesses} guesses</span> remaining.`;
    }

};

const checkForWin = function () {
    if (displayWord.textContent === word.toUpperCase()) {
        displayMessage.classList.add("win");
        displayMessage.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
}


updateDisplayWord(word, guessedLetters);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetter = guessInput.value;
    guessInput.value = "";
    displayMessage.innerText = "";
    const checkedLetter = validateInput(guessedLetter);
    if (typeof checkedLetter === "string"){
        makeGuess(checkedLetter);
    }

    
});


/* ---- WRAPPER: EXPORT ONLY IF RUNNING TESTS ---- */
/* istanbul ignore next */
if (typeof exports !== 'undefined') {
    module.exports = { 
        transformWord: transformWord, 
        updateDisplayWord: updateDisplayWord,
        validateInput: validateInput,
        makeGuess: makeGuess
    };
}