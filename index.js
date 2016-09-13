const Wasm = require('./libwasm.js');
const wasm = Wasm.wasm;
const Module = Wasm.Module;

// Based on sexpr-wasm-prototype/demo/demo.js

function compile (input) {
  var ret;
  try {
    var stackAllocator = new wasm.StackAllocator(wasm.LibcAllocator);
    var script = wasm.parseAst(stackAllocator.allocator, 'test.wast', input);
    script.check();
    ret = new Buffer(script.toBinary({log: true}).buffer);
  } catch (e) {
    ret = e.toString();
  } finally {
    if (script) script.$destroy();
    if (stackAllocator) stackAllocator.$destroy();
  }
  return ret;
}

module.exports = compile;
