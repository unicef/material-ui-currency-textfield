import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import TableContext from './TableContext';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0
  }
};
const Table = React.forwardRef(function Table(props, ref) {
  const {
    classes,
    className,
    component: Component = 'table',
    padding = 'default',
    size = 'medium'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className", "component", "padding", "size"]);

  const table = React.useMemo(() => ({
    padding,
    size
  }), [padding, size]);
  return React.createElement(TableContext.Provider, {
    value: table
  }, React.createElement(Component, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other)));
});
process.env.NODE_ENV !== "production" ? Table.propTypes = {
  /**
   * The content of the table, normally `TableHead` and `TableBody`.
   */
  children: PropTypes.node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Allows TableCells to inherit padding of the Table.
   */
  padding: PropTypes.oneOf(['default', 'checkbox', 'none']),

  /**
   * Allows TableCells to inherit size of the Table.
   */
  size: PropTypes.oneOf(['small', 'medium'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiTable'
})(Table);