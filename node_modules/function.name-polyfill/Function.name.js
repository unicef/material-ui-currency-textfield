(function() {

var fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^\(\s\/]*)\s*/;

function _name() {
  var match, name;
  if (this === Function || this === Function.prototype.constructor) {
    name = "Function";
  }
  else if (this !== Function.prototype) {
    match = ("" + this).match(fnNameMatchRegex);
    name = match && match[1];
  }
  return name || "";
}

// Inspect the polyfill-ability of this browser
var needsPolyfill = !("name" in Function.prototype && "name" in (function x() {}));
var canDefineProp = typeof Object.defineProperty === "function" &&
  (function() {
    var result;
    try {
      Object.defineProperty(Function.prototype, "_xyz", {
        get: function() {
          return "blah";
        },
        configurable: true
      });
      result = Function.prototype._xyz === "blah";
      delete Function.prototype._xyz;
    }
    catch (e) {
      result = false;
    }
    return result;
  })();
var canDefineGetter = typeof Object.prototype.__defineGetter__ === "function" &&
  (function() {
    var result;
    try {
      Function.prototype.__defineGetter__("_abc", function() {
        return "foo";
      });
      result = Function.prototype._abc === "foo";
      delete Function.prototype._abc;
    }
    catch (e) {
      result = false;
    }
    return result;
  })();



// Add the "private" property for testing, even if the real property can be polyfilled
Function.prototype._name = _name;


// Polyfill it!
// For:
//  * IE >=9 <12
//  * Chrome <33
if (needsPolyfill) {
  // For:
  //  * IE >=9 <12
  //  * Chrome >=5 <33
  if (canDefineProp) {
    Object.defineProperty(Function.prototype, "name", {
      get: function() {
        var name = _name.call(this);

        // Since named function definitions have immutable names, also memoize the
        // output by defining the `name` property directly on this Function
        // instance so that this polyfill will not need to be invoked again
        if (this !== Function.prototype) {
          Object.defineProperty(this, "name", {
            value: name,
            configurable: true
          });
        }

        return name;
      },
      configurable: true
    });
  }
  // For:
  //  * Chrome <5
  else if (canDefineGetter) {
    // NOTE:
    // The snippet:
    //
    //     x.__defineGetter__('y', z);
    //
    // ...is essentially equivalent to:
    //
    //     Object.defineProperty(x, 'y', {
    //       get: z,
    //       configurable: true,  // <-- key difference #1
    //       enumerable: true     // <-- key difference #2
    //     });
    //
    Function.prototype.__defineGetter__("name", function() {
      var name = _name.call(this);

      // Since named function definitions have immutable names, also memoize the
      // output by defining the `name` property directly on this Function
      // instance so that this polyfill will not need to be invoked again
      if (this !== Function.prototype) {
        this.__defineGetter__("name", function() { return name; });
      }

      return name;
    });
  }
}

})();
