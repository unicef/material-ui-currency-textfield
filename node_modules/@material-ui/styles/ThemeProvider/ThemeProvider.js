"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _utils = require("@material-ui/utils");

var _ThemeContext = _interopRequireDefault(require("../useTheme/ThemeContext"));

var _useTheme = _interopRequireDefault(require("../useTheme"));

var _nested = _interopRequireDefault(require("./nested"));

// To support composition of theme.
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === 'function') {
    var mergedTheme = localTheme(outerTheme);
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(mergedTheme, ['Material-UI: you should return an object from your theme function, i.e.', '<ThemeProvider theme={() => ({})} />'].join('\n')) : void 0;
    return mergedTheme;
  }

  return (0, _extends2.default)({}, outerTheme, {}, localTheme);
}
/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */


function ThemeProvider(props) {
  var children = props.children,
      localTheme = props.theme;
  var outerTheme = (0, _useTheme.default)();
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(outerTheme !== null || typeof localTheme !== 'function', ['Material-UI: you are providing a theme function prop to the ThemeProvider component:', '<ThemeProvider theme={outerTheme => outerTheme} />', '', 'However, no outer theme is present.', 'Make sure a theme is already injected higher in the React tree ' + 'or provide a theme object.'].join('\n')) : void 0;

  var theme = _react.default.useMemo(function () {
    var output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);

    if (outerTheme !== null && output) {
      output[_nested.default] = true;
    }

    return output;
  }, [localTheme, outerTheme]);

  return _react.default.createElement(_ThemeContext.default.Provider, {
    value: theme
  }, children);
}

process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = {
  /**
   * Your component tree
   */
  children: _propTypes.default.node.isRequired,

  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]).isRequired
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = (0, _utils.exactProp)(ThemeProvider.propTypes) : void 0;
}

var _default = ThemeProvider;
exports.default = _default;