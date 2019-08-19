[![Build Status](https://travis-ci.org/Jmeyering/react-docgen-annotation-resolver.svg?branch=master)](https://travis-ci.org/Jmeyering/react-docgen-annotation-resolver)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# react-docgen-annotation-resolver

Parse `@component` annotated export as a react component.

```
const myComponent = () => (
  <h1>Component</h1>
);

/**
 * @component
 */
export default myComponent;
```
