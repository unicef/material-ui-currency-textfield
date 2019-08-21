Type of variants: 

```html
variant = 'standard' (default)
			| 'outlined'
			| 'filled'
```

```jsx
import { Grid, Typography } from '@material-ui/core'

const [value, setValue] = React.useState(100);

<Grid container spacing={3}>
	<Grid item xs={12} md={4}>
		<Typography variant="subtitle1" gutterBottom={true}>Standard</Typography>
		<CurrencyTextField
			label="Amount"
			value={value}
			currencySymbol="$"
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
	<Grid item xs={12} md={4}>
		<Typography variant="subtitle1" gutterBottom={true}>Outlined</Typography>
		<CurrencyTextField
			label="Amount"
			variant="outlined"
			value={value}
			currencySymbol="$"
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
	<Grid item xs={12} md={4}>
		<Typography variant="subtitle1" gutterBottom={true}>Filled</Typography>
		<CurrencyTextField
			label="Amount"
			variant="filled"
			value={value}
			currencySymbol="$"
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
</Grid>
```
Currency symbol
```html
 currencySymbol = 'string'
 
 Ex : '$' | '£' | '€'
```
```jsx
import { Grid, Typography } from '@material-ui/core'

const [value, setValue] = React.useState(100);

<Grid container spacing={3}>
	<Grid item xs={12} md={4}>
		<Typography variant="subtitle1" gutterBottom={true}>Euro €</Typography>
		<CurrencyTextField
			label="Amount"
			value={value}
			currencySymbol="€"
			decimalCharacter=","
			digitGroupSeparator="."
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
	<Grid item xs={12} md={4}>
		<Typography variant="subtitle1" gutterBottom={true}>GBP £</Typography>
		<CurrencyTextField
			label="Amount"
			variant="outlined"
			value={value}
			currencySymbol="£"
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
	<Grid item xs={12} md={4}>
		<Typography variant="subtitle1" gutterBottom={true}>USD $</Typography>
		<CurrencyTextField
			label="Amount"
			variant="filled"
			value={value}
			currencySymbol="$"
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
</Grid>
```
Change in characters
```html
decimalCharacter=","
digitGroupSeparator="."
```
```jsx
const [value, setValue] = React.useState(100);

	<CurrencyTextField
		label="Amount"
		value={value}
		currencySymbol="$"
		decimalCharacter=","
		digitGroupSeparator="."
		onChange={(event, value)=> setValue(value)}
	/>
```

Output format : 
output value to be stored as string or number.
```html
outputFormat='number' (default)
			| 'string'
```
```jsx
const [value, setValue] = React.useState(100);

	<CurrencyTextField
		label="Amount"
		value={value}
		outputFormat="string"
		currencySymbol="$"
		onChange={(event, value)=> setValue(value)}
	/>
```

Usage:
```html
import React from 'react'
import CurrencyTextField from '@unicef/material-ui-textfield'

export default function MyComponent() {

  const [value, setValue] = React.useState(100);

  return (
    <CurrencyTextField
		label="Amount"
		variant="outlined"
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
