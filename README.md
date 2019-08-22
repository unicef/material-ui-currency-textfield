# Material-ui currency textfield

CurrencyTextField is a react component with automated currency and number format with Material-ui textfield look and feel.
CurrencyTextField is a wrapper component for <a href="https://github.com/autoNumeric/autoNumeric">autonumeric</a> and based on <a href="https://github.com/mkg0/react-numeric">react-numeric</a>.
## Installation
 ```
 npm install @unicef/material-ui-currency-textfield --save
```
## Usage

The component **[documentation and live demo is available here](https://unicef.github.io/material-ui-currency-textfield/)**


```jsx
import React from 'react'
import CurrencyTextField from '@unicef/material-ui-textfield'

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

In order to extend the components, clone the project and install dependencies.

```bash
$ git clone https://github.com/unicef/material-ui-currency-textfield.git
$ npm install
```

The following commands are available: 

### `npm start`

Builds the app automatically for production to the `dist` folder, everytime you make changes in the code.

```
npm start
```

This build we are utilizing in example project, so each time we make some changes in the app. it builds the app to `dist` folder. so that we can see changes in the example project.

Now open new tab in bash and run this commands:

 ```
 cd example 
 npm install (only if it is firt time)
 npm start
 ```
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

It will reload automatically upon edits. Lint errors are also displayed on the console.

### `npm run build`

Builds the app for production to the `dist` folder.

It bundles application in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run styleguide`
Generates the documentation the development mode.
Open [http://localhost:6060](http://localhost:6060) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

We use [styleguidelist](https://react-styleguidist.js.org/) for documenting our custom components.


### `npm run styleguide:build`
Builds the styleguide for production to the `styleguide` folder.<br>
It correctly bundles React-styleguide in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

