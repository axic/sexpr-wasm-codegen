# sexpr-wasm-codegen

Compile WebAssembly S-expressions (WAST) to binary format. Inside the browser or Node. Yee-haw!

The API is simple:
```
const codegen = require('sexpr-wasm-codegen')
codegen.compile(<S-expression as Buffer>) -> <binary as Buffer>
```

Internally it is using [sexpr-wasm-prototype](https://github.com/WebAssembly/sexpr-wasm-prototype)
compiled with Emscripten.

This version uses `binary_0xa` branch (commit: `98729df534b55d495d0040266daaaf96ed41b9f9`) which
outputs revision A binaries.
