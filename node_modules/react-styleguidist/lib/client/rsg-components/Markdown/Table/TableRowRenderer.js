import React from 'react';
import PropTypes from 'prop-types';
export function TableRowRenderer(_ref) {
  var children = _ref.children;
  return React.createElement("tr", null, children);
}
TableRowRenderer.propTypes = {
  children: PropTypes.node.isRequired
};
export default TableRowRenderer;