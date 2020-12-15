### 模块化发展历程  

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

### es6模块和commonjs模块
浏览器支持使用es6模块，node支持使用commjs模块
es6 import加载和node commonjs加载
```js
import a from 'a-module'; // 编译时加载
const a = require('a-module'); // 运行时加载
```
es6模块：export + import
commonjs模块：module.exports + require

node.js(v13.2以上版本)里要使用import和export怎么办？
文件扩展名改成.mjs

package.json文件指定模块入口文件，main和exports
优先级： exports > main

es6模块中不存在以下变量
1. this
2. arguments
3. require
4. module
5. exports
6. __filename
7. __dirname


### 前端模块化的重要意义？
前端模块化有什么好处呢
1. 合作：多人协作互不干扰，避免全局污染
2. 灵活架构，焦点分离
3. 解耦：方便模块间组合、分解 、解耦
4. 方便单个模块功能调试、升级
5. 测试：可测试性，单元测试

模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

### webpack工作原理
将js模块（entry）打包成一个js文件（output），在这个过程中可以添加一些文件转化操作（loader）和文件处理操作（plugin）。这些配置都统一配置到webpack.config.js中，webpack能读取这个配置文件，按照这个规则进行打包。webpack真正的核心是能让用户自己写loader和plugin自定义打包规则，能很大程度的按照用户的意愿打包出满意的js和css文件，例如我们可以使用代码压缩插件来减少包体积，可以使用样式转换loader来将css文件引入到我们的js文件中，css-loader、style-loader等等。本质上，webpack是一种事件流的机制，它的工作流程就是各个插件串联起来，而实现这一切的核心就是Tapable。

### 手写一个webpack的loader和plugin
loader
```
```
plugin
```
```

### 模拟实现一个webpack
webpack可以做什么？重要的两个点如下
- 转换 ES6 语法成 ES5，语法转换，只做js文件的转换。
- 处理模块加载依赖，依赖加载。

### 问题汇总(FAQ)
1. 实现require()函数
2. 写一个webpack plugin
3. webpack plugin和loader有啥区别？
4. 做过哪些webpack优化？
5. 什么是tree shaking？它的作用？如何使用？

### 参考  
- [第 26 题: 介绍模块化发展历程](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/28#issuecomment-470043656)
- [MDN文档 JavaScript modules 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
- [MDN文档 IIFE（立即调用函数表达式）](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)
- [浅谈JavaScript 模块化](https://www.jianshu.com/p/2b8a0b6ccae8)
- [webpack工程化打包原理解析与实现 ](https://github.com/airuikun/blog/issues/4)
- [astexplorer](https://astexplorer.net/)
- [不容错过的 Babel7 知识](https://juejin.cn/post/6844904008679686152)
- [深入解析ES Module（一）：禁用export default object](https://zhuanlan.zhihu.com/p/40733281)
- [ECMAScript 6 入门 Module 的语法](https://es6.ruanyifeng.com/#docs/module)
- [ECMAScript 6 入门 Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)
- [webpack中文网 编写一个 loader](https://www.webpackjs.com/contribute/writing-a-loader/)
- [webpack中文网 编写一个插件](https://www.webpackjs.com/contribute/writing-a-plugin/)
- [手写一个webpack插件](https://segmentfault.com/a/1190000019010101)
- [webpack实战-手写一个loader](https://zhuanlan.zhihu.com/p/102729238)