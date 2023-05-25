const tap = require('tap');
const { transform } = require('../cjs/index.js');

const seq = n => Array.from(new Array(n)).map((v, i) => ({ a: i }));

tap.test('can be imported in commonjs format', async () => {
	const input = seq(5);
	const expected = seq(5);

	const output = [...input];

	tap.match(output, expected);
});
