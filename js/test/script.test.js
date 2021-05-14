const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

// must load document here, or else import below will fail
document.documentElement.innerHTML = html.toString();
const wordLib = require("../main/script");
// const jsdomAlert = window.alert;

jest
    .dontMock('fs');



beforeEach(() => {

    document.innerHTML = html.toString();
    fetchMock.doMock()

});

afterEach(() => {

    jest.resetModules();
    document.innerHTML = "";

});

describe('getWordList', () => {

    const log = global.console.log; // save original console.log function

    beforeEach(() => {
        fetch.resetMocks();
        console.log = jest.fn();
    });

    afterAll(() => {
        global.console.log = log; // restore original console.log after all tests
    })

    it('calls API and returns data', () => {
        fetch.mockResponseOnce("alphabet\nfunny\nwordsmith");
        wordLib.getWordList().then(res => {
            expect(res).toEqual(["alphabet", "funny", "wordsmith"]);
        });
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    });

    it('prints message to console on a failed fetch request', () => {
        fetch.mockReject(new Error('Fetch failed'));
        wordLib.getWordList().then(res => {
            expect(global.console.log.mock.calls[0][0]).toContain("Fetch unsuccessful");
        });

    });

});

describe('newGame', () => {

    it('displays "●●●●●" when API returns "funny"', () => {
        fetch.mockResponseOnce("funny");
        wordLib.newGame().then(() => {
            const display = document.querySelector('.word-in-progress');
            const actual = display.textContent;
            const expected = "●●●●●";
            expect(actual).toBe(expected);
        });

    })

});

describe('transformWord', () => {
    it('returns ●●●●●●●● when input string is magnolia and no letters have been guessed', () => {
        wordLib.newGameSpecificWord("magnolia");
        const input = "magnolia";
        const array = [];
        const output = wordLib.transformWord(input, array);
        const expected = "●●●●●●●●";
        expect(output).toBe(expected);
    });

    it(`returns ●a●●●●●a when input string is magnolia and only letter A has been guessed`, () => {
        wordLib.newGameSpecificWord("magnolia");
        // wordLib.updateDisplayWord("magnolia", []);
        const input = "magnolia";
        const array = ["A"];
        const output = wordLib.transformWord(input, array);
        const expected = "●A●●●●●A";
        expect(output).toBe(expected);
    });

    it('returns empty string when input string is empty', () => {
        wordLib.newGameSpecificWord("magnolia");
        const input = "";
        const array = [];
        const output = wordLib.transformWord(input, array);
        const expected = "";
        expect(output).toBe(expected);

    });
});

describe('updateDisplayWord', () => {
    it(`displays all circles when there are no guesses`, () => {
        wordLib.newGameSpecificWord("magnolia");
        // wordLib.updateDisplayWord("magnolia", []);
        const display = document.querySelector('.word-in-progress');
        const actual = display.textContent;
        const expected = "●●●●●●●●";
        expect(actual).toBe(expected);
    });

    it(`displays hidden version depending on guesses`, () => {
        wordLib.newGameSpecificWord("magnolia");
        wordLib.makeGuess("a");
        // wordLib.updateDisplayWord("magnolia", ["A"]);
        const display = document.querySelector('.word-in-progress');
        const actual = display.textContent;
        const expected = "●A●●●●●A";
        expect(actual).toBe(expected);
    });
});

describe('validateInput', () => {
    it(`returns -1 if input is empty`, () => {
        wordLib.newGameSpecificWord("magnolia");
        const actual = wordLib.validateInput("");
        expect(actual).toBe(-1);
    });

    it(`displays error message if input is empty`, () => {
        wordLib.newGameSpecificWord("magnolia");
        wordLib.validateInput("");
        const message = document.querySelector('.message');
        const actual = message.innerText;
        expect(actual).toContain("empty");
    });

    it(`returns -2 if user inputs more than one letter`, () => {
        wordLib.newGameSpecificWord("magnolia");
        const actual = wordLib.validateInput("bm");
        expect(actual).toBe(-2);
    });

    it(`displays error message if input contains more than one letter`, () => {
        wordLib.newGameSpecificWord("magnolia");
        wordLib.validateInput("bm");
        const message = document.querySelector('.message');
        const actual = message.innerText;
        expect(actual).toContain("one letter");
    });

    it(`returns -3 if user inputs non-letter`, () => {
        wordLib.newGameSpecificWord("magnolia");
        const actual = wordLib.validateInput("5");
        expect(actual).toBe(-3);
    });

    it(`displays error message if input contains non-letter`, () => {
        wordLib.newGameSpecificWord("magnolia");
        wordLib.validateInput("5");
        const message = document.querySelector('.message');
        const actual = message.innerText;
        expect(actual).toContain("must be a letter");
    });


    it(`returns letter if user inputs single letter`, () => {
        wordLib.newGameSpecificWord("magnolia");
        const actual = wordLib.validateInput("f");
        expect(actual).toBe("f");
    });
});

describe('makeGuess', () => {
    it(`displays error message if letter has already been guessed`, () => {
        wordLib.newGameSpecificWord("magnolia");
        wordLib.makeGuess("f");
        wordLib.makeGuess("f");
        const message = document.querySelector('.message');
        const actual = message.innerText;
        expect(actual).toContain("already guessed");

    });

    it(`displays one guessed letter on page`, () => {
        wordLib.newGameSpecificWord("magnolia");
        wordLib.makeGuess("f");
        const actualDisplay = document.querySelector(".guessed-letters");
        const actual = actualDisplay.innerHTML;
        expect(actual).toBe("<li>F</li>");
    });

    it(`displays win message when player has guessed all letters`, () => {
        wordLib.newGameSpecificWord("magnolia");
        // wordLib.updateDisplayWord("magnolia", []);
        wordLib.makeGuess("m");
        wordLib.makeGuess("a");
        wordLib.makeGuess("g");
        wordLib.makeGuess("n");
        wordLib.makeGuess("o");
        wordLib.makeGuess("l");
        wordLib.makeGuess("i");
        const message = document.querySelector('.message');
        const actual = message.textContent;
        expect(actual).toContain("Congrats!");

    });

    it(`displays play again button after game is won`, () => {
        wordLib.newGameSpecificWord("magnolia");
        wordLib.makeGuess("m");
        wordLib.makeGuess("a");
        wordLib.makeGuess("g");
        wordLib.makeGuess("n");
        wordLib.makeGuess("o");
        wordLib.makeGuess("l");
        wordLib.makeGuess("i");
        const playAgainButton = document.querySelector(".play-again");
        expect(playAgainButton.classList.contains("hide")).toBe(false);
    });
});

describe('updateGuessesRemaining', () => {
    it(`displays "Game over" when guesses run out`, () => {
        wordLib.newGameSpecificWord("magnolia");
        // wordLib.updateDisplayWord("magnolia", []);
        wordLib.makeGuess("y");
        wordLib.makeGuess("c");
        wordLib.makeGuess("z");
        wordLib.makeGuess("p");
        wordLib.makeGuess("j");
        wordLib.makeGuess("q");
        wordLib.makeGuess("k");
        wordLib.makeGuess("b");
        const message = document.querySelector('.message');
        const actual = message.textContent;
        expect(actual).toContain("Game over");

    });

    it(`displays "7 incorrect guesses remaining" after one wrong guess is made`, () => {
        wordLib.newGameSpecificWord("magnolia");
        // wordLib.updateDisplayWord("magnolia", []);
        wordLib.makeGuess("y");
        const message = document.querySelector('.remaining');
        const actual = message.textContent;
        expect(actual).toContain("7 incorrect guesses remaining");

    });


    it(`displays "1 incorrect guess remaining" after seven wrong guesses are made`, () => {
        wordLib.newGameSpecificWord("magnolia");
        // wordLib.updateDisplayWord("magnolia", []);
        wordLib.makeGuess("y");
        wordLib.makeGuess("c");
        wordLib.makeGuess("z");
        wordLib.makeGuess("p");
        wordLib.makeGuess("j");
        wordLib.makeGuess("q");
        wordLib.makeGuess("k");
        const message = document.querySelector('.remaining');
        const actual = message.textContent;
        expect(actual).toContain("1 incorrect guess remaining");

    });

    it(`displays "Good guess!" after correct guess`, () => {
        wordLib.newGameSpecificWord("magnolia");
        // wordLib.updateDisplayWord("magnolia", []);
        wordLib.makeGuess("m");
        const message = document.querySelector('.message');
        const actual = message.textContent;
        expect(actual).toContain("Good guess!");

    });

    it(`displays "Sorry" after incorrect guess`, () => {
        wordLib.newGameSpecificWord("magnolia");
        // wordLib.updateDisplayWord("magnolia", []);
        wordLib.makeGuess("z");
        const message = document.querySelector('.message');
        const actual = message.textContent;
        expect(actual).toContain("Sorry");

    });

    it(`displays play again button after game is lost`, () => {
        wordLib.newGameSpecificWord("magnolia");
        wordLib.makeGuess("y");
        wordLib.makeGuess("c");
        wordLib.makeGuess("z");
        wordLib.makeGuess("p");
        wordLib.makeGuess("j");
        wordLib.makeGuess("q");
        wordLib.makeGuess("k");
        const playAgainButton = document.querySelector(".play-again");
        expect(playAgainButton.classList.contains("hide")).toBe(false);
    });

});

describe('startOver', () => {

    it('hides guess button', () => {
        wordLib.startOver();
        const guessButton = document.querySelector(".guess");
        expect(guessButton.classList.contains("hide")).toBe(true);
    });

    it('hides remaining guesses display', () => {
        wordLib.startOver();
        const remainingGuesses = document.querySelector(".remaining");
        expect(remainingGuesses.classList.contains("hide")).toBe(true);
    });

    it('hides guessed letters list', () => {
        wordLib.startOver();
        const guessedLetters = document.querySelector("ul");
        expect(guessedLetters.classList.contains("hide")).toBe(true);
    });

    it('unhides play again button', () => {
        wordLib.startOver();
        const playAgainButton = document.querySelector(".play-again");
        expect(playAgainButton.classList.contains("hide")).toBe(false);
    });
});


describe('Clicking guess button', () => {

    it('empties input', () => {
        const guessButton = document.querySelector(".guess");
        const guessInput = document.querySelector(".letter");
        guessInput.value = "stuff";
        guessButton.click();
        expect(guessInput.value).toBe("");
    });

    it('updates word display if correct letter is guessed', () => {
        wordLib.newGameSpecificWord("magnolia");
        const guessInput = document.querySelector(".letter");
        guessInput.value = "A";
        const guessButton = document.querySelector(".guess");
        guessButton.click();
        const display = document.querySelector('.word-in-progress');
        const actual = display.textContent;
        const expected = "●A●●●●●A";
        expect(actual).toBe(expected);


    });

});


