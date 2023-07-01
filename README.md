# Transform Async Iterable

[![Build Status](https://github.com/lionel87/transform-async-iterable/actions/workflows/build.yaml/badge.svg)](https://github.com/lionel87/transform-async-iterable/actions/workflows/build.yaml)
[![Coverage Status](https://coveralls.io/repos/github/lionel87/transform-async-iterable/badge.svg?branch=master)](https://coveralls.io/github/lionel87/transform-async-iterable?branch=master)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@static-pages/transform-async-iterable?label=quality)
![Maintenance](https://img.shields.io/maintenance/yes/2023)

`transform-async-iterable` is a TypeScript package that provides a utility function for transforming iterables and async iterables with a custom transformation function. It enables developers to easily apply transformations to each item in an iterable and generate a new iterable with the transformed results. This module is particularly useful when dealing with collections of data and needing to perform consistent operations on each item.

## Key Features

- Supports transformation of both synchronous and asynchronous iterables.
- Handles both single-item (filter, map) and multi-item (merge, split) transformations.
- Maintains lazy evaluation, only transforming items when they are iterated over.
- Seamless TypeScript Integration: allows you to leverage the full potential of static typing and type checking during your transformations.
- Provides a clean and expressive syntax for transforming data collections.
- Effortlessly apply transformations to a wide range of data structures, including arrays, sets, maps, and custom iterable objects (like NodeJS object streams).


Install it via your preferred package manager:

```sh
npm install transform-async-iterable
```

or

```sh
yarn add transform-async-iterable
```


## Usage

Here's how you can use `transform-async-iterable` in your TypeScript/JavaScript project:

1. Import the `transform` function:

```js
import transform from 'transform-async-iterable';
```

2. Define your custom transformation function:

```js
const transformFunction = (item) => {
	// Apply your transformation logic here
	return transformedItem;
};
```

3. Create an iterable or async iterable that you want to transform:

```js
const data = [1, 2, 3, 4, 5];
```

4. Call the `transform` function, passing in the iterable and transformation function:

```js
const transformedData = transform(data, transformFunction);
```

5. Iterate over the transformed iterable and access the transformed items:

```js
for await (const item of transformedData) {
	// Use the transformed item in your code
}
```


## API

### `transform<T, R>(it: Iterable<T> | AsyncIterable<T>, fn: CallbackFn<T, R>): AsyncGenerator<R>`

The `transform` function accepts two arguments:

* `it`: The iterable or async iterable to be transformed.
* `fn`: The transformation function that will be applied to each item in the iterable.

The transformation function, `fn`, is defined using the `CallbackFn` type:
```ts
type CallbackFn<T, R> = { (item: T): undefined | R | Iterable<R> | AsyncIterable<R> | Promise<R | Iterable<R> | AsyncIterable<R>> };
```
This allows for flexible transformation operations that can return single transformed item or multiple items in an iterable.
The transformation function can indicate to remove an item from the produced iterable via returning `undefined` value.

> Note: the `transform()` call always returns an async iterable object, even when the input and the transform function could work in sync mode.


### `transformSync<T, R>(it: Iterable<T>, fn: SyncCallbackFn<T, R>): Generator<R>`

The `transformSync` function accepts two arguments:

* `it`: The iterable to be transformed.
* `fn`: The transformation function that will be applied to each item in the iterable.

The transformation function, `fn`, is defined using the `SyncCallbackFn` type:
```ts
type SyncCallbackFn<T, R> = { (item: T): undefined | R | Iterable<R> };
```
This allows for flexible transformation operations that can return single transformed item or multiple items in an iterable.
The transformation function can indicate to remove an item from the produced iterable via returning `undefined` value.


## Examples

Here are some examples to demonstrate the usage:

### Example 1: Mapping an array of numbers
```js
import transform from 'transform-async-iterable';

const data = [1, 2, 3, 4, 5];

const transformedData = transform(data, (item) => {
  return item * 2;
});

for await (const item of transformedData) {
  console.log(item);
}
```

Output:

```text
2
4
6
8
10
```


### Example 2: Mapping an async iterable of objects

```js
import transform from 'transform-async-iterable';

async function* fetchData() {
  yield { id: 1, name: 'John' };
  yield { id: 2, name: 'Jane' };
}

const capitalizeName = async (item) => {
  const capitalized = item.name.toUpperCase();
  return { ...item, name: capitalized };
};

const transformedData = transform(fetchData(), capitalizeName);

for await (const item of transformedData) {
  console.log(item);
}
```

Output:

```text
{ id: 1, name: 'JOHN' }
{ id: 2, name: 'JANE' }
```


### Example 3: Filtering and splitting

```js
import transform from 'transform-async-iterable';

async function* fetchData() {
  yield { id: '1', name: 'John' };
  yield { id: '2', name: 'Jane' };
  yield { id: '3', name: 'Doe' };
  yield { id: '4', name: 'Steve,Emma' };
}

const transformedData = transform(fetchData(), (item) => {
  if (item.name === 'Doe') return; // remove from the collection
  if (item.name.includes(',')) { // split names to two objects
    return item.name.split(',')
      .map((name, idx) => ({
        id: item.id + '-' + idx,
        name: name,
      }));
  }
  return item; // keep the rest as-is
});

for await (const item of transformedData) {
  console.log(item);
}
```

Output:

```text
{ id: '1', name: 'John' }
{ id: '2', name: 'Jane' }
{ id: '4-0', name: 'Steve' }
{ id: '4-1', name: 'Emma' }
```


### Example 3: Merging

```js
import transform from 'transform-async-iterable';

async function* fetchData() {
  yield 'a';
  yield 'b';
  yield '\n';
  yield 'c';
  yield 'd';
  yield '\n';
}

let buffer = '';
const transformedData = transform(fetchData(), (item) => {
  if (item === '\n') {
    const line = buffer;
    buffer = '';
    return line;
  }
  buffer += item;
});

for await (const item of transformedData) {
  console.log(item);
}
```

Output:

```text
ab
cd
```

## Contributions

Contributions to `transform-async-iterable` are welcome! If you have any bug reports, feature requests, or improvements, please open an issue on the [GitHub repository](https://github.com/lionel87/transform-async-iterable).

## License

`transform-async-iterable` is licensed under the [MIT License](https://github.com/lionel87/transform-async-iterable/blob/master/LICENSE).
