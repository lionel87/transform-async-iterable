// import transform from 'transform-it';
import transform from './src/index.js';

const markdownReader = (opts) => [];
const twigWriter = (opts) => (iterable) => null;


for await (const item of transform([{a: 1, b: 123},{a:2}], ({ a, b }) => ({ b: a, c: b }))) {
	item.c
}

const myController1 = async function *(item) { yield item; };
const myController2 = async function (item) { return item; };
const myController3 = function (item) { return item; };

type Data = Record<string, string>;

const render = twigWriter({ });
const consume = (iterable: Iterable<Data>) => render(transform(iterable, myController3));

const contentPages = markdownReader({ });

consume(contentPages);
