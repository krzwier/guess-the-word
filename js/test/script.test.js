const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

jest
    .dontMock('fs');


beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    
});

afterEach(() => {
    // restore the original func after test
    jest.resetModules();
});

test('transformWord: input magnolia, output ●●●●●●●●', () => {
    const transformWord = require("../main/script");
    const input = "magnolia";
    const output = transformWord(input);
    const expected = "●●●●●●●●";
    expect(output).toBe(expected);
});

test('transformWord: input empty string, output empty string', () => {
    const transformWord = require("../main/script");
    const input = "";
    const output = transformWord(input);
    const expected = "";
    expect(output).toBe(expected);
    
});

test(`updateDisplayWord: updates display with circle version of loaded word`, () => {
    const display = document.querySelector('.word-in-progress').innerText;
});

