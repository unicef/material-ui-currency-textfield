import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var fontFamily = _ref.fontFamily;
  return {
    code: {
      fontFamily: fontFamily.monospace,
      fontSize: 'inherit',
      color: 'inherit',
      background: 'transparent',
      whiteSpace: 'inherit'
    }
  };
};

export function CodeRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return React.createElement("code", {
    className: classes.code
  }, children);
}
CodeRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(CodeRenderer);