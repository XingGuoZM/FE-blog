### 前言
作用域和作用域链说白了还是函数和对象之间的关系，作用域即执行环境
浏览器中自带的全局变量window
node中自带全局变量global，模块的全局变量module

下面是一道题目，输出打印的结果
```js
console.log('this',this); // node：window,浏览器：Global
console.log('window',window); // 浏览器全局对象：Window
console.log('global',global);// node全局对象：Global
console.log('module',module);// node模块对象：Module
console.log(exports) //node模块变量 空对象 {}
console.log(module.exports) // node模块变量 空对象 {}

```
```js
a=1
console.log(a); //1
console.log(window.a);//
console.log(global.a);
```

### 作用域、作用域链 
作用域即变量当前的执行环境，在同一个作用域里下，所有变量可以随意访问，this指向当前执行环境（即作用域）。作用域分全局作用域和局部作用域，es6增加块级作用域。
- node中局部作用域（即模块作用域和函数作用域），全局作用域即global
- 浏览器中的局部作用域（即函数作用域），全局作用域即window
作用域链是由于局部作用域的嵌套而形成的链式结构
在《Javascript高级程序设计》一书中是这么解释作用域链的用途的。作用域链的用途即保证执行环境有权访问的所有变量和函数的有序访问。 

### 变量提升
变量提升和我们的全局变量(window或global)有关系，var定义变量时会存在变量提升,严格模式下不存在变量提升。  

JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。  
JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。  


以下两个示例是等价的
```js
a = 1
var a;
```
```js
var a;
a = 1;
```

### this绑定
我们知道函数调用有两种方式，第一种是直接调用，第二种是当作构造函数通过new来实例化。
函数也是变量。函数可以挂在全局对象上，也可以当作对象的属性  
例如我们在浏览器的环境中定义一个函数
```js
function a(){
  console.log('a');
}

// 以下两种方式是等价的
a();
window.a();
```

this的绑定有以下几种可能  
1. 默认绑定，默认指向全局作用域
2. 隐式绑定，普通函数this指向函数调用的执行环境，箭头函数指向函数声明所处的执行环境
3. 显式绑定，bind、call、apply。
4. new绑定，this指向new出来的对象

### 模拟实现bind、call
- myCall：改变this指向，并且执行函数
```js
/**
 * 
 * @param {*} context 需要绑定的对象
 * @param {*} args 参数数组 
 */
Function.prototype.myCall=function(context, ...args){
  context = !!context ? context : window;
  args = !!args ? args : [];

  const key = Symbol();
  context[key] = this;

  const ans = context[key](...args);
  delete context[key];
  return ans;
}
```
- myBind:改变this指向，不执行函数
```js
Function.prototype.myBind = function(context,...args){
  const fn = this;
  args = Array.isArray(args) ? args : [];
  return function newFn(...newArgs){
    if(this instanceof newFn){
      return new fn(...args,...newArgs);
    }
    return fn.apply(context,[...args,...newArgs]);
  }
}
```

### 问题汇总(FAQ)
1. this的4中绑定方式？
2. this隐式丢失
2. 普通函数和箭头函数区别？
3. 闭包
4. call、apply和bind实现，如何深克隆一个函数？
5. 变量提升
6. node中exports和module.exports

### 参考  
- [什么是作用域链，什么是原型链，它们的区别，在js中它们具体指什么？](https://www.cnblogs.com/pssp/p/5204324.html)  
- [JS中的作用域和作用域链](https://www.cnblogs.com/leftJS/p/11067908.html)  
- [JavaScript 开发进阶：理解 JavaScript 作用域和作用域链](https://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html)  
- [深入理解this机制系列第一篇——this的4种绑定规则](https://www.cnblogs.com/xiaohuochai/p/5735901.html)
- [面试感悟,手写bind,apply,call](https://juejin.cn/post/6844903891092389901#heading-11)