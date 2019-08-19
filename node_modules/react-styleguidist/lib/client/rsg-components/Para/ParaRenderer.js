import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
export var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontFamily = _ref.fontFamily;
  return {
    para: {
      marginTop: 0,
      marginBottom: space[2],
      color: color.base,
      fontFamily: fontFamily.base,
      fontSize: 'inherit',
      lineHeight: 1.5
    }
  };
};
export function ParaRenderer(_ref2) {
  var classes = _ref2.classes,
      semantic = _ref2.semantic,
      children = _ref2.children;
  var Tag = semantic || 'div';
  return React.createElement(Tag, {
    className: classes.para
  }, children);
}
ParaRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  semantic: PropTypes.oneOf(['p']),
  children: PropTypes.node.isRequired
};
export default Styled(styles)(ParaRenderer);