const assert = require('assert');
const { transformSync } = require('../cjs/index.js');

const seq = n => Array.from({ length: n }, (v, i) => ({ a: i }));

describe('CommonJS module Tests', () => {
  it('can be imported in commonjs format', () => {
    const input = seq(5);
    const expected = seq(5);

    const output = [...transformSync(input, x => x)];

    assert.deepStrictEqual(output, expected);
  });
});
