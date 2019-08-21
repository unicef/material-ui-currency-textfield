import React from "react";
import CurrencyTextField from "material-ui-currency-textfield";

export default function App() {

  const [value, setValue] = React.useState(100);

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
    onChange={(event, value)=> setValue(value) }
    />
  );
}
