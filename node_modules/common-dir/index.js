'use strict'
const commonSequence = require('common-sequence')
const path = require('path')

/**
 * @module common-dir
 */
module.exports = commonDir

/**
 * Returns the parent directory common to each path.
 * @param {Array} files - An array of file paths to inspect
 * @returns {string} A single path ending with the path separator, e.g. '/user/some/folder/'
 * @alias module:common-dir
 * @example
 * > const commonDir = require('common-dir')
 * > files = [
 *   '/Users/75lb/one/package.json',
 *   '/Users/75lb/one/test',
 *   '/Users/75lb/two/test/main.js'
 * ]
 * > commonDir(files)
 * '/Users/75lb/'
 */
function commonDir (files) {
  return files
    .map(path.dirname)
    .map(function (dir) {
      return dir.split(path.sep)
    })
    .reduce(commonSequence)
    .concat([''])
    .join(path.sep)
}
