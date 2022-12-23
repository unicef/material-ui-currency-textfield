# Currency Textfield for Material UI v5 (MUI) [![npm](https://img.shields.io/npm/v/@lupus-ai/mui-currency-textfield.svg?style=flat-square)](https://www.npmjs.com/package/@lupus-ai/mui-currency-textfield)

[View on Github](https://github.com/lupusai/mui-currency-textfield)
## Installation
 ```bash
 npm install @lupus-ai/mui-currency-textfield --save
```
## Usage

```html
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
		outputFormat="string"
		onChange={(event, value)=> setValue(value)}
    />
  );
}
```
