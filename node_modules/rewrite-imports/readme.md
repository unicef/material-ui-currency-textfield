# rewrite-imports [![Build Status](https://travis-ci.org/lukeed/rewrite-imports.svg?branch=master)](https://travis-ci.org/lukeed/rewrite-imports)

> Rewrite `import` statements as `require()`s; via RegExp

Quickly transforms various `import` statements into ES5-compatible `require()` statements.

> **Note:** This module returns a String and **does not** provide a runtime nor does it evaluate the output.

> :bulb: For this behavior, visit [`rewrite-module`](https://github.com/lukeed/rewrite-module) or check out [`@taskr/esnext`](https://github.com/lukeed/taskr/tree/master/packages/esnext) for an example!

## Install

```
$ npm install --save rewrite-imports
```


## Usage

```js
const rewriteImports = require('rewrite-imports');

rewriteImports(`import foo from '../bar'`);
//=> const foo = require('../bar');

rewriteImports(`import { foo } from 'bar'`);
//=> const bar$1 = require('bar');
//=> const foo = bar$1.foo;

rewriteImports(`import * as path from 'path';`);
//=> const path = require('path');

rewriteImports(`import { foo as bar, baz as bat, lol } from 'quz';`);
//=> const quz$1 = require('quz');
//=> const bar = quz$1.foo;
//=> const bat = quz$1.baz;
//=> const lol = quz$1.lol;
```


## API

### rewriteImports(input)

#### input
Type: `String`

An `import` statement. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) for valid Syntax.


## License

MIT © [Luke Edwards](https://lukeed.com)
