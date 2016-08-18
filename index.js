const Wasm = require('./libwasm.js');
const wasm = Wasm.wasm;
const Module = Wasm.Module;

// Based on sexpr-wasm-prototype/demo/demo.js

function onError (loc, error, sourceLine, sourceLineColumnOffset) {
  var lines = [
    loc.filename + ':' + loc.line + ':' + loc.firstColumn,
    error
  ];
  if (sourceLine.length > 0) {
    var numSpaces = loc.firstColumn - 1 - sourceLineColumnOffset;
    var numCarets =
        Math.min(loc.lastColumn - loc.firstColumn, sourceLine.length);
    lines.push(sourceLine);
    lines.push(' '.repeat(numSpaces) + '^'.repeat(numCarets));
  }

  error += lines.join('\n') + '\n';
}

function compile (input) {
  var ret;
  try {
    var allocator = wasm.LibcAllocator;
    var eh = new wasm.SourceErrorHandler(onError, 80);
    var buf = wasm.Buffer.fromString(input.toString());
    var lexer = wasm.Lexer.fromBuffer(allocator, 'test.wast', buf);
    var script = wasm.parse(lexer, eh);
    wasm.checkAst(lexer, script, eh);
    var memoryWriter = new wasm.MemoryWriter(allocator);
    var jsWriter = new wasm.JSStringWriter();
    var logStream = new wasm.Stream(jsWriter.writer);
    var options = new wasm.WriteBinaryOptions({logStream: logStream});
    wasm.markUsedBlocks(allocator, script);
    wasm.writeBinaryScript(allocator, memoryWriter.base, script, options);
    // dark magic
    ret = new Buffer(Module.Pointer_stringify(memoryWriter.buf.buf.$addr, memoryWriter.buf.buf.$size));
  } catch (e) {
    ret = e.toString();
  } finally {
    if (options) {
      options.$destroy();
    }
    if (logStream) {
      logStream.$destroy();
    }
    if (script) {
      script.$destroy();
    }
    if (jsWriter) {
      jsWriter.$destroy();
    }
    if (memoryWriter) {
      memoryWriter.$destroy();
    }
    if (lexer) {
      lexer.$destroy();
    }
    if (buf) {
      buf.$destroy();
    }
    if (eh) {
      eh.$destroy();
    }
  }
  return ret;
}

module.exports = compile;
