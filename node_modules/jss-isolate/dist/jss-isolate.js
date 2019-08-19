(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jssIsolate"] = factory();
	else
		root["jssIsolate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports['default'] = jssIsolate;
	
	var _inherited = __webpack_require__(1);
	
	var _inherited2 = _interopRequireDefault(_inherited);
	
	var _all = __webpack_require__(2);
	
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = {
	  "azimuth": "center",
	  "border-collapse": "separate",
	  "border-spacing": "0",
	  "caption-side": "top",
	  "caret-color": "auto",
	  "color": "initial",
	  "cursor": "auto",
	  "empty-cells": "show",
	  "font-family": "initial",
	  "font-feature-settings": "normal",
	  "font-kerning": "auto",
	  "font-language-override": "normal",
	  "font-size": "medium",
	  "font-size-adjust": "none",
	  "font-stretch": "normal",
	  "font-style": "normal",
	  "font-synthesis": "weight style",
	  "font-variant": "normal",
	  "font-variant-alternates": "normal",
	  "font-variant-caps": "normal",
	  "font-variant-east-asian": "normal",
	  "font-variant-ligatures": "normal",
	  "font-variant-numeric": "normal",
	  "font-variant-position": "normal",
	  "font-weight": "normal",
	  "hyphens": "manual",
	  "image-orientation": "0deg",
	  "image-rendering": "auto",
	  "image-resolution": "1dppx",
	  "letter-spacing": "normal",
	  "line-height": "normal",
	  "list-style-image": "none",
	  "list-style-position": "outside",
	  "list-style-type": "disc",
	  "object-position": "50% 50%",
	  "orphans": "2",
	  "overflow-wrap": "normal",
	  "pointer-events": "auto",
	  "quotes": "initial",
	  "ruby-align": "space-around",
	  "ruby-merge": "separate",
	  "ruby-position": "over",
	  "tab-size": "8",
	  "text-align": "initial",
	  "text-align-last": "auto",
	  "text-combine-upright": "none",
	  "text-indent": "0",
	  "text-justify": "auto",
	  "text-orientation": "mixed",
	  "text-rendering": "auto",
	  "text-shadow": "none",
	  "text-transform": "none",
	  "text-underline-position": "auto",
	  "visibility": "visible",
	  "white-space": "normal",
	  "widows": "2",
	  "word-break": "normal",
	  "word-spacing": "normal",
	  "word-wrap": "normal",
	  "writing-mode": "horizontal-tb",
	  "-webkit-appearance": "none",
	  "-moz-appearance": "none",
	  "-ms-appearance": "none",
	  "appearance": "none"
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = {
	  "align-content": "stretch",
	  "align-items": "stretch",
	  "align-self": "auto",
	  "animation-delay": "0s",
	  "animation-direction": "normal",
	  "animation-duration": "0s",
	  "animation-fill-mode": "none",
	  "animation-iteration-count": "1",
	  "animation-name": "none",
	  "animation-play-state": "running",
	  "animation-timing-function": "ease",
	  "azimuth": "center",
	  "backface-visibility": "visible",
	  "background-attachment": "scroll",
	  "background-blend-mode": "normal",
	  "background-clip": "border-box",
	  "background-color": "transparent",
	  "background-image": "none",
	  "background-origin": "padding-box",
	  "background-position": "0% 0%",
	  "background-repeat": "repeat",
	  "background-size": "auto auto",
	  "block-size": "auto",
	  "border-block-end-color": "currentcolor",
	  "border-block-end-style": "none",
	  "border-block-end-width": "medium",
	  "border-block-start-color": "currentcolor",
	  "border-block-start-style": "none",
	  "border-block-start-width": "medium",
	  "border-bottom-color": "currentcolor",
	  "border-bottom-left-radius": "0",
	  "border-bottom-right-radius": "0",
	  "border-bottom-style": "none",
	  "border-bottom-width": "medium",
	  "border-collapse": "separate",
	  "border-image-outset": "0s",
	  "border-image-repeat": "stretch",
	  "border-image-slice": "100%",
	  "border-image-source": "none",
	  "border-image-width": "1",
	  "border-inline-end-color": "currentcolor",
	  "border-inline-end-style": "none",
	  "border-inline-end-width": "medium",
	  "border-inline-start-color": "currentcolor",
	  "border-inline-start-style": "none",
	  "border-inline-start-width": "medium",
	  "border-left-color": "currentcolor",
	  "border-left-style": "none",
	  "border-left-width": "medium",
	  "border-right-color": "currentcolor",
	  "border-right-style": "none",
	  "border-right-width": "medium",
	  "border-spacing": "0",
	  "border-top-color": "currentcolor",
	  "border-top-left-radius": "0",
	  "border-top-right-radius": "0",
	  "border-top-style": "none",
	  "border-top-width": "medium",
	  "bottom": "auto",
	  "box-decoration-break": "slice",
	  "box-shadow": "none",
	  "box-sizing": "content-box",
	  "break-after": "auto",
	  "break-before": "auto",
	  "break-inside": "auto",
	  "caption-side": "top",
	  "caret-color": "auto",
	  "clear": "none",
	  "clip": "auto",
	  "clip-path": "none",
	  "color": "initial",
	  "column-count": "auto",
	  "column-fill": "balance",
	  "column-gap": "normal",
	  "column-rule-color": "currentcolor",
	  "column-rule-style": "none",
	  "column-rule-width": "medium",
	  "column-span": "none",
	  "column-width": "auto",
	  "content": "normal",
	  "counter-increment": "none",
	  "counter-reset": "none",
	  "cursor": "auto",
	  "display": "inline",
	  "empty-cells": "show",
	  "filter": "none",
	  "flex-basis": "auto",
	  "flex-direction": "row",
	  "flex-grow": "0",
	  "flex-shrink": "1",
	  "flex-wrap": "nowrap",
	  "float": "none",
	  "font-family": "initial",
	  "font-feature-settings": "normal",
	  "font-kerning": "auto",
	  "font-language-override": "normal",
	  "font-size": "medium",
	  "font-size-adjust": "none",
	  "font-stretch": "normal",
	  "font-style": "normal",
	  "font-synthesis": "weight style",
	  "font-variant": "normal",
	  "font-variant-alternates": "normal",
	  "font-variant-caps": "normal",
	  "font-variant-east-asian": "normal",
	  "font-variant-ligatures": "normal",
	  "font-variant-numeric": "normal",
	  "font-variant-position": "normal",
	  "font-weight": "normal",
	  "grid-auto-columns": "auto",
	  "grid-auto-flow": "row",
	  "grid-auto-rows": "auto",
	  "grid-column-end": "auto",
	  "grid-column-gap": "0",
	  "grid-column-start": "auto",
	  "grid-row-end": "auto",
	  "grid-row-gap": "0",
	  "grid-row-start": "auto",
	  "grid-template-areas": "none",
	  "grid-template-columns": "none",
	  "grid-template-rows": "none",
	  "height": "auto",
	  "hyphens": "manual",
	  "image-orientation": "0deg",
	  "image-rendering": "auto",
	  "image-resolution": "1dppx",
	  "ime-mode": "auto",
	  "inline-size": "auto",
	  "isolation": "auto",
	  "justify-content": "flex-start",
	  "left": "auto",
	  "letter-spacing": "normal",
	  "line-break": "auto",
	  "line-height": "normal",
	  "list-style-image": "none",
	  "list-style-position": "outside",
	  "list-style-type": "disc",
	  "margin-block-end": "0",
	  "margin-block-start": "0",
	  "margin-bottom": "0",
	  "margin-inline-end": "0",
	  "margin-inline-start": "0",
	  "margin-left": "0",
	  "margin-right": "0",
	  "margin-top": "0",
	  "mask-clip": "border-box",
	  "mask-composite": "add",
	  "mask-image": "none",
	  "mask-mode": "match-source",
	  "mask-origin": "border-box",
	  "mask-position": "0% 0%",
	  "mask-repeat": "repeat",
	  "mask-size": "auto",
	  "mask-type": "luminance",
	  "max-height": "none",
	  "max-width": "none",
	  "min-block-size": "0",
	  "min-height": "0",
	  "min-inline-size": "0",
	  "min-width": "0",
	  "mix-blend-mode": "normal",
	  "object-fit": "fill",
	  "object-position": "50% 50%",
	  "offset-block-end": "auto",
	  "offset-block-start": "auto",
	  "offset-inline-end": "auto",
	  "offset-inline-start": "auto",
	  "opacity": "1.0",
	  "order": "0",
	  "orphans": "2",
	  "outline-color": "initial",
	  "outline-offset": "0",
	  "outline-style": "none",
	  "outline-width": "medium",
	  "overflow": "visible",
	  "overflow-wrap": "normal",
	  "overflow-x": "visible",
	  "overflow-y": "visible",
	  "padding-block-end": "0",
	  "padding-block-start": "0",
	  "padding-bottom": "0",
	  "padding-inline-end": "0",
	  "padding-inline-start": "0",
	  "padding-left": "0",
	  "padding-right": "0",
	  "padding-top": "0",
	  "page-break-after": "auto",
	  "page-break-before": "auto",
	  "page-break-inside": "auto",
	  "perspective": "none",
	  "perspective-origin": "50% 50%",
	  "pointer-events": "auto",
	  "position": "static",
	  "quotes": "initial",
	  "resize": "none",
	  "right": "auto",
	  "ruby-align": "space-around",
	  "ruby-merge": "separate",
	  "ruby-position": "over",
	  "scroll-behavior": "auto",
	  "scroll-snap-coordinate": "none",
	  "scroll-snap-destination": "0px 0px",
	  "scroll-snap-points-x": "none",
	  "scroll-snap-points-y": "none",
	  "scroll-snap-type": "none",
	  "shape-image-threshold": "0.0",
	  "shape-margin": "0",
	  "shape-outside": "none",
	  "tab-size": "8",
	  "table-layout": "auto",
	  "text-align": "initial",
	  "text-align-last": "auto",
	  "text-combine-upright": "none",
	  "text-decoration-color": "currentcolor",
	  "text-decoration-line": "none",
	  "text-decoration-style": "solid",
	  "text-emphasis-color": "currentcolor",
	  "text-emphasis-position": "over right",
	  "text-emphasis-style": "none",
	  "text-indent": "0",
	  "text-justify": "auto",
	  "text-orientation": "mixed",
	  "text-overflow": "clip",
	  "text-rendering": "auto",
	  "text-shadow": "none",
	  "text-transform": "none",
	  "text-underline-position": "auto",
	  "top": "auto",
	  "touch-action": "auto",
	  "transform": "none",
	  "transform-box": "border-box ",
	  "transform-origin": "50% 50% 0",
	  "transform-style": "flat",
	  "transition-delay": "0s",
	  "transition-duration": "0s",
	  "transition-property": "all",
	  "transition-timing-function": "ease",
	  "vertical-align": "baseline",
	  "visibility": "visible",
	  "white-space": "normal",
	  "widows": "2",
	  "width": "auto",
	  "will-change": "auto",
	  "word-break": "normal",
	  "word-spacing": "normal",
	  "word-wrap": "normal",
	  "writing-mode": "horizontal-tb",
	  "z-index": "auto",
	  "-webkit-appearance": "none",
	  "-moz-appearance": "none",
	  "-ms-appearance": "none",
	  "appearance": "none"
	};

/***/ })
/******/ ])
});
;
//# sourceMappingURL=jss-isolate.js.map