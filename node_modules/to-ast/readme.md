# to-ast

This module converts JavaScript objects to an equivalent abstract syntax tree representation, 
compatible with the [Mozilla Parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API).
You can use it to generate JavaScript source code from objects, using 
[escodegen](https://github.com/estools/escodegen).

## Usage

Install with npm:

    npm install to-ast

Here's a simple example:

```javascript

var toAST = require('to-ast');
var escodegen = require('escodegen');

// get an AST from a number...
toAST(2) //=> { type: 'Literal', value: 2 }

// or if you want a source string...
escodegen.generate(toAST(2)) //=> '2'
```

## Supported types

* undefined
* null
* number, string, and boolean literals
* functions
* Node buffers
* arrays
* String, Number, and Boolean object wrappers
* typed arrays and array buffers
* dates
* errors
* regular expressions
* object literals

## Custom types

Most built-in JavaScript types as supported out of the box, but if you want to override the behavior for
your particular object, you can provide a `toAST` method on your object:

```javascript
var toAST = require('to-ast');
var escodegen = require('escodegen');

function Person(name) {
  this.name = name;
}

Person.prototype.toAST = function() {
  return {
    type: 'NewExpression',
    callee: { type: 'Identifier', name: 'Person' },
    arguments: [{ type: 'Literal', value: this.name }]
  };
};

escodegen.generate(toAST(new Person('Devon'))) //=> "new Person('Devon')"
```

## License

MIT
