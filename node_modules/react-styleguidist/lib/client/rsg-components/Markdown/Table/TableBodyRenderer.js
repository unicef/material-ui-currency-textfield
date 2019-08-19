import React from 'react';
import PropTypes from 'prop-types';
export function TableBodyRenderer(_ref) {
  var children = _ref.children;
  return React.createElement("tbody", null, children);
}
TableBodyRenderer.propTypes = {
  children: PropTypes.node.isRequired
};
export default TableBodyRenderer;