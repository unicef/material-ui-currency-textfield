import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import jss from './setupjss';
import * as theme from './theme';
export default memoize(function (styles, config, componentName) {
  var mergedTheme = merge({}, theme, config.theme);
  var mergedStyles = merge({}, styles(mergedTheme), config.styles && config.styles[componentName]);
  return jss.createStyleSheet(mergedStyles, {
    meta: componentName,
    link: true
  });
});