import _recast from "recast";

import babylon from "./babylon";

function stringify(value) {
  if (Array.isArray(value)) {
    return value.join("\n");
  }
  return value;
}

/**
 * Returns a NodePath to the program node of the passed node
 *
 * Original
 * https://github.com/reactjs/react-docgen/blob/master/tests/utils.js
 */
export default (src, recast = _recast) =>
  new recast.types.NodePath(
    recast.parse(stringify(src), { esprima: babylon }).program,
  );
