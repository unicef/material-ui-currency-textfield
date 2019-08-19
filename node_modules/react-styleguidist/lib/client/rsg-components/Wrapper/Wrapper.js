function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Component } from 'react';
import PropTypes from 'prop-types';

var Wrapper =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Wrapper, _Component);

  function Wrapper() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Wrapper.prototype;

  _proto.componentDidCatch = function componentDidCatch(error) {
    this.props.onError(error);
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return Wrapper;
}(Component);

_defineProperty(Wrapper, "propTypes", {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func.isRequired
});

export { Wrapper as default };