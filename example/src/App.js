import React from "react";
import UCurrency from "ucurrency";

export default function App() {

  const [value, setValue] = React.useState(100);

  return (
    <UCurrency
    label="Amount"
    variant="standard"
    value={value}
    currencySymbol="$"
    onChange={(event, value)=> setValue(value) }
    />
  );
}
