'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = jssIsolate;

var _inherited = require('css-initials/inherited');

var _inherited2 = _interopRequireDefault(_inherited);

var _all = require('css-initials/all');

var _all2 = _interopRequireDefault(_all);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var resetSheetOptions = {
  meta: 'jss-isolate',
  // Lets make it always the first one in sheets for testing
  // and specificity.
  index: -Infinity,
  link: true
};

var initialsMap = {
  inherited: _inherited2['default'],
  all: _all2['default']
};

var getStyle = function getStyle() {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'inherited';

  // Option is either "inherited" or "all".
  if (typeof option === 'string') return initialsMap[option];

  if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
    // Option is ["all/inherited", {...style}]
    if (Array.isArray(option)) {
      var type = option[0];
      var style = option[1];
      return _extends({}, initialsMap[type], style);
    }
    // Option is a style object, use inherited initials by default.
    return _extends({}, _inherited2['default'], option);
  }

  return _inherited2['default'];
};

var ignoreParents = {
  keyframes: true,
  conditional: true
};

var shouldIsolate = function shouldIsolate(rule, sheet, options) {
  var parent = rule.options.parent;


  if (parent && ignoreParents[parent.type]) {
    return false;
  }

  var isolate = options.isolate == null ? true : options.isolate;
  if (sheet.options.isolate != null) isolate = sheet.options.isolate;
  if (rule.style.isolate != null) {
    isolate = rule.style.isolate;
    delete rule.style.isolate;
  }

  // Option `isolate` may be for e.g. `{isolate: 'root'}`.
  // In this case it must match the rule name in order to isolate it.
  if (typeof isolate === 'string') {
    return isolate === rule.key;
  }

  return isolate;
};

/**
 * Performance optimized debounce without using setTimeout.
 * Returns a function which:
 * - will execute the passed fn not more than once per delay
 * - will not execute the passed fn if last try was within delay
 */
var createDebounced = function createDebounced(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

  var time = Date.now();
  return function () {
    var now = Date.now();
    if (now - time < delay) return false;
    time = now;
    fn();
    return true;
  };
};

function jssIsolate() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var setSelectorDone = false;
  var selectors = [];
  var resetSheet = void 0;
  var resetRule = void 0;

  var setSelector = function setSelector() {
    resetRule.selector = selectors.join(',\n');
  };

  var setSelectorDebounced = createDebounced(setSelector);

  function onProcessRule(rule, sheet) {
    if (!sheet || sheet === resetSheet || rule.type !== 'style') return;

    if (!shouldIsolate(rule, sheet, options)) return;

    // Create a reset Style Sheet once and use it for all rules.
    if (!resetRule) {
      resetSheet = rule.options.jss.createStyleSheet(null, resetSheetOptions);
      resetRule = resetSheet.addRule('reset', getStyle(options.reset));
      resetSheet.attach();
    }

    // Add reset rule class name to the classes map of users Style Sheet.
    var selector = rule.selector;

    if (selectors.indexOf(selector) === -1) {
      selectors.push(selector);
      setSelectorDone = setSelectorDebounced();
    }
  }

  // We make sure selector is set, because `debaunceMaybe` will not execute
  // the fn if called within delay.
  function onProcessSheet() {
    if (!setSelectorDone && selectors.length) setSelector();
  }

  return {
    onProcessRule: onProcessRule,
    onProcessSheet: onProcessSheet
  };
}