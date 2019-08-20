UCurrency Example:

```jsx
import { Grid } from '@material-ui/core'

const [value, setValue] = React.useState(100);

<Grid container spacing={3}>
	<Grid item xs={12} md={4}>
		<UCurrency
			label="Amount"
			value={value}
			currencySymbol="$"
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
	<Grid item xs={12} md={4}>
		<UCurrency
			label="Amount"
			variant="outlined"
			value={value}
			currencySymbol="$"
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
	<Grid item xs={12} md={4}>
		<UCurrency
			label="Amount"
			variant="filled"
			value={value}
			currencySymbol="$"
			onChange={(event, value)=> setValue(value)}
		/>
	</Grid>
</Grid>
```

Usage:
```html
import UCurrency from 'material-ui-currency-input'

<UCurrency
    value={value}
    currencySymbol="$"
    onChange={(event, value) => setValue(value) }
/>
```
