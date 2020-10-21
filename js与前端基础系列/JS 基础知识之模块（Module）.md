### 模块化  
模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

IIFE： 使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。
```js
(function(){
  return {
	data:[]
  }
})()
```

AMD(Asynchronous Module Definition)： 使用requireJS 来编写模块化，特点：依赖必须提前声明好。
```js
define('./index.js',function(code){
	// code 就是index.js 返回的内容
})
```

CMD(Common Module Definition)： 使用seaJS 来编写模块化，特点：支持动态引入依赖文件。
```js
define(function(require, exports, module) {  
  var indexCode = require('./index.js');
});
```

CommonJS： nodejs 中自带的模块化。
```js
var fs = require('fs');
```
UMD：兼容AMD，CommonJS 模块化语法。

webpack(require.ensure)：webpack 2.x 版本中的代码分割。

ES Modules： ES6 引入的模块化，支持import 来引入另一个 js 。
```js
import a from 'a';
```


### 参考  
- [第 26 题: 介绍模块化发展历程](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/28#issuecomment-470043656)
- [MDN文档 JavaScript modules 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
- [MDN文档 IIFE（立即调用函数表达式）](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)