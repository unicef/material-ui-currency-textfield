import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';

var styles = function styles(_ref) {
  var space = _ref.space;
  return {
    spacing: {
      marginBottom: space[2]
    }
  };
};

function MarkdownHeadingRenderer(_ref2) {
  var classes = _ref2.classes,
      level = _ref2.level,
      children = _ref2.children,
      id = _ref2.id;
  return React.createElement("div", {
    className: classes.spacing
  }, React.createElement(Heading, {
    level: level,
    id: id
  }, children));
}

MarkdownHeadingRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node,
  id: PropTypes.string
};
export default Styled(styles)(MarkdownHeadingRenderer);