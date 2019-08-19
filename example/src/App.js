import React from "react";
import UCurrency from "ucurrency";

export default function App() {
  return (
    <UCurrency
      locale="en-UK"
      currency="GBP"
      currencyDisplay="symbol"
      initialValue={100}
    />
  );
}
