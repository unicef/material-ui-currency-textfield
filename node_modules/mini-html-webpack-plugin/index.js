const path = require('path');
const { RawSource } = require('webpack-sources');

class MiniHtmlWebpackPlugin {
	constructor(options = {}) {
		this.options = options;
		this.plugin = this.plugin.bind(this);
	}

	plugin(compilation, callback) {
		const { publicPath } = compilation.options.output;
		const { filename = 'index.html', template, context } = this.options;

		const files = getFiles(normalizeEntrypoints(compilation.entrypoints));

		compilation.assets[filename] = new RawSource(
			(template || defaultTemplate)(
				Object.assign({}, { publicPath }, context, files)
			)
		);

		callback();
	}

	apply(compiler) {
		if (compiler.hooks) {
			// Webpack 4
			compiler.hooks.emit.tapAsync('MiniHtmlWebpackPlugin', this.plugin);
		} else {
			// Webpack 3
			compiler.plugin('emit', this.plugin);
		}
	}
}

function getFiles(entrypoints) {
	const ret = {};

	entrypoints.forEach(entry => {
		entry.getFiles().forEach(file => {
			const extension = path.extname(file).replace(/\./, '');

			if (!ret[extension]) {
				ret[extension] = [];
			}

			ret[extension].push(file);
		});
	});

	return ret;
}

function normalizeEntrypoints(entrypoints) {
	// Webpack 4
	if (entrypoints.forEach) {
		return entrypoints;
	}

	// Webpack 3
	return Object.keys(entrypoints).map(name => entrypoints[name]);
}

function defaultTemplate({ css, js, title = '', publicPath }) {
	return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>

      ${generateCSSReferences(css, publicPath)}
    </head>
    <body>
      ${generateJSReferences(js, publicPath)}
    </body>
  </html>`;
}

function generateCSSReferences(files = [], publicPath = '') {
	return files
		.map(file => `<link href="${publicPath}${file}" rel="stylesheet">`)
		.join('');
}

function generateJSReferences(files = [], publicPath = '') {
	return files
		.map(file => `<script src="${publicPath}${file}"></script>`)
		.join('');
}

module.exports = MiniHtmlWebpackPlugin;
module.exports.defaultTemplate = defaultTemplate;
module.exports.generateCSSReferences = generateCSSReferences;
module.exports.generateJSReferences = generateJSReferences;
