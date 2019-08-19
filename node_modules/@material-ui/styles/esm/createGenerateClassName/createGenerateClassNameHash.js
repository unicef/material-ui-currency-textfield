import warning from 'warning';
import hash from '@emotion/hash';

function safePrefix(classNamePrefix) {
  var prefix = String(classNamePrefix);
  process.env.NODE_ENV !== "production" ? warning(prefix.length < 256, "Material-UI: the class name prefix is too long: ".concat(prefix, ".")) : void 0;
  return prefix;
}

var themeHashCache = {};
/**
 * Beta feature.
 *
 * This is an alternative to createGenerateClassName.js.
 * Instead of using a index counter, it hash the style sheets to generate the class name.
 * The class name call order invariant. With this property, we can cache the style sheets on the server.
 */

export default function createGenerateClassNameHash() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$dangerouslyU = options.dangerouslyUseGlobalCSS,
      dangerouslyUseGlobalCSS = _options$dangerouslyU === void 0 ? false : _options$dangerouslyU,
      _options$productionPr = options.productionPrefix,
      productionPrefix = _options$productionPr === void 0 ? 'jss' : _options$productionPr,
      _options$seed = options.seed,
      seed = _options$seed === void 0 ? '' : _options$seed;
  var ruleCounter = 0;
  return function (rule, styleSheet) {
    var isStatic = !styleSheet.options.link;

    if (dangerouslyUseGlobalCSS && styleSheet && styleSheet.options.name && isStatic) {
      return "".concat(safePrefix(styleSheet.options.name), "-").concat(rule.key);
    }

    var suffix; // It's a static rule.

    if (isStatic) {
      var themeHash = themeHashCache[styleSheet.options.theme];

      if (!themeHash) {
        themeHash = hash(JSON.stringify(styleSheet.options.theme));
        themeHashCache[styleSheet.theme] = themeHash;
      }

      var raw = styleSheet.rules.raw[rule.key];
      suffix = hash("".concat(themeHash).concat(rule.key).concat(JSON.stringify(raw)));
    }

    if (!suffix) {
      ruleCounter += 1;
      process.env.NODE_ENV !== "production" ? warning(ruleCounter < 1e10, ['Material-UI: you might have a memory leak.', 'The ruleCounter is not supposed to grow that much.'].join('')) : void 0;
      suffix = ruleCounter;
    }

    if (process.env.NODE_ENV === 'production') {
      return "".concat(productionPrefix).concat(seed).concat(suffix);
    } // Help with debuggability.


    if (styleSheet.options.classNamePrefix) {
      return "".concat(safePrefix(styleSheet.options.classNamePrefix), "-").concat(rule.key, "-").concat(seed).concat(suffix);
    }

    return "".concat(rule.key, "-").concat(seed).concat(suffix);
  };
}