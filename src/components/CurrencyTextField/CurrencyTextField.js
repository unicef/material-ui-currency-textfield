import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import AutoNumeric from "autonumeric";
import { TextField, InputAdornment } from "@material-ui/core";

/**
 * UCurrency is currency input for react with automated currency number formatting while typing.
 * 
 * currency input made with material ui textfield to have material ui look and feel.
 */
const styles = theme => ({
  textField: {
    textAlign: 'right',
    justifyContent: 'right',
  },
})

export default function CurrencyTextField(props) {
  const inputRef = useRef(null);
  const classes = styles()
  const { label, currencySymbol, variant, ...others} = props

  let autonumeric = new AutoNumeric(inputRef, props.value, {
    ...props.preDefined,
    ...others,
    onChange: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onKeyPress: undefined,
    onKeyUp: undefined,
    onKeyDown: undefined,
    watchExternalChanges: false,
  });

  useEffect(() => {
   autonumeric();
  })

  useEffect(() => {
    autonumeric.remove();
  }, [])

  useEffect(() => {
    const isOptionsChanged =
      JSON.stringify({ ...props, value: undefined }) !==
      JSON.stringify({ ...newProps, value: undefined });
    const isValueChanged =
      props.value !== newProps.value && getValue() !== newProps.value;
    if (isValueChanged) {
      autonumeric.set(newProps.value);
    }
    if (isOptionsChanged) {
      autonumeric.update({
        ...newProps.preDefined,
        ...newProps,
        onChange: undefined,
        onFocus: undefined,
        onBlur: undefined,
        onKeyPress: undefined,
        onKeyUp: undefined,
        onKeyDown: undefined,
        watchExternalChanges: false,
      });
    }
  }, [props.value])

  function getValue() {
    if (!autonumeric) return;
    const valueMapper = {
      string: numeric => numeric.getNumericString(),
      number: numeric => numeric.getNumber(),
    }
    return valueMapper[props.outputFormat](autonumeric);
  }

  function callEventHandler(event, eventName) {
    if (!props[eventName]) return;
    props[eventName](event, getValue());
  }

  return (
      <TextField
      label={label}
      variant={variant}
      className={classes.textField}
      inputRef={inputRef}
      onChange={(e) => callEventHandler(e, "onChange")}
      onFocus={(e) => callEventHandler(e, "onFocus")}
      onBlur={(e) => callEventHandler(e, "onBlur")}
      onKeyPress={(e) => callEventHandler(e, "onKeyPress")}
      onKeyUp={(e) => callEventHandler(e, "onKeyUp")}
      onKeyDown={(e) => callEventHandler(e, "onKeyDown")}
      InputProps={{
        startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>, 
      }}
      inputProps={{
        className: classes.textField
      }}
      />
  );
}

CurrencyTextField.propTypes = {
  type: PropTypes.oneOf(["text", "tel", "hidden"]),
  variant: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  tabIndex: PropTypes.number,
  unselectable: PropTypes.bool,
  size: PropTypes.number,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  /** Defines the currency symbol string.	 */
  currencySymbol: PropTypes.string,
  currencySymbolPlacement: PropTypes.string,
  decimalCharacter: PropTypes.string,
  decimalCharacterAlternative: PropTypes.string,
  decimalPlaces: PropTypes.number,
  decimalPlacesRawValue: PropTypes.number,
  decimalPlacesShownOnBlur: PropTypes.number,
  decimalPlacesShownOnFocus: PropTypes.number,
  leadingZero: PropTypes.oneOf(["allow", "deny", "keep"]),
  maximumValue: PropTypes.string,
  minimumValue: PropTypes.string,
  negativePositiveSignPlacement: PropTypes.oneOf(["l", "r", "p", "s"]),
  negativeSignCharacter: PropTypes.string,
  noEventListeners: PropTypes.bool,
  outputFormat: PropTypes.oneOf(["string", "number"]),
  positiveSignCharacter: PropTypes.string,
  readOnly: PropTypes.bool,
  preDefined: PropTypes.object,
};

CurrencyTextField.defaultProps = {
  type: "text",
  variant: "standard",
  currencySymbol: "$",
  outputFormat: "number",
  preDefined: {},
};

export const predefinedOptions = AutoNumeric.getPredefinedOptions();