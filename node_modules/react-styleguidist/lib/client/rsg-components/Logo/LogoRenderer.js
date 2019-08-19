import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize;
  return {
    logo: {
      color: color.base,
      margin: 0,
      fontFamily: fontFamily.base,
      fontSize: fontSize.h4,
      fontWeight: 'normal'
    }
  };
};

export function LogoRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return React.createElement("h1", {
    className: classes.logo
  }, children);
}
LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};
export default Styled(styles)(LogoRenderer);