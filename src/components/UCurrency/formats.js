const formats = {
  EUR: {
    centsSeperator: ",",
    style: "currency",
    currency: "EUR",
    allowedInput: /[^0-9-,]/g,
  },
  GBP: {
    centsSeperator: ".",
    allowedInput: /[^0-9-.]/g,
    style: "currency",
    currency: "GBP",
  },
  USD: {
    centsSeperator: ".",
    allowedInput: /[^0-9-.]/g,
    style: "currency",
    currency: "USD",
  },
};

export default formats;
