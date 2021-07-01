继续研究前端工程化，前面了解了js的模块。今天来研究下webpack这个打包工具，

## webpack
webpack是一个基于node环境的js模块打包工具，两个必不可少的条件，一是node环境，二是只会消费js模块,也就是说webpack是打包不了除js以外的文件的，例如css、html等等。webpack支持主流的js模块打包。包括commonjs module和es module.

先来看一个最简单的webpack打包的例子，[源码地址](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-cli)

```js
// ./src/index.js
import sum from './log';
console.log(sum);

// ./src/log.js
function log(msg) {
  console.log(msg);
}
export default log;
```

使用命令
```js
webpack ./src/index.js --mode=development
```

打包之后，我们可以看到输出文件，打开看下代码长成这样

```js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ \"./src/log.js\");\n\n\n(0,_log__WEBPACK_IMPORTED_MODULE_0__.default)('hello webpack');\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/log.js":
/*!********************!*
  !*** ./src/log.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction log(msg) {\n  console.log(msg);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (log);\n\n//# sourceURL=webpack:///./src/log.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
```
注释可以帮助我们更好的读懂代码，现在我们希望把结构理清楚，所以先把注释清一下，得到如下的代码。

```js
(() => {
  "use strict";
  var __webpack_modules__ = ({
    "./src/index.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ \"./src/log.js\");\n\n\n(0,_log__WEBPACK_IMPORTED_MODULE_0__.default)('hello webpack');\n\n//# sourceURL=webpack:///./src/index.js?");
      }),
    "./src/log.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction log(msg) {\n  console.log(msg);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (log);\n\n//# sourceURL=webpack:///./src/log.js?");
      })
  });
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    }; __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
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
  __webpack_require__("./src/index.js");
})();
```
下面来解释一下这几行代码的含义，所有的代码都被一个立即执行函数包裹，先定义了一个名称为__webpack_modules__的对象，每一个key都是模块对应的相对路径，value是一个箭头函数，模块里的所有代码都被一个eval包围。然后下面定义了一个名为__webpack_module_cache__的缓存对象，再下面是一个名为__webpack_require__的函数，每次执行这个函数时都会检查一下__webpack_module_cache__是否存在moduleId的key,存在的话直接返回结果，如果不存在则在__webpack_modules__对象中找到对应的模块返回。再下面又是三个立即执行函数，立即执行函数里面给__webpack_require__加上d、o、r方法，o方法是obj环境下执行prop方法，这么写的好处是，确定prop不是obj原型链上的方法，第二个就是确保this永远指向obj。r方法是在exports对象上定义一个新的属性，[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象，[Symbol.toStringTag](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)用来表示该对象的自定义类型标签，由此可以看出r方法是在exports对象上添加一个属性为Symbol.toStringTag，值为Module（如果支持symbol的情况下）和属性为__esModule，值为true。d方法是获取defination里所有方法并且执行，而且在exports添加key。最后执行__webpack_require__的入口模块。

如果我们执行
```js
webpack ./src/index.js --mode=production 
```
那么直接输出
```js
(() => {
  "use strict";
  console.log("hello webpack")
})();
```
直接看生产环境下打包后的文件代码将毫无意义，现在我们来分析一下开发环境下webpack打包后的代码。
我们的逻辑代码包含两个模块，一个log.js,另一个index.js。逻辑也是非常的简单，在index.js中把log导入进来，然后使用log打印一行“hello webpack”。

