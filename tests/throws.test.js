import assert from 'assert';
import { transform, transformSync } from '../esm/index.js';

describe('Throws Tests for transformSync()', () => {
	it('should throw an error for invalid input', async () => {
		const input = 123; // Invalid input
		const fn = item => item;

		assert.throws(() => {
			for (const _ of transformSync(input, fn)) { }
		}, { message: `Argument type mismatch: The first argument is expected to be "iterable".` });
	});

	it('should throw an error for invalid fn', async () => {
		const input = [1, 2, 3];
		const fn = 123; // Non-function callback

		assert.throws(() => {
			for (const _ of transformSync(input, fn)) { }
		}, { message: `Argument type mismatch: The second argument is expected to be a "function", but received "number".` });
	});
});

describe('Throws Tests for transform()', () => {
	it('should throw an error for invalid input', async () => {
		const input = 123; // Invalid input
		const fn = item => item;

		await assert.rejects(async () => {
			for await (const _ of transform(input, fn)) { }
		}, { message: `Argument type mismatch: The first argument is expected to be "iterable" or "asyncIterable".` });
	});

	it('should throw an error for invalid fn', async () => {
		const input = [1, 2, 3];
		const fn = 123; // Non-function callback

		await assert.rejects(async () => {
			for await (const _ of transform(input, fn)) { }
		}, { message: `Argument type mismatch: The second argument is expected to be a "function", but received "number".` });
	});
});
