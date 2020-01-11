import React from "react"
import CurrencyTextField from "@unicef/material-ui-currency-textfield"

export default function App() {
  const [value, setValue] = React.useState(10000)
  const isValid = value < 100

  return (
    <CurrencyTextField
      label="Amount"
      value={value}
      currencySymbol="$"
      maximumValue={100000000000000000}
      autoFocus
      onChange={(e, value) => setValue(value)}
      error={isValid}
      helperText={isValid && "minimum number is 100"}
      decimalCharacter="."
      digitGroupSeparator=","
    />
  )
}
