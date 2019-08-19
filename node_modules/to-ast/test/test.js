var toAST = require('../');
var assert = require('assert');
var escodegen = require('escodegen');

function test(obj, res) {
  return assert.equal(escodegen.generate(toAST(obj), { format: { newline: '', indent: { style: '' } }}), res);
}

describe('to-ast', function() {
  it('converts undefined and null', function() {
    test(undefined, 'void 0');
    test(null, 'null');
  });
  
  it('converts numbers', function() {
    test(NaN, 'NaN');
    test(Infinity, 'Infinity')
    test(1, '1');
    test(-1, '-1');
    test(0xffff, 65535);
  });
  
  it('converts literals', function() {
    test('', "''");
    test('hi', "'hi'");
    test(true, 'true');
    test(false, 'false');
  });
  
  it('converts functions', function() {
    test(function hi(x, y) { return x * y; }, 'function hi(x, y) {return x * y;}');
    test(function() { return 2; }, 'function () {return 2;}');
    test(String.prototype.trim, 'null');
  });
  
  it('converts buffers', function() {
    test(new Buffer(0), "new Buffer('', 'base64')");
    test(new Buffer([ 0xff, 0xfe ]), "new Buffer('//4=', 'base64')");
  });
  
  it('converts arrays', function() {
    test([], '[]');
    test([1, 2, 3], '[1,2,3]');
    test(['foo', 'bar'], "['foo','bar']");
    test([1, null, 'test', -1, undefined, NaN], "[1,null,'test',-1,void 0,NaN]");
  });
  
  it('converts wrapper objects for literals', function() {
    test(new String('hi'), "new String('hi')");
    test(new Boolean(true), 'new Boolean(true)');
    test(new Number(2), 'new Number(2)');
    test(new Number(-2), 'new Number(-2)');
  });
  
  it('converts typed arrays', function() {
    test(new Uint8Array([1, 2, 3]), 'new Uint8Array([1,2,3])');
    test(new Uint8ClampedArray([1, 2, 3]), 'new Uint8ClampedArray([1,2,3])');
    test(new Int8Array([1, 2, 3]), 'new Int8Array([1,2,3])');
    test(new Uint16Array([1, 2, 3]), 'new Uint16Array([1,2,3])');
    test(new Int16Array([1, 2, 3]), 'new Int16Array([1,2,3])');
    test(new Uint32Array([1, 2, 3]), 'new Uint32Array([1,2,3])');
    test(new Int32Array([1, 2, 3]), 'new Int32Array([1,2,3])');
    test(new Float32Array([1, 2, 3]), 'new Float32Array([1,2,3])');
    test(new Float64Array([1, 2, 3]), 'new Float64Array([1,2,3])');
  });
  
  it('converts array buffers', function() {
    test(new ArrayBuffer(10), 'new ArrayBuffer(10)');
    test(new Uint8Array([0, 0, 0]).buffer, 'new ArrayBuffer(3)');
    test(new Uint8Array([1, 2, 3]).buffer, 'new Uint8Array([1,2,3]).buffer');
  });
  
  it('converts dates', function() {
    test(new Date(1427942885076), "new Date('2015-04-02T02:48:05.076Z')");
    test(new Date(NaN), 'new Date(NaN)');
  });
  
  it('converts errors', function() {
    test(new Error('hi'), "new Error('hi')");
    test(new TypeError('yo'), "new TypeError('yo')");
  });
  
  it('converts regular expressions', function() {
    test(/[abc]+/i, '/[abc]+/i');
    test(new RegExp('[abc]+', 'gi'), '/[abc]+/gi');
  });
  
  it('converts normal objects', function() {
    test({}, '{}');
    test({ foo: 2, bar: 'hi', baz: [1, 2, 3], yo: {b: 2} }, "{'foo': 2,'bar': 'hi','baz': [1,2,3],'yo': { 'b': 2 }}");
    
    function t() {
      this.x = 2;
      this.y = 5;
    }
    
    t.prototype.z = 5;
    
    test(new t(), "{'x': 2,'y': 5}");
  });
  
  it('uses custom toAST method when available', function() {
    test({ toAST: function() { return { type: 'Literal', value: 2 }; }}, '2');
  });
});
