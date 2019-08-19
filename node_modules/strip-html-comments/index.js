'use strict'

module.exports = function stripHtmlComments (html) {
  if (typeof html !== 'string') {
    throw new TypeError('strip-html-comments expected a string')
  }

  return html.replace(/<!--[\s\S]*?(?:-->)/g, '')
}
