# mini-html-webpack-plugin: a miniature version of html-webpack-plugin with only necessary features

[![npm](https://img.shields.io/npm/v/mini-html-webpack-plugin.svg)](https://www.npmjs.com/package/mini-html-webpack-plugin) [![Build Status](https://travis-ci.org/styleguidist/mini-html-webpack-plugin.svg)](https://travis-ci.org/styleguidist/mini-html-webpack-plugin)

The plugin writes CSS and JS asset paths for you automatically. Works with webpack 3 and 4.

**It does not work with html-webpack-plugin plugins!**

## Usage

```
npm install mini-html-webpack-plugin
```

```javascript
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');

const config = {
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'Webpack demo'
      },
      filename: 'demo.html' // Optional, defaults to `index.html`
    })
  ]
};
```

### HTML minification

```javascript
const minify = require('html-minifier').minify;
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');

const config = {
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'Minification demo'
      },
      template: context =>
        minify(MiniHtmlWebpackPlugin.defaultTemplate(context))
    })
  ]
};
```

### Custom templates

Use [@vxna/mini-html-webpack-template](https://www.npmjs.com/package/@vxna/mini-html-webpack-template) to add an app container div, a favicon, meta tags, inline JavaScript or CSS.

Or define a template function to generate your own code:

```js
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const {
  generateCSSReferences,
  generateJSReferences
} = MiniHtmlWebpackPlugin;

const config = {
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'Custom template' // Available in the context below
      },
      template: ({ css, js, title, publicPath }) =>
        `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>${title}</title>
              ${generateCSSReferences(css, publicPath)}
            </head>
            <body>
              <div id="app"></div>
              ${generateJSReferences(js, publicPath)}
            </body>
          </html>`
    })
  ]
};
```

## License

MIT.
