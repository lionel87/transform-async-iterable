const { expect } = require('chai');
const { transformSync } = require('../cjs/index.js');

const seq = n => Array.from({ length: n }, (v, i) => ({ a: i }));

describe('transformSync', () => {
  it('can be imported in commonjs format', () => {
    const input = seq(5);
    const expected = seq(5);

	const output = [...transformSync(input, x => x)];

    expect(output).to.deep.equal(expected);
  });
});
