const isIterable = <T>(x: unknown extends Iterable<T> ? Iterable<T> : any): x is Iterable<T> => typeof x?.[Symbol.iterator] === 'function';
const isAsyncIterable = <T>(x: unknown extends Iterable<T> ? Iterable<T> : any): x is AsyncIterable<T> => typeof x?.[Symbol.asyncIterator] === 'function';

type MaybePromise<T> = T | Promise<T>;

export namespace transform {
	export type CallbackFn<T, R> = { (item: T): MaybePromise<R | Iterable<R> | AsyncIterable<R> | undefined> };
}

export namespace transformSync {
	export type SyncCallbackFn<T, R> = { (item: T): R | Iterable<R> | undefined };
}

export async function* transform<T, R>(it: Iterable<T> | AsyncIterable<T>, fn: transform.CallbackFn<T, R>) {
	if (!isIterable(it) && !isAsyncIterable(it))
		throw new Error('Argument type mismatch: The first argument is expected to be "iterable" or "asyncIterable".');

	if (typeof fn !== 'function')
		throw new Error(`Argument type mismatch: The second argument is expected to be a "function", but received "${typeof fn === 'object' ? (fn ? 'object' : 'null') : typeof fn}".`);

	for await (const item of it) {
		const result = await fn(item);
		if (isIterable(result) || isAsyncIterable(result)) {
			yield* result;
		} else if (typeof result !== 'undefined') {
			yield result;
		}
	}
}

export function* transformSync<T, R>(it: Iterable<T>, fn: transformSync.SyncCallbackFn<T, R>) {
	if (!isIterable(it))
		throw new Error('Argument type mismatch: The first argument is expected to be "iterable".');

	if (typeof fn !== 'function')
		throw new Error(`Argument type mismatch: The second argument is expected to be a "function", but received "${typeof fn === 'object' ? (fn ? 'object' : 'null') : typeof fn}".`);

	for (const item of it) {
		const result = fn(item);
		if (isIterable(result)) {
			yield* result;
		} else if (typeof result !== 'undefined') {
			yield result;
		}
	}
}

export default transform;
