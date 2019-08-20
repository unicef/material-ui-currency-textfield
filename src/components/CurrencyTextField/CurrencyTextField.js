import React from "react";
import PropTypes from "prop-types";
import AutoNumeric from "autonumeric";
import { withStyles } from '@material-ui/styles';
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


class CurrencyTextField extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { label, currencySymbol, variant, ...others} = this.props
    this.autonumeric = new AutoNumeric(this.input, this.props.value, {
      ...this.props.preDefined,
      ...others,
      onChange: undefined,
      onFocus: undefined,
      onBlur: undefined,
      onKeyPress: undefined,
      onKeyUp: undefined,
      onKeyDown: undefined,
      watchExternalChanges: false,
    });
  }
  componentWillUnmount() {
    this.autonumeric.remove();
  }

  componentWillReceiveProps(newProps) {
    const isOptionsChanged =
      JSON.stringify({ ...this.props, value: undefined }) !==
      JSON.stringify({ ...newProps, value: undefined });
    const isValueChanged =
      this.props.value !== newProps.value && this.getValue() !== newProps.value;
    if (isValueChanged) {
      this.autonumeric.set(newProps.value);
    }
    if (isOptionsChanged) {
      this.autonumeric.update({
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
  }
  getValue() {
    if (!this.autonumeric) return;
    const valueMapper = {
      string: numeric => numeric.getNumericString(),
      number: numeric => numeric.getNumber(),
    };
    return valueMapper[this.props.outputFormat](this.autonumeric);
  }
  callEventHandler(event, eventName) {
    if (!this.props[eventName]) return;
    this.props[eventName](event, this.getValue());
  }
  render() {
    const { classes, label, currencySymbol, variant } = this.props
    
    return (
        <TextField
        label={label}
        variant={variant}
        className={classes.textField}
        inputRef={ref => (this.input = ref)}
        onChange={(e) => this.callEventHandler(e, "onChange")}
        onFocus={(e) => this.callEventHandler(e, "onFocus")}
        onBlur={(e) => this.callEventHandler(e, "onBlur")}
        onKeyPress={(e) => this.callEventHandler(e, "onKeyPress")}
        onKeyUp={(e) => this.callEventHandler(e, "onKeyUp")}
        onKeyDown={(e) => this.callEventHandler(e, "onKeyDown")}
        InputProps={{
          startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>, 
        }}
        inputProps={{
          className: classes.textField
        }}
        />
    );
  }
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
  outputFormat: "number",
  preDefined: {},
};
export default withStyles(styles)(CurrencyTextField)

export const predefinedOptions = AutoNumeric.getPredefinedOptions();