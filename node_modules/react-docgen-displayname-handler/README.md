# react-docgen-displayname-handler [![Build Status](https://travis-ci.org/nerdlabs/react-docgen-displayname-handler.svg?branch=master)](https://travis-ci.org/nerdlabs/react-docgen-displayname-handler)
A handler for react-docgen that tries to infer the displayName of a component.

## Rationale
[react-docgen](https://github.com/reactjs/react-docgen) is a CLI and API toolbox
to help extract information from [React](http://facebook.github.io/react/)
components and generate documentation from it.

`react-docgen-displayname-handler` is a custom handler for `react-docgen` and can be
used to infer the displayName for a given component.

The handler tries to infer the displayName from the following sources:
- a static `displayName` property on the object / class
- the name of the function or class declaration/expression
- the name of the variable the component is assigned to
- (optional) the file name (if it is not "index")
- (optional) the last part of the file path (directory name)
- if everything fails the displayName is set to `UnknownComponent`

## Installation
Install `react-docgen-displayname-handler` from [npm](https://www.npmjs.com/package/react-docgen-displayname-handler)

```shell
npm install --save react-docgen-displayname-handler
```

## Usage
Unfortunately there is currently no easy way to use custom handlers with the
[react-docgen CLI](https://github.com/reactjs/react-docgen#cli).

Discussions and Ideas about how to make this easier are happening in the
[react-docgen issue discussions](https://github.com/reactjs/react-docgen/issues/115).

If you want to use this module programmatically check out the [react-docgen API docs](https://github.com/reactjs/react-docgen#api) for more information about
the `react-docgen` API.  
Below is a small example that demonstrates how to
integrate `react-docgen-displayname-handler`.

```javascript
import reactDocs from 'react-docgen';
import displayNameHandler from 'react-docgen-displayname-handler';
const resolver = reactDocs.resolver.findExportedComponentDefinition;
const handlers = reactDocs.handlers.concat(displayNameHandler);
const documentation = reactDocs.parse(src, resolver, handlers);
```
If you want to use the filepath for displayName resolution too, check out the
following example:
```javascript
import reactDocs from 'react-docgen';
import { createDisplayNameHandler } from 'react-docgen-displayname-handler';
const resolver = reactDocs.resolver.findExportedComponentDefinition;
const handlers = reactDocs.handlers.concat(createDisplayNameHandler(filePath));
const documentation = reactDocs.parse(src, resolver, handlers);
```
In order to use the file path too, you need to import the named export
`createDisplayNameHandler` which takes as an argument the file path and returns
a handler function that can be passed to react-docgen.

## Examples
When using this custom handler with `react-docgen` it will try to find the
displayName of the component as outlined above.

```javascript
import React from 'react';
export default class X {
  static displayName = 'MyComponent'
  render() {
    return <div />;
  }
}
```

```json
{
  "displayName": "MyComponent",
  "props": {...}
}
```

```javascript
import React from 'react';
export default class MyComponent {
  render() {
    return <div />;
  }
}
```

```json
{
  "displayName": "MyComponent",
  "props": {...}
}
```

For more information about the data format see the [react-docgen readme](https://github.com/reactjs/react-docgen#result-data-structure)
