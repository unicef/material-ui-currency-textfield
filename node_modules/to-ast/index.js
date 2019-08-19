var n = require('ast-types').builders;
var esprima = require('esprima');

var typedArrays = {
  Uint8Array: true,
  Int8Array: true,
  Uint8ClampedArray: true,
  Uint16Array: true,
  Int16Array: true,
  Uint32Array: true,
  Int32Array: true,
  Float32Array: true,
  Float64Array: true
};

function toAST(obj) {
  // undefined -> `void 0`
  if (typeof obj === 'undefined')
    return n.unaryExpression('void', n.literal(0));
  
  // Nan, Infinity, and number literals
  if (typeof obj === 'number') {
    if (obj !== obj)
      return n.identifier('NaN');
    
    if (obj === Infinity)
      return n.identifier('Infinity');
    
    if (obj < 0)
      return n.unaryExpression('-', n.literal(-obj));
    
    return n.literal(obj);
  }
  
  // other literals
  if (obj === null || typeof obj === 'string' || typeof obj === 'boolean')
    return n.literal(obj);
  
  // functions
  if (typeof obj === 'function') {
    var source = obj.toString();
    
    // parse the source using esprima, as a function expression
    try {
      return esprima.parse('x = ' + source).body[0].expression.right;
    } catch (e) {
      // happens for native functions
      return n.literal(null);
    }
  }
  
  // buffers (encoded as base64)
  if (Buffer.isBuffer(obj)) {
    return n.newExpression(n.identifier('Buffer'), [
      n.literal(obj.toString('base64')),
      n.literal('base64')
    ]);
  }
  
  // arrays
  if (Array.isArray(obj))
    return n.arrayExpression(obj.map(toAST));
    
  // other objects
  if (typeof obj === 'object') {
    // get the internal [[Class]] of the object
    var type = Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
    
    // wrapper objects for literals
    if (type === 'String' || type === 'Number' || type === 'Boolean')
      return n.newExpression(n.identifier(type), [toAST(obj.valueOf())]);
    
    // ArrayBuffers
    if (type === 'ArrayBuffer') {
      // make a Uint8Array to preserve the data
      var buf = new Uint8Array(obj);
      
      // but, if it's all zeros then just construct the array buffer using a length
      var allZero = true;
      for (var i = 0; i < buf.length; i++) {
        if (buf[i] !== 0) {
          allZero = false;
          break;
        }
      }
      
      if (allZero)
        return n.newExpression(n.identifier(type), [n.literal(obj.byteLength)]);
      
      // otherwise, create a Uint8Array and access the buffer property at runtime
      return n.memberExpression(toAST(buf), n.identifier('buffer'));
    }
    
    // typed arrays have their data inlined
    if (typedArrays[type]) {
      return n.newExpression(n.identifier(type), [
        n.arrayExpression(Array.prototype.slice.call(obj).map(toAST))
      ]);
    }
      
    // Dates are created at runtime from ISO strings
    if (type === 'Date') {
      var d;
      try {
        d = toAST(obj.toISOString());
      } catch (e) {
        d = toAST(NaN);
      }
      
      return n.newExpression(n.identifier(type), [d]);
    }
      
    // Errors (including subclasses like TypeError, etc.)
    if (type === 'Error')
      return n.newExpression(n.identifier(obj.constructor.name), [toAST(obj.message)]);
    
    // RegExps are inlined as literals
    if (type === 'RegExp')
      return n.literal(obj);
    
    // If the object has a toAST method, use that
    if (typeof obj.toAST === 'function')
      return obj.toAST();
    
    // Finally, other objects are output as object expressions
    var properties = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        properties.push(n.property('init', n.literal(key), toAST(obj[key])));
      }
    }
    
    return n.objectExpression(properties);
  }
  
  throw new Error('Unsupported type to convert to AST');
}

module.exports = toAST;
