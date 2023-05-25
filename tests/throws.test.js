import tap from 'tap';
import { transform, transformSync } from '../esm/index.js';

tap.test('transformSync should throw an error for invalid input', async (t) => {
	const input = 123; // Invalid input
	const fn = item => item;
	try {
		for (const _ of transformSync(input, fn)) { }
		t.fail('Expected an error to be thrown');
	} catch (error) {
		t.ok(error instanceof Error, 'Error should be thrown');
	}
	t.end();
});

tap.test('transformSync should throw an error for invalid fn', async (t) => {
	const input = [1, 2, 3];
	const fn = 123; // Non-function callback
	try {
		for (const _ of transformSync(input, fn)) { }
		t.fail('Expected an error to be thrown');
	} catch (error) {
		t.ok(error instanceof Error, 'Error should be thrown');
	}
	t.end();
});

tap.test('transform should throw an error for invalid input', async (t) => {
	const input = 123; // Invalid input
	const fn = item => item;
	try {
		for await (const _ of transform(input, fn)) { }
		t.fail('Expected an error to be thrown');
	} catch (error) {
		t.ok(error instanceof Error, 'Error should be thrown');
	}
	t.end();
});

tap.test('transform should throw an error for invalid fn', async (t) => {
	const input = [1, 2, 3];
	const fn = 123; // Non-function callback
	try {
		for await (const _ of transform(input, fn)) { }
		t.fail('Expected an error to be thrown');
	} catch (error) {
		t.ok(error instanceof Error, 'Error should be thrown');
	}
	t.end();
});
