"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _FormGroup = _interopRequireDefault(require("../FormGroup"));

var _reactHelpers = require("../utils/reactHelpers");

var _RadioGroupContext = _interopRequireDefault(require("./RadioGroupContext"));

var RadioGroup = _react.default.forwardRef(function RadioGroup(props, ref) {
  var actions = props.actions,
      children = props.children,
      name = props.name,
      valueProp = props.value,
      onChange = props.onChange,
      other = (0, _objectWithoutProperties2.default)(props, ["actions", "children", "name", "value", "onChange"]);

  var rootRef = _react.default.useRef(null);

  var _React$useRef = _react.default.useRef(valueProp != null),
      isControlled = _React$useRef.current;

  var _React$useState = _react.default.useState(function () {
    if (!isControlled) {
      return props.defaultValue;
    }

    return null;
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      valueState = _React$useState2[0],
      setValue = _React$useState2[1];

  _react.default.useImperativeHandle(actions, function () {
    return {
      focus: function focus() {
        var input = rootRef.current.querySelector('input:not(:disabled):checked');

        if (!input) {
          input = rootRef.current.querySelector('input:not(:disabled)');
        }

        if (input) {
          input.focus();
        }
      }
    };
  }, []);

  _react.default.useEffect(function () {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(isControlled === (valueProp != null), ["Material-UI: A component is changing ".concat(isControlled ? 'a ' : 'an un', "controlled RadioGroup to be ").concat(isControlled ? 'un' : '', "controlled."), 'Input elements should not switch from uncontrolled to controlled (or vice versa).', 'Decide between using a controlled or uncontrolled RadioGroup ' + 'element for the lifetime of the component.', 'More info: https://fb.me/react-controlled-components'].join('\n')) : void 0;
  }, [valueProp, isControlled]);

  var value = isControlled ? valueProp : valueState;

  var handleChange = function handleChange(event) {
    if (!isControlled) {
      setValue(event.target.value);
    }

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  var context = {
    name: name,
    onChange: handleChange,
    value: value
  };
  var handleRef = (0, _reactHelpers.useForkRef)(ref, rootRef);
  return _react.default.createElement(_FormGroup.default, (0, _extends2.default)({
    role: "radiogroup",
    ref: handleRef
  }, other), _react.default.createElement(_RadioGroupContext.default.Provider, {
    value: context
  }, children));
});

process.env.NODE_ENV !== "production" ? RadioGroup.propTypes = {
  /**
   * @ignore
   */
  actions: _propTypes.default.shape({
    current: _propTypes.default.object
  }),

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.any,

  /**
   * The name used to reference the value of the control.
   */
  name: _propTypes.default.string,

  /**
   * @ignore
   */
  onBlur: _propTypes.default.func,

  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {string} value The `value` of the selected radio button
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Value of the selected radio button.
   */
  value: _propTypes.default.string
} : void 0;
var _default = RadioGroup;
exports.default = _default;