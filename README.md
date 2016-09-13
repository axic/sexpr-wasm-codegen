# sexpr-wasm-codegen

Compile WebAssembly S-expressions (WAST) to binary format. Inside the browser or Node. Yee-haw!

The API is simple:
```
const codegen = require('sexpr-wasm-codegen')
codegen(<S-expression as Buffer>) -> <binary as Buffer>
```

Internally it is using [sexpr-wasm-prototype](https://github.com/WebAssembly/sexpr-wasm-prototype)
compiled with Emscripten.

This version uses `binary_0xb` branch (commit: `2bb13aa785be9908b95d0e2e09950b39a26004fa`) which
outputs revision B binaries.
