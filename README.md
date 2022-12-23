# Material-ui currency textfield (IN PROGRESS)
[![npm version](https://badge.fury.io/js/%40unicef%2Fmaterial-ui-currency-textfield.svg)](https://badge.fury.io/js/%40unicef%2Fmaterial-ui-currency-textfield)

`CurrencyTextField` is a  [Material-ui](https://material-ui.com/) [react](https://reactjs.org/) component. It provides a user friendly experience while inputing currency numbers. 

`CurrencyTextField` wraps the functionality of <a href="https://github.com/autoNumeric/autoNumeric">autonumeric</a> and it is a port of <a href="https://github.com/mkg0/react-numeric">react-numeric</a> in Material-ui.

![Example of material](https://raw.githubusercontent.com/unicef/material-ui-currency-textfield/master/material-ui-currency-field.gif)

Main features:
 * Adds thousands separator automatically.
 * Adds automatically the decimals on blur.
 * Smart input. User can only type the accepted characters depending on the current value.
 * Lots of config options...

## Install

 ```bash
 npm install @unicef/material-ui-currency-textfield --save
```

## Usage

**[Documentation and live demo is available here](https://unicef.github.io/material-ui-currency-textfield/)**


```jsx
import React from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export default function MyComponent() {

  const [value, setValue] = React.useState();

  return (
    <CurrencyTextField
		label="Amount"
		variant="standard"
		value={value}
		currencySymbol="$"
		//minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		onChange={(event, value)=> setValue(value)}
    />
  );
}
```


## Development

In order to extend the component, clone the project and install the dependencies.
```bash
$ git clone https://github.com/unicef/material-ui-currency-textfield.git
$ npm install
```

The following commands are available: 

### `npm start`

Builds the component outputing it in the `dist` folder. It is refreshed everytime you make changes in the code.

```bash
npm start
```

To see the output in the browser run the example app ([/example](https://github.com/unicef/material-ui-currency-textfield/tree/master/example))

```bash
 cd example 
 npm install (only first time)
 npm start
 ```
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

It will reload automatically upon edits. Lint errors are also displayed on the console.

### `npm run build`

Outputs the build for production to the `dist` folder.

### `npm run styleguide`
Generates the documentation available on.

Open [http://localhost:6060](http://localhost:6060) to view it in the browser.

It watches for changes and automatically reloads the browser.

We use [styleguidist](https://react-styleguidist.js.org/) for documenting our custom components.

### `npm run styleguide:build`
Builds the styleguide documentation for production. The output targets the `styleguide` folder.


## About UNICEF

[UNICEF](https://www.unicef.org/) works in over 190 countries and territories to protect the rights of every child. UNICEF has spent more than 70 years working to improve the lives of children and their families. In UNICEF, we **believe all children have a right to survive, thrive and fulfill their potential – to the benefit of a better world**.

[Donate](https://donate.unicef.org/donate/now)


## Collaborations and support

Just fork the project and make a pull request. You may also [consider donating](https://donate.unicef.org/donate/now).


## License

Copyright (c) 2019 UNICEF.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


### Acknowledgements

The majority of the source code of this repo was developed by [@sureshsevarthi](http://github.com/sureshsevarthi).

Also, this source code is based on [react-numeric](https://github.com/mkg0/react-numeric).

