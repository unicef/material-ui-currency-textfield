import React from 'react';
import PropTypes from 'prop-types';
import Props from 'rsg-components/Props';
import Methods from 'rsg-components/Methods';
import isEmpty from 'lodash/isEmpty';
export default function Usage(_ref) {
  var _ref$props = _ref.props,
      props = _ref$props.props,
      methods = _ref$props.methods;
  var propsNode = !isEmpty(props) && React.createElement(Props, {
    props: props
  });
  var methodsNode = !isEmpty(methods) && React.createElement(Methods, {
    methods: methods
  });

  if (!propsNode && !methodsNode) {
    return null;
  }

  return React.createElement("div", null, propsNode, methodsNode);
}
Usage.propTypes = {
  props: PropTypes.shape({
    props: PropTypes.array,
    methods: PropTypes.array
  }).isRequired
};