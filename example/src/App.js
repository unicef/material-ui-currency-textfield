import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import { Button } from "@mui/material"
import React from 'react';

function App() {
  const [value, setValue] = React.useState(99)
  const error = value < 100

  function resetValue() {
    setValue(0)
  }

  return (
    <div className="App">
      <CurrencyTextField
        label="Amount"
        value={value}
        currencySymbol="$"
        maximumValue={"100000000000000000"}
        autoFocus
        onChange={(e, value) => setValue(value)}
        error={error}
        helperText={"minimum number is 100"}
        decimalCharacter="."
        digitGroupSeparator=","
      />
      <Button onClick={resetValue}>Reset</Button>
    </div>
  );
}

export default App;
