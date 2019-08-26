import React from "react";
import CurrencyTextField from "material-ui-currency-textfield";

export default function App() {

  const value = 10000;

  return (
    <CurrencyTextField
      label="Amount"
      value={value}
      currencySymbol="$"
      autoFocus
      decimalCharacter="."
      digitGroupSeparator=","
    />
  );
}
