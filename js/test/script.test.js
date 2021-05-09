const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

// must load document here, or else import below will fail
document.documentElement.innerHTML = html.toString();
const wordLib = require("../main/script");

jest
    .dontMock('fs');



beforeEach(() => {
    
    document.innerHTML = html.toString();
    

});

afterEach(() => {
    // restore the original func after test
    jest.resetModules();
});

test('transformWord should return ●●●●●●●● when input string is magnolia and no letters have been guessed', () => {
    const input = "magnolia";
    const array = [];
    const output = wordLib.transformWord(input, array);
    const expected = "●●●●●●●●";
    expect(output).toBe(expected);
});

test(`transformWord should return ●a●●●●●a when input string is magnolia and only letter A has been guessed`, () => {
    const input = "magnolia";
    const array = ["A"];
    const output = wordLib.transformWord(input, array);
    const expected = "●A●●●●●A";
    expect(output).toBe(expected);
});

test('transformWord should return empty string when input string is empty', () => {
    const input = "";
    const array = [];
    const output = wordLib.transformWord(input, array);
    const expected = "";
    expect(output).toBe(expected);

});

test(`updateDisplayWord should display all circles when there are no guesses`, () => {
    wordLib.updateDisplayWord("magnolia", []);
    const display = document.querySelector('.word-in-progress');
    const actual = display.innerText;
    const expected = "●●●●●●●●";
    expect(actual).toBe(expected);
});

test(`updateDisplayWord should display hidden version depending on guesses`, () => {
    wordLib.updateDisplayWord("magnolia", ["A"]);
    const display = document.querySelector('.word-in-progress');
    const actual = display.innerText;
    const expected = "●A●●●●●A";
    expect(actual).toBe(expected);
});



test(`validateInput should output -1 if input is empty`, () => {
    const actual = wordLib.validateInput("");
    expect(actual).toBe(-1);
});

test(`validateInput should display error message if input is empty`, () => {
    wordLib.validateInput("");
    const message = document.querySelector('.message');
    const actual = message.innerText;
    expect(actual).toContain("empty");
});

test(`validateInput should output -2 if user inputs more than one letter`, () => {
    const actual = wordLib.validateInput("bm");
    expect(actual).toBe(-2);
});

test(`validateInput should display error message if input contains more than one letter`, () => {
    wordLib.validateInput("bm");
    const message = document.querySelector('.message');
    const actual = message.innerText;
    expect(actual).toContain("one letter");
});

test(`validateInput should output -3 if user inputs non-letter`, () => {
    const actual = wordLib.validateInput("5");
    expect(actual).toBe(-3);
});

test(`validateInput should display error message if input contains non-letter`, () => {
    wordLib.validateInput("5");
    const message = document.querySelector('.message');
    const actual = message.innerText;
    expect(actual).toContain("must be a letter");
});


test(`validateInput should output letter if user inputs single letter`, () => {
    const actual = wordLib.validateInput("f");
    expect(actual).toBe("f");
});

test(`makeGuess should display error message if letter has already been guessed`, () => {
    wordLib.makeGuess("f");
    wordLib.makeGuess("f");
    const message = document.querySelector('.message');
    const actual = message.innerText;
    expect(actual).toContain("already guessed");

});

test(`makeGuess should display one guessed letter on page`, () => {
    wordLib.makeGuess("f");
    const actualDisplay = document.querySelector(".guessed-letters");
    const actual = actualDisplay.innerHTML;
    expect(actual).toBe("<li>F</li>");
});



/* ---- TESTS FOR USER INTERACTIONS ---- */

/* Note: Form submission is not implemented in jsdom.  Need to find a way of
running UI tests like the ones below. Enzyme appears to do this, but I haven't
figured out how to make it work yet.

test('guess button should not reload page', () => {

    // MOCK window.location.reload
    // keep a copy of the window object to restore it at the end of the tests
    const oldWindowLocation = window.location;
    // delete the existing `Location` object from `jsdom`
    delete window.location;
    // create a new `window.location` object that's almost like the real thing
    window.location = Object.defineProperties(
        // start with an empty object on which to define properties
        {},
        {
            // grab all of the property descriptors for the `jsdom` `Location` object
            ...Object.getOwnPropertyDescriptors(oldWindowLocation),
            // overwrite a mocked method for `window.location.reload`
            reload: {
                configurable: true,
                value: jest.fn(),
            },
        }
    );

    const guessButton = document.querySelector('.guess');
    simulateClick(guessButton);

    expect(window.location.reload).not.toHaveBeenCalled();
    
    // restore `window.location` to the original `jsdom`
    // `Location` object
    window.location = oldWindowLocation;
});

test('guess button should empty input', () => {
    // const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
    // const onSubmit = jest.fn();
    // jest.spyOn(object, 'window.location.reload');
    
    // const wrapper = shallow(
    // <form action="" class="guess-form">
    //     <label for="letter">Type one letter:</label>
    //     <input type="text" name="letter" class="letter" />
    //     <div class="form-element button-element">
    //       <button class="guess">Guess!</button>
    //     </div>
    //   </form>);
    // const guessInput = wrapper.find('.letter');
    // guessInput.value = "stuff";
    // const guessButton = wrapper.find('.guess');
    // guessButton.simulate('click');
    const guessButton = document.querySelector(".guess");
    const guessInput = document.querySelector(".letter");
    guessInput.value = "stuff";
    guessButton.click();
    // const guessForm = document.querySelector(".guess-form");
    // guessForm.simulate("submit");
    expect(guessInput.value).toBe("");

});

*/

