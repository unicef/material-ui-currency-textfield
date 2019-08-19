# css-initials

Initial CSS values for `all: initial` polyfills.

## Table of Contents

* [Usage](#usage)
  * [vanilla css](#vanilla-css)
  * [css-modules](#css-modules)
  * [jss](#jss)
  * [styled-components](#styled-components)
* [FAQ](#faq)

## Usage

### Vanilla css

Import `all.css` or `inherited.css` file and add the class `initials-all` or `initials-inherited` to an element you want to have initial values.

```css
/**
 * On the very top of your ./styles/main.css
 */
 @import './css/css-initials.css';

/*
 * Those properties depend on a browser and user settings. You can reset them manually
 * if you want them to behave consistently.
 */
.initials-all {
  font-family: Arial, "sans-serif";
  text-align: left;
  quotes: "“" "”" "‘" "’";
  color: black;
  outline-color: black;
}

/* user styles here */

.button {
  /* …more user styles here…*/
}
```

In HTML, just add css-initials class in the start

```html
<button class="initials-all button">Submit</button>
```

### css-modules

```css
/**
 * Once in your project, specify your
 * ./src/components/app-css-initials/index.css
 */
.app-css-initials {
  composes: css-initials from 'css-initials/index.css';

  font-family: Arial, "sans-serif";
  text-align: left;
  quotes: "“" "”" "‘" "’";
  color: black;
  outline-color: black;
}

/**
 *  Anywhere after in your components
 *  ./src/components/button/index.css
 */
.button {
  composes: app-css-initials from './app-css-initials.css';
  /* …more user styles here…*/
}

```

### css-in-js

#### JSS

```js
import cssInitials from 'css-initials';
import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

const myCssInitials = Object.assign({}, cssInitials, {
  fontFamily: 'Arial, sans-serif',
  textAlign: 'left',
  quotes: '"“" "”" "‘" "’"',
  color: 'black',
  outlineColor: 'black',
});

const sheet = jss.createStyleSheet({ initials: myCssInitials }).attach();

const {classes} = jss.createStyleSheet({
  button: {
    composes: sheet.classes.initials,
    background: 'blue',
  }
}).attach();

document.body.innerHTML = `
  <button class="${classes.button}">Button</button>
`;

```
#### styled-components

```js
// Once in your project, specify your
// ./src/components/app-css-initials/index.js
import cssInitials from 'css-initials';

const toCSS = obj => Object.keys(obj).map(key => `${key}: ${obj[key]};`).join('\n');

export default `
  ${toCSS(cssInitials)}
  font-family: Arial, 'sans-serif';
  text-align: left;
  quotes: "“" "”" "‘" "’";
  color: black;
  outline-color: black;
`;

// Anywhere after in your components
// ./src/components/button/index.js
import React from 'react';
import styled from 'styled-components';
import initials from '../app-css-initials';

const Button = styled.button`
  ${initials}
  display: inline-block;
  border-radius: 5px;
  /* …more styles here…*/
`;

export default Button;
```

## FAQ

—**What is wrong with the usual `all: initial`?**  
—It's [not supported in IE, Edge, Mobile android][IEEDGE].

—**What do you mean by cross-browser?**  
—I took all properties and combined 'em with their initial values, so it works in every browser, because its essentially `all: initial`, but expanded.

—**What do you mean by thoughtful?**  
—There are several caveats about `all: initial` as it is now, and I have built this package with those caveats in mind.

—**What are the caveats?**  
— 1) Initial values of `font-family`, `quotes` and `color` depend on the browser  
— 2) 14 properties depend on `currentColor`, which is a reference to the `color` property, which varies from browser to browser (hence prev point), and these properties are: `-webkit-border-before-color`, `-webkit-text-fill-color`, `-webkit-text-stroke-color`, `border-block-end-color`, `border-block-start-color`, `border-bottom-color`, `border-inline-end-color`, `border-inline-start-color`, `border-left-color`, `border-right-color`, `border-top-color`, `column-rule-color`, `text-decoration-color`, `text-emphasis-color`.  
— 3) Initial value of `outline-color` is either `invert` if the browser supports it, or `currentColor` otherwise.

—**Is this all?**  
—It depends. If you want military grade CSS cascade defense, then no, otherwise hold on. Thing is that according to the spec, `all: initial` doesn't apply initial values to `unicode-bidi` and `direction`.

—**I've never heard of `unicode-bidi`.**  
—To be honest, me neither. It is quite complicated and I don't know why one would need it. But as long as this property is not inherited it's safe to leave it untouched.

—**What's up with `direction`?**  
—Good question. Firstly, `direction` deals with the `ltr/rtl` problem. Secondly, it is inheritable, so it will definitely affect your components. It can have a negative impact on your components' isolation, so it also doesn't make sense to allow your components to inherit `direction` from the outside world. Your components should be optimised for `ltr` anyway, and `direction: rtl` wont make 'em automatically look good in arabic or hebrew. To fix `ltr/rtl` problem properly you would need a solution like [rtlcss][], because you not only want to change direction, but you want to adjust `text-align`, `margin`, `padding`, `border-width`, etc.

—**Is this all?**  
—yes, thanks for your attention.

[IEEDGE]: http://caniuse.com/#feat=css-all
[rtlcss]: https://github.com/MohammadYounes/rtlcss
