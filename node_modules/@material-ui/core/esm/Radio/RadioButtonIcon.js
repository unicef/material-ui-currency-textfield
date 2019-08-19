import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import withStyles from '../styles/withStyles';
export var styles = function styles(theme) {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      '&$checked $layer': {
        transform: 'scale(1)',
        transition: theme.transitions.create('transform', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.shortest
        })
      }
    },
    layer: {
      left: 0,
      position: 'absolute',
      transform: 'scale(0)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest
      })
    },
    checked: {}
  };
};
/**
 * @ignore - internal component.
 */

var _ref = React.createElement(RadioButtonUncheckedIcon, null);

function RadioButtonIcon(props) {
  var checked = props.checked,
      classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ["checked", "classes", "className"]);

  return React.createElement("div", _extends({
    className: clsx(classes.root, className, checked && classes.checked)
  }, other), _ref, React.createElement(RadioButtonCheckedIcon, {
    className: classes.layer
  }));
}

process.env.NODE_ENV !== "production" ? RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string
} : void 0;
export default withStyles(styles, {
  name: 'PrivateRadioButtonIcon'
})(RadioButtonIcon);