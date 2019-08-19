"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

require("../Button");

// So we don't have any override priority issue.
var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      borderRadius: theme.shape.borderRadius
    },

    /* Styles applied to the root element if variant="contained". */
    contained: {
      boxShadow: theme.shadows[2]
    },

    /* Styles applied to the root element if fullWidth={true}. */
    fullWidth: {
      width: '100%'
    },

    /* Styles applied to the children. */
    grouped: {
      minWidth: 40,
      '&:not(:first-child)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      },
      '&:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }
    },

    /* Styles applied to the children if variant="outlined". */
    groupedOutlined: {
      '&:not(:first-child)': {
        borderLeftColor: 'transparent',
        marginLeft: -1
      }
    },

    /* Styles applied to the children if variant="outlined" & color="primary". */
    groupedOutlinedPrimary: {
      '&:hover': {
        borderColor: theme.palette.primary.main
      }
    },

    /* Styles applied to the children if variant="outlined" & color="secondary". */
    groupedOutlinedSecondary: {
      '&:hover': {
        borderColor: theme.palette.secondary.main
      }
    },

    /* Styles applied to the children if variant="contained". */
    groupedContained: {
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderRight: "1px solid ".concat(theme.palette.grey[400])
      }
    },

    /* Styles applied to the children if variant="contained" & color="primary". */
    groupedContainedPrimary: {
      '&:not(:last-child)': {
        borderRight: "1px solid ".concat(theme.palette.primary.dark)
      }
    },

    /* Styles applied to the children if variant="contained" & color="secondary". */
    groupedContainedSecondary: {
      '&:not(:last-child)': {
        borderRight: "1px solid ".concat(theme.palette.secondary.dark)
      }
    }
  };
};

exports.styles = styles;

var ButtonGroup = _react.default.forwardRef(function ButtonGroup(props, ref) {
  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      _props$disableRipple = props.disableRipple,
      disableRipple = _props$disableRipple === void 0 ? false : _props$disableRipple,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'outlined' : _props$variant,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "color", "component", "disabled", "disableFocusRipple", "disableRipple", "fullWidth", "size", "variant"]);
  var outlined = variant === 'outlined';
  var contained = variant !== "outlined";
  var primary = color === 'primary';
  var secondary = color === 'secondary';
  var buttonClassName = (0, _clsx.default)(classes.grouped, outlined && [classes.groupedOutlined, primary && classes.groupedOutlinedPrimary, secondary && classes.groupedOutlinedSecondary], contained && [classes.groupedContained, primary && classes.groupedContainedPrimary, secondary && classes.groupedContainedSecondary]);
  return _react.default.createElement(Component, (0, _extends2.default)({
    role: "group",
    className: (0, _clsx.default)(classes.root, classNameProp, contained && classes.contained, fullWidth && classes.fullWidth),
    ref: ref
  }, other), _react.default.Children.map(children, function (child) {
    if (!_react.default.isValidElement(child)) {
      return null;
    }

    process.env.NODE_ENV !== "production" ? (0, _warning.default)(child.type !== _react.default.Fragment, ["Material-UI: the ButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
    return _react.default.cloneElement(child, {
      className: (0, _clsx.default)(buttonClassName, child.props.className),
      disabled: child.props.disabled || disabled,
      color: color,
      disableFocusRipple: disableFocusRipple,
      disableRipple: disableRipple,
      fullWidth: fullWidth,
      size: child.props.size || size,
      variant: variant
    });
  }));
});

process.env.NODE_ENV !== "production" ? ButtonGroup.propTypes = {
  /**
   * The content of the button group.
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes.default.oneOf(['default', 'inherit', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, the buttons will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the button keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: _propTypes.default.bool,

  /**
   * If `true`, the button ripple effect will be disabled.
   */
  disableRipple: _propTypes.default.bool,

  /**
   * If `true`, the buttons will take up the full width of its container.
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['outlined', 'contained'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiButtonGroup'
})(ButtonGroup);

exports.default = _default;