(() => {
  "use strict";
  var __webpack_modules__ = ({
    "./src/App.jsx": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        "default": () => App
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");

      function App() {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "\u4ECE0\u5F00\u59CB\u6784\u5EFA\u4E00\u4E2Areact\u811A\u624B\u67B6");
      }
    }),

    "./src/index.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
      var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-dom/index.js");
      var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/App.jsx");
      react_dom__WEBPACK_IMPORTED_MODULE_1__.render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(_App__WEBPACK_IMPORTED_MODULE_2__.default, null), document.querySelector('#root'));
    })
  });
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  __webpack_require__.m = __webpack_modules__;
  __webpack_require__.x = x => { }
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();
  (() => {
    __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
  })();
  (() => {

    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();
  (() => {
    var installedChunks = {
      "app": 0
    };
    var deferredModules = [
      ["./src/index.js", "vendors-node_modules_react-dom_index_js"]
    ];
    var checkDeferredModules = x => { };
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime, executeModules] = data;
      var moduleId, chunkId, i = 0, resolves = [];
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
          resolves.push(installedChunks[chunkId][0]);
        }
        installedChunks[chunkId] = 0;
      }
      for (moduleId in moreModules) {
        if (__webpack_require__.o(moreModules, moduleId)) {
          __webpack_require__.m[moduleId] = moreModules[moduleId];
        }
      }
      if (runtime) runtime(__webpack_require__);
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      while (resolves.length) {
        resolves.shift()();
      }
      if (executeModules) deferredModules.push.apply(deferredModules, executeModules);
      return checkDeferredModules();
    }
    var chunkLoadingGlobal = self["webpackChunkwebpack_react"] = self["webpackChunkwebpack_react"] || [];
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    function checkDeferredModulesImpl() {
      var result;
      for (var i = 0; i < deferredModules.length; i++) {
        var deferredModule = deferredModules[i];
        var fulfilled = true;
        for (var j = 1; j < deferredModule.length; j++) {
          var depId = deferredModule[j];
          if (installedChunks[depId] !== 0) fulfilled = false;
        }
        if (fulfilled) {
          deferredModules.splice(i--, 1);
          result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
        }
      }
      if (deferredModules.length === 0) {
        __webpack_require__.x();
        __webpack_require__.x = x => { };
      }
      return result;
    }
    var startup = __webpack_require__.x;
    __webpack_require__.x = () => {

      __webpack_require__.x = startup || (x => { });
      return (checkDeferredModules = checkDeferredModulesImpl)();
    };
  })();
  return __webpack_require__.x();
})();
