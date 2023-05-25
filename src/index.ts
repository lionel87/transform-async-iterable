const isIterable = <T>(x: any): x is Iterable<T> => typeof x?.[Symbol.iterator] === 'function';
const isAsyncIterable = <T>(x: any): x is AsyncIterable<T> => typeof x?.[Symbol.asyncIterator] === 'function';

export namespace transform {
	export type CallbackFn<T, R> = { (item: T): undefined | R | Iterable<R> | AsyncIterable<R> | Promise<R | Iterable<R> | AsyncIterable<R>> };
	export type SyncCallbackFn<T, R> = { (item: T): undefined | R | Iterable<R> };
}

export async function* transform<T, R>(it: Iterable<T> | AsyncIterable<T>, fn: transform.CallbackFn<T, R>): AsyncGenerator<R> {
	if (!isIterable(it) && !isAsyncIterable(it))
		throw new Error('Argument type mismatch: The first argument is expected to be "iterable" or "asyncIterable".');

	if (typeof fn !== 'function')
		throw new Error(`Argument type mismatch: The second argument is expected to be a "function", but received "${typeof fn === 'object' ? (fn ? 'object' : 'null') : typeof fn}".`);

	for await (const item of it) {
		const trResult = await fn(item);
		if (isIterable<R>(trResult) || isAsyncIterable<R>(trResult)) {
			for await (const trItem of trResult) {
				yield trItem;
			}
		} else if (typeof trResult !== 'undefined') {
			yield trResult;
		}
	}
}

export function* transformSync<T, R>(it: Iterable<T>, fn: transform.SyncCallbackFn<T, R>): Generator<R> {
	if (!isIterable(it))
		throw new Error('Argument type mismatch: The first argument is expected to be "iterable".');

	if (typeof fn !== 'function')
		throw new Error(`Argument type mismatch: The second argument is expected to be a "function", but received "${typeof fn === 'object' ? (fn ? 'object' : 'null') : typeof fn}".`);

	for (const item of it) {
		const trResult = fn(item);
		if (isIterable<R>(trResult)) {
			for (const trItem of trResult) {
				yield trItem;
			}
		} else if (typeof trResult !== 'undefined') {
			yield trResult;
		}
	}
}

export default transform;
