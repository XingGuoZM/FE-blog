源码仓库:[koa-compose](https://github.com/koajs/compose/blob/master/index.js)  
### 前言  
文章开始之前来做一道题目。给一个函数数组，封装一个函数可以依次执行这个函数数组里的函数  
```
function func1() {
  console.log(1)
}
function func2() {
  console.log(2)
}
function func3() {
  console.log(3)
}
const arr=[func1,func2,func3]
写一个compose函数，当我们调用compose的时候，依次执行func1、func2、func3，打印出1，2，3，4
function compose(){
  //your code goes here...
}
```

我们很快就能想到使用循环遍历数据，依次执行
```
function compose() {
  for (let item of arr) {
    item()
  }
}
compose()
//打印输出：
//1
//2
//3
```
当然这不是我们想要的答案，我们想要函数这样执行func3(func2(func1()))。可以这样写代码
```
//法一：使用reduce，代码简洁
function compose1() {
  return arr.reduce((prev, curr) => (...args) => curr(prev(...args)))
}

// 法二：也可以使用循环遍历赋值
function compose2(){
  let prev
  for(let i=0;i<arr.length;i++){
    prev=arr[i](prev)
  }
  return prev || function(){}
}
```

我们变化一下，给函数传入参数，题目变成下面这样
```
function func1(next){
  console.log(1)
  next()
  console.log(2)
}
function func2(next){
  console.log(3)
  next()
  console.log(4)
}
function func3(next){
  console.log(5)
  next()
  console.log(6)
}
const arr=[func1,func2,func3]
写一个compose函数，当我们调用composeSync的时候，打印出1,3,5,6,4,2
function composeSync(){
  //your code goes here...
}
```
我们先来分析一下题目，每个函数都带有next参数，并且next是一个函数，又因为打印输出的顺序可知，next是数组下一个项。也就是说compose函数需要把arr数组里的每一项都串联起来并把后一项当作参数传入当前项执行，所以前半部分会输出1，3，5.又因为都是同步的代码，所以next()都执行完之后才会执行后面的代码所以输出6，4，2。分析完了之后我们可以开始写代码了，最容易让人想到的方式是递归
```
//方法一：使用递归
const composeSync1=function(){
  function dispatch(index){
    if(index===arr.length) return ;
    return arr[index](()=>dispatch(index+1))
  }
  return dispatch(0)
}
//方法二：使用循环（一般能用递归的都能使用循环）
const composeSync2=function(){
  let prev=()=>{ }
  for(let i=arr.length-1;i>=0;i--){
    prev=arr[i].bind(this,prev)
  }
  return prev()
} 
composeSync1()
composeSync2()

//打印输出：
//1
//3
//5
//6
//4
//2
```

不知不觉我们已经把洋葱模型基本实现了，只要稍加完善（容错处理、异步处理等等）即可使用。下一步我们加上错误处理和异步处理，这个可以参考源码
```
//容错：判断一下arr是否是数组，判断arr每一项是否是函数，判断数组长度是否大于0，try...catch()...下衔接项
//异步：async...await
```

### koa-compose解析  
我们先来字面上理解一下，compose是组合组成的意思，它的作用正是实现洋葱模型，管理所有中间件的。koa-compose是koa的一个中间件，它主要是实现洋葱模型。通过上面的几道题目，可以模糊认为compose就是洋葱模型的雏型，数组里面的每个函数就是一个中间件，洋葱模型的执行机制以及中间件的管理方式。那什么是洋葱模型呢？什么是中间件呢？  

### 洋葱模型与中间件  
* 洋葱模型：对数据进行串行处理的一种机制，类似于洋葱，被一层层中间件（处理数据的）包裹。
* 中间件：处理数据的函数、类、方法，分散在模型的各个部位。
盗图两张：

![compose](https://upload-images.jianshu.io/upload_images/23744478-ff03b60b5e9da2e8.png)

![middleware](https://upload-images.jianshu.io/upload_images/23744478-9746f3f18dd35183.png)

### 源码解析  
```
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
我们先忽略注释，实际代码20行不到，非常精简。首先判断一下传进来的middleware是不是数组并循环一下判断每一项是不是函数。然后在return一个函数传进来参数context（上下文对象）、next（下一步要执行的函数，也就是中间件middleware相比当前项的下一项）。定义dispatch函数用于递归将func1，func2，func3封装成func3(func2(func1))这种结构。首先要判断边界，通过index和middleware长度进行比较，还定义了一个index，用于判断当前的中间件是否已经有过。最后return当前项，把下一项当作参数传给当前项，这样就能保证所有中间件都能嵌套完成。

### 手动实现一个洋葱模型  
实现步骤与思路就是我们刚开始做的那几道题目，一步一步做过来即可实现一个简易版本的洋葱模型。最后贴一下代码  
```
const app = { middlewares: [] };
app.use = (fn) => {
   app.middlewares.push(fn);
};

app.compose = function() {
  // Your code goes here
  function dispatch(index){
    if(index===app.middlewares.length) return ;
    const fn=app.middlewares[index];
    return fn(()=>dispatch(index+1))
  }
  dispatch(0);
}
app.use(next => {
   console.log(1);
   next();
   console.log(2);
});
app.use(next => {
   console.log(3);
   next();
   console.log(4);
});
app.use(next => {
   console.log(5);
   next();
   console.log(6);
});
app.compose();
```

### 参考  
  - [Whats the point of composing middleware in Koa?](https://stackoverflow.com/questions/39186844/whats-the-point-of-composing-middleware-in-koa)  
  - [[Source Code Learning--koa] Source Code Interpretation Analysis of Koa Middleware Core (koa-compose)](https://programming.vip/docs/5ee64eb00c5a4.html)  
  - [Koa引用库之Koa-compose](https://zhuanlan.zhihu.com/p/29455788)  
  - [KOA2 compose 串联中间件实现（洋葱模型）](https://juejin.im/post/5bbdcf05e51d450e6c750693)  
  - [koa-analysis](https://github.com/LFB/koa-analysis)  
  - [call、apply和bind方法的用法以及区别](https://www.jianshu.com/p/bc541afad6ee)