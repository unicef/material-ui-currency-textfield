'use strict';

const UNNAMED = /import\s*['"]([^'"]+)['"];?/gi;
const NAMED = /import\s*(\{?)([\s\S]*?)\}?\s*from\s*['"]([^'"]+)['"];?/gi;

function alias(key) {
	key = key.trim();
	let name = key.split(' as ');
	(name.length > 1) && (key=name.shift());
	return { key, name:name[0] };
}

function single(key, dep) {
	return `const ${alias(key).name} = require('${dep}');`;
}

function multi(keys, dep) {
	let tmp = dep.split('/').pop().replace(/\W/g, '_') + '$1'; // uniqueness
	let obj, out = single(tmp, dep);
	keys.split(',').forEach(key => {
		obj = alias(key);
		out += `\nconst ${obj.name} = ${tmp}.${obj.key};`;
	});
	return out;
}

module.exports = function (str) {
	return str
		.replace(NAMED, (_, bracket, req, dep) => bracket ? multi(req, dep) : single(req, dep))
		.replace(UNNAMED, (_, dep) => `require('${dep}');`);
}
