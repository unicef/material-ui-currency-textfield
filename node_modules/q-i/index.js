'use strict';

const isPlainObject = require('is-plain-object');
const stringifyObject = require('stringify-object');
const ansi = require('ansi-styles');

const internals = ['Array', 'Object', 'Function'];

const style = (v, s) => `${ansi[s].open}${v}${ansi[s].close}`;

const color = (v, c) => `${ansi.color[c].open}${v}${ansi.color.close}`;

const getArraySize = o => Array.isArray(o) && o.length;

const getObjectSize = o => isPlainObject(o) && Object.keys(o).length;

const getFunctionSize = o => typeof o === 'function' && o.toString().split('\n').length;

const getConstructor = v => {
	if (v === null) {
		return 'Null';
	}

	if (v === undefined) {
		return 'Undefined';
	}

	return v.constructor && v.constructor.name;
};

const printers = {
	Null: v => style(v, 'italic'),
	Undefined: v => style(v, 'italic'),
	Boolean: v => color(v, 'magenta'),
	Number: v => color(v, 'cyan'),
	String: v => color(v, 'green'),
	RegExp: v => color(v, 'yellow'),
};

function stringify(object, options) {
	const maxItems = (options && options.maxItems) || 30;
	const maxLines = (options && options.maxLines) || 1;

	return stringifyObject(object, {
		indent: '  ',
		transform: (obj, key, originalResult) => {
			const value = obj[key];

			const arraySize = getArraySize(value);
			if (arraySize > maxItems) {
				return [key, style(`Array[${arraySize}]`, 'dim')];
			}

			const objectSize = getObjectSize(value);
			if (objectSize > maxItems) {
				return style(`Object {${objectSize}}`, 'dim');
			}

			const functionSize = getFunctionSize(value);
			if (functionSize > maxLines) {
				return style(`Function ${value.name || ''}`, 'dim');
			}

			const ctr = getConstructor(value);

			if (printers[ctr]) {
				return printers[ctr](originalResult);
			}

			if (ctr && internals.indexOf(ctr) === -1) {
				return `${ctr} ${originalResult}`;
			}

			return originalResult;
		},
	});
}

function print(object, options) {
	// eslint-disable-next-line no-console
	console.log(stringify(object, options));
}

module.exports = {
	print,
	stringify,
};
