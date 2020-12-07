### 模块化发展历程  
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
### 前端模块化的重要意义？
前端模块化有什么好处呢
1. 合作：多人协作互不干扰，避免全局污染
2. 灵活架构，焦点分离
3. 解耦：方便模块间组合、分解 、解耦
4. 方便单个模块功能调试、升级
5. 测试：可测试性，单元测试



### webpack工作原理



### 模拟实现一个webpack
webpack可以做什么？重要的两个点如下
- 转换 ES6 语法成 ES5，语法转换，专心做js文件的转换。
- 处理模块加载依赖，依赖加载。

### 参考  
- [第 26 题: 介绍模块化发展历程](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/28#issuecomment-470043656)
- [MDN文档 JavaScript modules 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
- [MDN文档 IIFE（立即调用函数表达式）](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)
- [浅谈JavaScript 模块化](https://www.jianshu.com/p/2b8a0b6ccae8)
- [webpack工程化打包原理解析与实现 ](https://github.com/airuikun/blog/issues/4)
- [astexplorer](https://astexplorer.net/)