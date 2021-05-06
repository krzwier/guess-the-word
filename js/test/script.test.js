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

test('transformWord should return ●●●●●●●● when input string is magnolia', () => {
    const input = "magnolia";
    const output = wordLib.transformWord(input);
    const expected = "●●●●●●●●";
    expect(output).toBe(expected);
});

test('transformWord should return empty string when input string is empty', () => {
    let lib = require("../main/script");
    const input = "";
    const output = wordLib.transformWord(input);
    const expected = "";
    expect(output).toBe(expected);

});

test(`updateDisplayWord should display hidden version of loaded word`, () => {
    wordLib.updateDisplayWord("magnolia");
    console.log(document);
    const display = document.querySelector('.word-in-progress');
    
    const actual = display.innerText;
    const expected = "●●●●●●●●";
    expect(actual).toBe(expected);
});


test(`validateInput should output message if input is empty`, () => {
    const actualMessage = wordLib.validateInput("");
    expect(actualMessage).toContain("empty");

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

