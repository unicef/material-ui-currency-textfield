'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('babel-runtime/regenerator'));
var _toConsumableArray = _interopDefault(require('babel-runtime/helpers/toConsumableArray'));
var _JSON$stringify = _interopDefault(require('babel-runtime/core-js/json/stringify'));
var _Object$keys = _interopDefault(require('babel-runtime/core-js/object/keys'));
var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));
var _Object$assign = _interopDefault(require('babel-runtime/core-js/object/assign'));
var _asyncToGenerator = _interopDefault(require('babel-runtime/helpers/asyncToGenerator'));
var pify = _interopDefault(require('pify'));
var resolve = _interopDefault(require('resolve'));
var sass = _interopDefault(require('sass'));
var path = require('path');
var fs = require('fs');
var util = require('util');
var rollupPluginutils = require('rollup-pluginutils');
var style_js = require('./style.js');
var fsExtra = require('fs-extra');

var MATCH_SASS_FILENAME_RE = /\.sass$/;
var MATCH_NODE_MODULE_RE = /^~([a-z0-9]|@).+/i;

function plugin() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$include = options.include,
      include = _options$include === undefined ? ['**/*.sass', '**/*.scss'] : _options$include,
      _options$exclude = options.exclude,
      exclude = _options$exclude === undefined ? 'node_modules/**' : _options$exclude;

  var filter = rollupPluginutils.createFilter(include, exclude);
  var insertFnName = '___$insertStyle';
  var styles = [];
  var styleMaps = {};

  options.output = options.output || false;
  options.insert = options.insert || false;

  var sassRuntime = options.runtime || sass;

  return {
    name: 'sass',

    intro: function intro() {
      if (options.insert) {
        return style_js.insertStyle.toString().replace(/insertStyle/, insertFnName);
      }
    },
    transform: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(code, id) {
        var paths, customizedSassOptions, res, css, defaultExport, restExports, processResult;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (filter(id)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                _context.prev = 2;
                paths = [path.dirname(id), process.cwd()];
                customizedSassOptions = options.options || {};
                _context.next = 7;
                return pify(sassRuntime.render.bind(sassRuntime))(_Object$assign({}, customizedSassOptions, {
                  file: id,
                  data: customizedSassOptions.data && '' + customizedSassOptions.data + code,
                  indentedSyntax: MATCH_SASS_FILENAME_RE.test(id),
                  includePaths: customizedSassOptions.includePaths ? customizedSassOptions.includePaths.concat(paths) : paths,
                  importer: [function (url, importer, done) {
                    if (!MATCH_NODE_MODULE_RE.test(url)) {
                      return null;
                    }

                    var moduleUrl = url.slice(1);
                    var resolveOptions = {
                      basedir: path.dirname(importer),
                      extensions: ['.scss', '.sass']
                    };

                    try {
                      done({
                        file: resolve.sync(moduleUrl, resolveOptions)
                      });
                    } catch (err) {
                      if (customizedSassOptions.importer && customizedSassOptions.importer.length) {
                        return null;
                      }
                      done({
                        file: url
                      });
                    }
                  }].concat(customizedSassOptions.importer || [])
                }));

              case 7:
                res = _context.sent;
                css = res.css.toString().trim();
                defaultExport = '';
                restExports = void 0;

                if (!css) {
                  _context.next = 27;
                  break;
                }

                if (!util.isFunction(options.processor)) {
                  _context.next = 25;
                  break;
                }

                _context.next = 15;
                return options.processor(css, id);

              case 15:
                processResult = _context.sent;

                if (!((typeof processResult === 'undefined' ? 'undefined' : _typeof(processResult)) === 'object')) {
                  _context.next = 24;
                  break;
                }

                if (!(typeof processResult.css !== 'string')) {
                  _context.next = 19;
                  break;
                }

                throw new Error('You need to return the styles using the `css` property. See https://github.com/differui/rollup-plugin-sass#processor');

              case 19:
                css = processResult.css;
                delete processResult.css;
                restExports = _Object$keys(processResult).map(function (name) {
                  return 'export const ' + name + ' = ' + _JSON$stringify(processResult[name]) + ';';
                });
                _context.next = 25;
                break;

              case 24:
                if (typeof processResult === 'string') {
                  css = processResult;
                }

              case 25:
                if (styleMaps[id]) {
                  styleMaps[id].content = css;
                } else {
                  styles.push(styleMaps[id] = {
                    id: id,
                    content: css
                  });
                }
                if (options.insert === true) {
                  defaultExport = insertFnName + '(' + _JSON$stringify(css) + ');';
                } else if (options.output === false) {
                  defaultExport = _JSON$stringify(css);
                } else {
                  defaultExport = '"";';
                }

              case 27:
                return _context.abrupt('return', {
                  code: ['export default ' + defaultExport + ';'].concat(_toConsumableArray(restExports || [])).join('\n'),
                  map: {
                    mappings: res.map ? res.map.toString() : ''
                  }
                });

              case 30:
                _context.prev = 30;
                _context.t0 = _context['catch'](2);
                throw _context.t0;

              case 33:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 30]]);
      }));

      function transform(_x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return transform;
    }(),
    generateBundle: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(generateOptions, bundle, isWrite) {
        var css, dest;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!options.insert && (!styles.length || options.output === false))) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                if (isWrite) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return');

              case 4:
                css = styles.map(function (style) {
                  return style.content;
                }).join('');

                if (!util.isString(options.output)) {
                  _context2.next = 10;
                  break;
                }

                fsExtra.ensureFileSync(options.output, function (err) {
                  if (err) {
                    throw err;
                  }
                });
                return _context2.abrupt('return', fs.writeFileSync(options.output, css));

              case 10:
                if (!util.isFunction(options.output)) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt('return', options.output(css, styles));

              case 14:
                if (!(!options.insert && generateOptions.file && options.output === true)) {
                  _context2.next = 20;
                  break;
                }

                dest = generateOptions.file;


                if (dest.endsWith('.js') || dest.endsWith('.ts')) {
                  dest = dest.slice(0, -3);
                }
                dest = dest + '.css';
                fsExtra.ensureFileSync(dest, function (err) {
                  if (err) {
                    throw err;
                  }
                });
                return _context2.abrupt('return', fs.writeFileSync(dest, css));

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function generateBundle(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return generateBundle;
    }()
  };
}

module.exports = plugin;
