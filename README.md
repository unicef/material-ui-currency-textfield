# Currency Textfield for Material UI version 5 (MUI)
[![npm version](https://badge.fury.io/js/%40unicef%2Fmaterial-ui-currency-textfield.svg)](https://badge.fury.io/js/%40unicef%2Fmaterial-ui-currency-textfield)

`CurrencyTextField` is a [MUI](https://mui.com/) [react](https://reactjs.org/) component. It provides a user friendly experience while inputing currency numbers. 

`CurrencyTextField` wraps the functionality of <a href="https://github.com/autoNumeric/autoNumeric">autonumeric</a> and it is a port of <a href="https://github.com/mkg0/react-numeric">react-numeric</a> in Material-UI version 5.

![Example of material](https://raw.githubusercontent.com/LupusAI/mui-currency-textfield/master/mui-currency-field.gif)

Main features:
 * Adds thousands separator automatically.
 * Adds automatically the decimals on blur.
 * Smart input. User can only type the accepted characters depending on the current value.
 * Lots of config options...

## Install

 ```bash
 npm install @lupus-ai/mui-currency-textfield --save
```

## Usage

**[Documentation and live demo is available here](https://LupusAI.github.io/mui-currency-textfield/)**


```jsx
import React from 'react'
import CurrencyTextField from '@lupus-ai/mui-currency-textfield'

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
$ git clone https://github.com/LupusAI/mui-currency-textfield.git
$ npm install
```

The following commands are available: 

### `npm start`

Builds the component outputing it in the `dist` folder. It is refreshed everytime you make changes in the code.

```bash
npm start
```

To see the output in the browser run the example app ([/example](https://github.com/LupusAI/mui-currency-textfield/tree/master/example))

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


## Forked and Continued Development

This repository is a fork of [unicef/material-ui-currency-textfield](https://github.com/unicef/material-ui-currency-textfield). The original project is no longer maintained, so we have decided to fork the repository and continue development on the project.

The main changes have been to update the Material UI version 5 since version 4 is deprecated and update support to react 18.
I plan to continue development on the project and add the following features:

We have made the following major changes to the original project:

1. Updating to Material UI version 5
Material UI version 4 is now deprecated, so we have upgraded to version 5 in order to take advantage of the latest features and improvements.

2. Updating support to React 18
We have upgraded to React 18 in order to take advantage of the latest features and improvements, as well as to ensure that our project is compatible with the latest version of React.

3. Switching from Rollup to Webpack as Bundler
We have switched from using Rollup as our bundler to using Webpack. By switching to Webpack, we are able to take advantage of the latest features and improvements in this popular bundler, which will help to improve the performance and reliability of this project.

We plan to continue development on the project and work on these:
- decrease bundle size
- replace deprecated react lifecycle methods

We would like to credit the original authors for their work and make it clear that this project would not be possible without their efforts.

The contributions of [@sureshsevarthi](http://github.com/sureshsevarthi) laid the groundwork for what the project has become today.

### About UNICEF

[UNICEF](https://www.unicef.org/) works in over 190 countries and territories to protect the rights of every child. UNICEF has spent more than 70 years working to improve the lives of children and their families. In UNICEF, we **believe all children have a right to survive, thrive and fulfill their potential – to the benefit of a better world**.

Please consider donating [here](https://donate.unicef.org/donate/now).
