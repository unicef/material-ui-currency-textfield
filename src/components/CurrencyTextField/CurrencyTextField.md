## Examples

#### Type of variants: 

```html
variant = 'standard' (default)
			| 'outlined'
			| 'filled'
```

```jsx
import { Grid, Typography } from '@mui/material'

const [value, setValue] = React.useState(100);

<Grid container spacing={3}>
	<Grid item xs={12} md={4}>
		<Typography variant="subtitle1" gutterBottom={true}>Standard</Typography>
		<CurrencyTextField
			label="Amount"
			value={value}
			unselectable
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
#### Currency symbol
```html
 currencySymbol = 'string'
 
 Ex : '$' | '£' | '€'
```
```jsx
import { Grid, Typography } from '@mui/material'

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
#### Change in characters
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

####  Output format : 
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

#### error and helperText
```html
error={bool}
helperText='string'
```
```jsx
const [value, setValue] = React.useState(100);
const isValid = value < 1000;

	<CurrencyTextField
		label="Amount"
		value={value}
		currencySymbol="$"
		onChange={(e, value) => setValue(value)}
		error={isValid}
		helperText={isValid && "minimum amount is 1000"}
		decimalCharacter="."
		digitGroupSeparator=","
	/>;
```
#### maximumValue and minimumValue
```html
maximumValue={10000000000000}  (default) | "Value can be increased and decreased"
minimumValue={-10000000000000} (default) | "Value can be increased and decreased"
```
```jsx
import { Grid, Typography } from '@mui/material'
const [value, setValue] = React.useState(100);

	<Grid container spacing={3}>
		<Grid item xs={12} md={4}>
			<Typography variant="subtitle1" gutterBottom={true}>Maximum value  1000</Typography>
			<CurrencyTextField
			label="Amount"
			value={value}
			currencySymbol="$"
			maximumValue={1000}
			onChange={(e, value) => setValue(value)}
			decimalCharacter="."
			digitGroupSeparator=","
			/>
		</Grid>
		<Grid item xs={12} md={4}>
			<Typography variant="subtitle1" gutterBottom={true}>Minimum value -100</Typography>
			<CurrencyTextField
				label="Amount"
				value={value}
				currencySymbol="$"
				minimumValue={-100}
				onChange={(e, value) => setValue(value)}
				decimalCharacter="."
				digitGroupSeparator=","
			/>
		</Grid>
	</Grid>
```

#### Predefined options
```html
preDefined={predefinedOptions.percentageEU2dec}
```
```jsx
import { predefinedOptions } from './CurrencyTextField';
const [value, setValue] = React.useState(100);

	<CurrencyTextField
		label="Amount"
		value={value}
		currencySymbol="$"
		preDefined={predefinedOptions.percentageEU2dec}
		onChange={(event, value)=> setValue(value)}
	/>
```

#### Usage with showing more props
```html
import React from 'react'
import CurrencyTextField from '@lupus-ai/mui-currency-textfield'

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
		//autoFocus
		//className=classes.textField
		//readonly
		//disabled
		//placeholder="Currency"
		//preDefined={predefinedOptions.percentageEU2dec}
		onChange={(event, value)=> setValue(value)}
    />
  );
}
```
