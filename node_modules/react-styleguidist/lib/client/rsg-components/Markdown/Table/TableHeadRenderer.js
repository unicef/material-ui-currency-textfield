import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var color = _ref.color;
  return {
    thead: {
      borderBottom: [[1, color.border, 'solid']]
    }
  };
};

export function TableHeadRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return React.createElement("thead", {
    className: classes.thead
  }, children);
}
TableHeadRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(TableHeadRenderer);