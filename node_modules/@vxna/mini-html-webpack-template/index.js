const {
  html,
  oneLineTrim,
  TemplateTag,
  trimResultTransformer,
  replaceResultTransformer
} = require('common-tags')

const {
  generateCSSReferences,
  generateJSReferences
} = require('mini-html-webpack-plugin')

function template(ctx) {
  const {
    publicPath,
    css,
    js,
    lang,
    title,
    favicon,
    container,
    head = [],
    body = [],
    trimWhitespace
  } = ctx

  const doc = html`
  <!DOCTYPE html>
  <html${lang && ` lang="${lang}"`}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${title || 'sample-app'}</title>
      ${favicon && `<link rel="icon" type="image/x-icon" href="${favicon}">`}
      ${generateMetaTags(head.meta)}
      ${generateLinkTags(head.links)}
      ${generateRawTags(head.raw)}
      ${generateScriptTags(head.scripts)}
      ${generateCSSReferences(css, publicPath)}
    </head>
    <body>
      ${container && `<div id="${container}"></div>`}
      ${generateRawTags(body.raw)}
      ${generateScriptTags(body.scripts)}
      ${generateJSReferences(js, publicPath)}
    </body>
  </html>`

  return trimWhitespace ? oneLineTrim(doc) : emptyLineTrim(doc)
}

function generateMetaTags(items = []) {
  return items.map(item => `<meta ${wrapItems(item)}>`)
}

function generateLinkTags(items = []) {
  return items.map(item => `<link ${wrapItems(item)}>`)
}

function generateScriptTags(items = []) {
  return items.map(item => `<script ${wrapItems(item)}></script>`)
}

function generateRawTags(items = []) {
  if (typeof items === 'string' || items instanceof String) {
    return items
  }
  return items.map(item => item)
}

function wrapItems(item) {
  return Object.keys(item)
    .map(key => `${key}="${item[key]}"`)
    .join(' ')
}

const emptyLineTrim = new TemplateTag(
  replaceResultTransformer(/^\s*[\r\n]/gm, ''),
  trimResultTransformer
)

module.exports = template
