import React, { Component } from "react";
import PropTypes from "prop-types";
import formats from "./formats";
import { TextField, InputAdornment } from "@material-ui/core";

/**
 * UCurrency component
 *
 * Current limitations:
 *
 * - User is not allowed to type thousands seperator in
 * the selected currency (comma or dot, depends on the locale/currency)
 * - Negative values are not allowed (Work in progress)
 * @export UCurrency
 * @class UCurrency
 * @extends {Component}
 */
export default class UCurrency extends Component {
  static defaultProps = {
    autoFocus: false,
    className: "",
    currency: "EUR",
    currencyDisplay: "code",
    formatOnEnter: true,
    formats,
    locale: "de-DE",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    onBlur: () => null,
    onChange: () => null,
    onFocus: () => null,
    preventCursorMove: true,
    onArrowPressAllowChange: true,
    onArrowPressChangeStep: 1,
  };

  static propTypes = {
    /** It specifies that an input element should automatically
     * get focus when the page loads. */
    autoFocus: PropTypes.bool,

    /** A css class to apply on the input */
    className: PropTypes.string,

    /**
     * The currency to use in currency formatting.
     * Possible values are the ISO 4217 currency codes,
     * such as "USD" for the US dollar, "EUR" for the euro
     */
    currency: PropTypes.string,

    /**
     * How to display the currency in currency formatting.
     * Possible values are "symbol" to use a localized currency symbol
     * such as €, "code" to use the ISO currency code, "name"
     * to use a localized currency name such as "dollar".
     */
    currencyDisplay: PropTypes.oneOf(["code", "symbol", "name"]),

    /** If true it formats the input when the Enter button is pressed */
    formatOnEnter: PropTypes.bool,

    /** @ignore */
    formats: PropTypes.object,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** A string with a BCP 47 language tag */
    locale: PropTypes.string,

    /** The maximum number of digits after the decimal separator. */
    maximumFractionDigits: PropTypes.number,

    /** The minimum number of digits after the decimal separator. */
    minimumFractionDigits: PropTypes.number,

    /** Increase/Decrease value on up/down arrow press */
    onArrowPressAllowChange: PropTypes.bool,

    /** The amount by which the value will be incrased/decreased when
     * up/down arrows are pressed
     */
    onArrowPressChangeStep: PropTypes.number,

    /**
     * Gets called when the input loses focus
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {number} value The value of the input
     * @param {string} maskedValue The value of the input with currency and seperators
     */
    onBlur: PropTypes.func,

    /**
     * Gets called when the user types on the input field
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {number} value The value of the input
     * @param {string} maskedValue The value of the input with currency and seperators
     */
    onChange: PropTypes.func,

    /**
     * Gets called when the input gains focus
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {number} value The value of the input
     * @param {string} maskedValue The value of the input with currency and seperators
     */
    onFocus: PropTypes.func,

    /** Prevent the cursor from being moved when the up/down arrows are pressed */
    preventCursorMove: PropTypes.bool,
  };

  state = {
    maskedValue: "",
    value: "",
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    this.formatCurrency = new Intl.NumberFormat(this.props.locale, {
      maximumFractionDigits: this.props.maximumFractionDigits,
      minimumFractionDigits: this.props.minimumFractionDigits,
    }).format;
  }

  componentDidMount() {
    if (
      this.props.initialValue !== null &&
      this.props.initialValue !== undefined
    ) {
      this.setState({
        value: this.ignoreCharacters(`${this.props.initialValue}`),
        maskedValue: this.formatCurrency(Number(this.props.initialValue)),
      });
    }
  }

  /**
   * Prevent user from typing non-allowed characters
   *
   * @param {string} str
   * @returns {string}
   */
  ignoreCharacters(str) {
    const { allowedInput } = this.props.formats[this.props.currency];
    return str.replace(allowedInput, "");
  }

  /**
   * Parse input value, ignore more than one centsSeperator
   *
   * @param {string} str
   * @returns {string}
   */
  parseValue(str) {
    const { centsSeperator } = this.props.formats[this.props.currency];
    return str
      .split(centsSeperator)
      .map(value => value.replace(/[^0-9]/g, ""))
      .slice(0, 2) // in case the user types more than one centsSeperator, ignore it
      .join(".");
  }

  /**
   * Handle onChange event
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  handleChange(event) {
    event.preventDefault();
    const value = this.parseValue(`${event.target.value}`);
    const maskedValue = this.ignoreCharacters(event.target.value);
    this.setState(
      {
        value,
        maskedValue,
      },
      () => this.props.onChange(event, value, maskedValue)
    );
  }

  /**
   * Handle onBlur event
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  handleBlur(event) {
    event.preventDefault();
    const { value } = this.state;
    const maskedValue = value !== "" ? this.formatCurrency(value) : "";

    this.setState({ maskedValue }, () =>
      this.props.onBlur(event, value, maskedValue)
    );
  }

  /**
   * Handle onFocus event
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  handleFocus(event) {
    event.preventDefault();
    const value = this.ignoreCharacters(event.target.value);
    const maskedValue = value;

    this.setState({ maskedValue }, () =>
      this.props.onFocus(event, value, maskedValue)
    );
  }

  isKey(event, key) {
    return event.which === key || event.keyCode === key;
  }

  /**
   * Handle onKeyUp event
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  handleKeyDown(event) {
    const isUpArrow = this.isKey(event, 38);
    const isDownArrow = this.isKey(event, 40);

    if (this.props.preventCursorMove && (isUpArrow || isDownArrow)) {
      event.preventDefault();
      return false;
    }
  }

  /**
   * Handle the arrow press
   *
   * @param {number} factor
   * @memberof UCurrency
   */
  handleArrowPress(factor) {
    const { value } = this.state;
    const { onArrowPressChangeStep, onArrowPressAllowChange } = this.props;
    if (!onArrowPressAllowChange) return;
    const newValue = Number(value) + factor * onArrowPressChangeStep;
    this.setState({
      value: newValue,
      maskedValue: newValue,
    });
  }

  /**
   * Handle onKeyUp event
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  handleKeyUp(event) {
    event.preventDefault();
    const { formatOnEnter } = this.props;
    const { value } = this.state;
    const isEnter = this.isKey(event, 13);
    const isUpArrow = this.isKey(event, 38);
    const isDownArrow = this.isKey(event, 40);

    if (isEnter && formatOnEnter) {
      this.setState({
        maskedValue: this.formatCurrency(value),
      });
    } else if (isUpArrow) {
      this.handleArrowPress(1);
    } else if (isDownArrow) {
      this.handleArrowPress(-1);
    } else {
      this.setState({
        maskedValue: event.target.value,
      });
    }
  }

  /**
   * Return the masked value
   *
   * @returns {string}
   */
  getMaskedValue() {
    return this.state.maskedValue;
  }

  /**
   * Render component
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <TextField
        variant="outlined"
        className={this.props.className}
        value={this.getMaskedValue()}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        autoFocus={this.props.autoFocus}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    );
  }
}
