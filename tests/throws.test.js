import { expect } from 'chai';
import { transform, transformSync } from '../esm/index.js';

describe('transformSync', () => {
	it('should throw an error for invalid input', async () => {
		const input = 123; // Invalid input
		const fn = item => item;
		expect(() => {
			for (const _ of transformSync(input, fn)) { }
		}).to.throw(Error);
	});

	it('should throw an error for invalid fn', async () => {
		const input = [1, 2, 3];
		const fn = 123; // Non-function callback
		expect(() => {
			for (const _ of transformSync(input, fn)) { }
		}).to.throw(Error);
	});
});

describe('transform', () => {
	it('should throw an error for invalid input', async () => {
		const input = 123; // Invalid input
		const fn = item => item;
		let errorThrown = false;
		try {
			for await (const _ of transform(input, fn)) { }
		} catch (error) {
			errorThrown = true;
			expect(error).to.be.an.instanceOf(Error);
		}
		expect(errorThrown).to.be.true;
	});

	it('should throw an error for invalid fn', async () => {
		const input = [1, 2, 3];
		const fn = 123; // Non-function callback
		let errorThrown = false;
		try {
			for await (const _ of transform(input, fn)) { }
		} catch (error) {
			errorThrown = true;
			expect(error).to.be.an.instanceOf(Error);
		}
		expect(errorThrown).to.be.true;
	});
});
