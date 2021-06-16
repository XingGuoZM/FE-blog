(() => {
  var __webpack_modules__ = ({
    "./src/cjs-module/index.js":
      ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
        eval("\nconst { multi } = __webpack_require__(/*! ./multi */ \"./src/cjs-module/multi.js\");\n\nmulti(1, 2);\n\n//# sourceURL=webpack://webpack-demo-module/./src/cjs-module/index.js?");
      }),
    "./src/cjs-module/log.js":
      ((module) => {
        eval("function log(msg) {\n  console.log(msg);\n}\nmodule.exports = {\n  log\n}\n\n//# sourceURL=webpack://webpack-demo-module/./src/cjs-module/log.js?");
      }),
    "./src/cjs-module/multi.js":
      ((__unused_webpack_module, exports, __webpack_require__) => {
        eval("const sum = __webpack_require__(/*! ./sum */ \"./src/cjs-module/sum.js\");\nfunction multi(a, b) {\n  sum(a, b);\n  return a * b;\n}\n\nexports = { multi }\n\n//# sourceURL=webpack://webpack-demo-module/./src/cjs-module/multi.js?");
      }),
    "./src/cjs-module/sum.js":
      ((module, __unused_webpack_exports, __webpack_require__) => {
        eval("const { log } = __webpack_require__(/*! ./log */ \"./src/cjs-module/log.js\");\nfunction sum(a, b) {\n  return a + b;\n}\n\nmodule.exports = {\n  sum\n}\n\n//# sourceURL=webpack://webpack-demo-module/./src/cjs-module/sum.js?");
      })
  });
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  var __webpack_exports__ = __webpack_require__("./src/cjs-module/index.js");
})();
