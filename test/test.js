var assert = require('assert');


describe('#transformWord', function() {
    it('should return ●●●●●●●● when input string is magnolia', function() {
        const input = "magnolia";
        const output = wordLib.transformWord(input);
        const expected = "●●●●●●●●";
        assert.strictEqual(output, expected);
    });
});
