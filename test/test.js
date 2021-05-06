const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const {JSDOM} = require('jsdom');
const assert = require('assert');

JSDOM.defaultDocumentFeatures = {
    QuerySelector: true
  };
/* GLOBAL VARIABLES TO BE INITIATED BEFORE EACH TEST */
// var jsdom = {};
// var window = {};
// var document = {};
var wordLib = {};

beforeEach(() => {
    
    const jsdom = new JSDOM(html.toString());
    //console.log(jsdom.window.document.querySelector('.word-in-progress').innerHTML);
    global.document = jsdom.window.document;
    // console.log(document.querySelector("div"));
    // doument = window.document;
    // console.log(document);
   
    wordLib = require("../js/script");
});


describe('#transformWord', function () {
    it('should return ●●●●●●●● when input string is magnolia', function () {
        
        const input = "magnolia";
        const output = wordLib.transformWord(input);
        const expected = "●●●●●●●●";
        assert.strictEqual(output, expected);
    });

    it('should return empty string when input string is empty', function () {
        const input = "";
        const output = wordLib.transformWord(input);
        const expected = "";
        assert.strictEqual(output, expected);
    
    });
});

describe(`#updateDisplayWord`, function() {
    it(`should display hidden version of loaded word`, function () {
        // console.log(global.document);
        wordLib.updateDisplayWord("magnolia");
        const display = document.querySelector(".word-in-progress");
        console.dir(display);
        const actual = document.querySelector('.word-in-progress').textContent;
        const expected = "●●●●●●●●";
        assert.strictEqual(actual, expected);
    });
});
