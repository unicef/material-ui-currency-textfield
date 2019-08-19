# `Function.name`

## Overview

A polyfill for the basic functionality of [`Function.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) accessor property in its [pre-ES6 form](#pre-es6-form).


## Usage

### Named function declarations

```js
function hello() {
  /* ... */
}
console.log(hello.name);  // "hello"
```

### Named function expressions

```js
var fn = function foo() {
  /* ... */
};
console.log(fn.name);  // "foo"
```


## Browser Compatibility

Most modern browsers have already supported this basic functionality for quite some time but this polyfill will apply to _at least_ the following:
 - IE `>=9 <12`
 - Chrome `<33`

For IE `<9`, you can still use `fn._name()` instead.


### Caveats

#### Pre-ES6 Form

 - In short, this means that this polyfilled `name` accessor property can provide you with the name of a named function definition (either a named function declaration or a named function expression).
 - Unlike other browsers with a similar support level for the pre-ES6 form, this poyfilled `name` accessor property is also intentionally marked as **configurable**.

#### Chrome `<5`

 - When polyfilling for Chrome `<5`, the accessor property will be **configurable** (expected) _AND_ **enumerable** (unexpected) due to having to implement it using [`Object.prototype.__defineGetter__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__) instead of [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).


## Other Documentation

 - [ES6 / ES2015 specification for `Function.name`](http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname)
