Rollup Flow plugin
==================

[![Build Status](https://travis-ci.org/leebyron/rollup-plugin-flow.svg?branch=master)](https://travis-ci.org/leebyron/rollup-plugin-flow)

This [Rollup](http://rollupjs.org/) plugin will remove [Flow](https://flowtype.org)
type annotations during bundling using [`flow-remove-types`](https://github.com/leebyron/flow-remove-types).

## Install

```
npm install --save rollup-plugin-flow
```

```js
var rollup = require('rollup').rollup;
var flow = require('rollup-plugin-flow');

rollup({
  entry: 'main.js',
  plugins: [ flow() ]
}).then(...);
```

## Options

Provide options as an object argument to `flow()`.

#### `all` - Transform all files, not just those containing `@flow` comments.

*Default:* `false`

```js
var flow = require('../');

module.exports = {
  plugins: [ flow({ all: true }) ],
  format: 'cjs'
};
```

#### `pretty` - Remove flow types without replacing them with whitespace.

*Default:* `false`

*Note:* Typically source maps are not necessary for this transform, however
source maps are recommended when generating "pretty" results.

```js
var flow = require('../');

module.exports = {
  plugins: [ flow({ pretty: true }) ],
  format: 'cjs'
};
```
