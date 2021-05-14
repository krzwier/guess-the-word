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

// Paragraph where messages appear when player guesses a letter
const displayMessage = document.querySelector(".message");

// Button that prompts player to play again
const playAgainButton = document.querySelector(".play-again");


/* ---- GLOBAL VARIABLES ---- */
let wordList = [];
let word = "";
let guessedLetters = [];
let remainingGuesses = 8;


const getWordList = async function () {
    try {
        const textFile = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
        const words = await textFile.text();
        return words.split("\n");
    } catch (e) {
        console.log("getWordList() error: Fetch unsuccessful. Word list not loaded.")
    }
}

const getWord = async function () {
    wordList = await getWordList();
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex].trim();
}

const transformWord = function (origWord, guessArray) {
    const wordUpper = origWord.toUpperCase();
    const wordArray = wordUpper.split("");
    let hiddenWord = "";
    for (let letter of wordArray) {
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
    if (guessedLetters.includes(upperCaseLetter)) {
        displayMessage.innerText = "You already guessed that letter. Try again!";
        return "-4"; // Error code -4: Already guessed that letter
    } else {
        guessedLetters.push(upperCaseLetter);
        updateGuessDisplay();
        updateRemainingGuesses(upperCaseLetter);
        updateDisplayWord(word, guessedLetters);
    }
};

const updateGuessDisplay = function () {
    guessList.innerHTML = "";
    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.textContent = letter;
        guessList.append(li);
    }
};

const updateRemainingGuesses = function (guess) {
    const capitalWord = word.toUpperCase();
    if (capitalWord.includes(guess)) {
        displayMessage.textContent = `Good guess!`;
    } else {
        displayMessage.textContent = `Sorry, the word does not contain the letter "${guess}".`;
        remainingGuesses--;
    }
    if (remainingGuesses === 0) {
        displayMessage.textContent = `Game over. The word was "${capitalWord}".`;
        startOver();
    } else if (remainingGuesses === 1) {
        displayRemaining.innerHTML = `You have <span>1 incorrect guess</span> remaining.`;
    } else {
        displayRemaining.innerHTML = `You have <span>${remainingGuesses} incorrect guesses</span> remaining.`;
    }

};

const checkForWin = function () {
    if (displayWord.textContent === word.toUpperCase()) {
        displayMessage.classList.add("win");
        displayMessage.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};

const newGame = async function () {
    remainingGuesses = 8;
    guessedLetters = [];

    word = await getWord();
    updateDisplayWord(word, guessedLetters);

};

const newGameSpecificWord = async function (specificWord) {
    remainingGuesses = 8;
    guessedLetters = [];
    word = specificWord;
    updateDisplayWord(word, guessedLetters);
};

const startOver = function () {
    guessButton.classList.add("hide");
    displayRemaining.classList.add("hide");
    guessList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetter = guessInput.value;
    guessInput.value = "";
    displayMessage.textContent = "";
    const checkedLetter = validateInput(guessedLetter);
    if (typeof checkedLetter === "string") {
        makeGuess(checkedLetter);
    }
});

newGame();

/* ---- WRAPPER: EXPORT ONLY IF RUNNING TESTS ---- */
/* istanbul ignore next */
if (typeof exports !== 'undefined') {
    module.exports = {
        transformWord: transformWord,
        updateDisplayWord: updateDisplayWord,
        validateInput: validateInput,
        makeGuess: makeGuess,
        newGame: newGame,
        newGameSpecificWord: newGameSpecificWord,
        getWordList: getWordList,
        getWord: getWord,
        startOver: startOver
    };
} 