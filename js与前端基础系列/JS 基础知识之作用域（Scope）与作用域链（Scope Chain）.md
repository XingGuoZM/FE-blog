### 前言
作用域和作用域链说白了还是函数和对象之间的关系，作用域即执行环境
浏览器中自带的全局变量window
node中自带全局变量global

下面是一道题目，输出打印的结果
```js
console.log('this',this);
console.log('window',window);
console.log('global',global);
console.log('module',module);

console.log(this)
console.log(window)
console.log(global)
console.log(module)
console.log(exports)
console.log(module.exports)

a=1

console.log(a)
console.log(window.a)
console.log(global.a)
```

### 作用域、作用域链 
作用域即变量当前的执行环境，在同一个作用域里下，所有变量可以随意访问，this指向当前执行环境（即作用域）。作用域分全局作用域和局部作用域，es6增加块级作用域。
- node中局部作用域（即模块作用域和函数作用域），全局作用域即global
- 浏览器中的局部作用域（即函数作用域），全局作用域即window
作用域链是由于局部作用域的嵌套而形成的链式结构
在《Javascript高级程序设计》一书中是这么解释作用域链的用途的。作用域链的用途即保证执行环境有权访问的所有变量和函数的有序访问。 

### this绑定
1. 默认绑定
2. 隐式绑定
3. 显式绑定
4. new绑定

### 延长作用域  
- 方式一  
```js
try{

}catch(){

}
```

- 方式二  
```js
with(console){
  log('Happy Days!')
}
```

### 转移作用域  
闭包


### 参考  
- [什么是作用域链，什么是原型链，它们的区别，在js中它们具体指什么？](https://www.cnblogs.com/pssp/p/5204324.html)  
- [JS中的作用域和作用域链](https://www.cnblogs.com/leftJS/p/11067908.html)  
- [JavaScript 开发进阶：理解 JavaScript 作用域和作用域链](https://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html)  