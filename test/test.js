const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const { JSDOM } = require('jsdom');
const assert = require('assert');

// JSDOM.defaultDocumentFeatures = {
//     QuerySelector: true
//   };
/* GLOBAL VARIABLES TO BE INITIATED BEFORE EACH TEST */
// var jsdom = {};
// var window = {};
// var document = {};
const jsdomInit = new JSDOM(html.toString(), {url: 'http://localhost' });
global.document = jsdomInit.window.document;
var wordLib = require("../js/script");

describe(`Word-Guess Test Suite`, function () {


    beforeEach(() => {

        const jsdom = new JSDOM(html.toString(), { url: 'http://localhost' });
        //console.log(jsdom.window.document.querySelector('.word-in-progress').innerHTML);
        global.document = jsdom.window.document;
        // console.log(document.querySelector("div"));
        // doument = window.document;
        // console.log(document);
        const htmlAfterLoading = global.document.documentElement.innerHTML;

    });

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = '';
        const htmlAfterClear = document.documentElement.innerHTML;
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

    describe(`#updateDisplayWord`, function () {
        it(`should display hidden version of loaded word`, function () {
            // console.log(global.document);
            const htmlStartOfUpdateDisplayWord = document.documentElement.innerHTML;
            wordLib.updateDisplayWord("magnolia");
            const htmlAfterUpdateDisplayWord = document.documentElement.innerHTML;
            const display = document.querySelector(".word-in-progress");
            console.log(`Current display: ${global.document.querySelector(".word-in-progress").textContent}`);
            console.dir(global.document.querySelector(".play-again").textContent);
            const actual = global.document.querySelector('.word-in-progress').textContent;
            const expected = "●●●●●●●●";
            assert.strictEqual(actual, expected);
        });
    });


});
