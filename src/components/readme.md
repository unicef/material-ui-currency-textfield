# Unicef material-ui currency textfield [![npm](https://img.shields.io/npm/v/@unicef/material-ui-currency-textfield.svg?style=flat-square)](https://www.npmjs.com/package/@unicef/material-ui-currency-textfield)

[View on Github](https://github.com/unicef/material-ui-currency-textfield)
## Installation
 ```bash
 npm install @unicef/material-ui-currency-textfield --save
```
## Usage

```html
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
		outputFormat="string"
		onChange={(event, value)=> setValue(value)}
    />
  );
}
```
