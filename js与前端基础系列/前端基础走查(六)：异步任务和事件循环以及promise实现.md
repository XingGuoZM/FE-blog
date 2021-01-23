js引擎是基于单线程事件循环的概念构建的。同一时刻只允许一个代码块在执行，需要跟踪即将运行的代码，那些代码被放在一个任务队列中，每当一段代码准备执行时，都会被添加到任务队列。每当javascript引擎中的一段代码结束执行，事件循环会执行队列中的下一个任务，它是JavaScript引擎中的一段程序，负责监控代码执行并管理任务队列。

### 同步任务异步任务和微任务宏任务
由于js是单线程的，因此js代码是按照顺序编译执行的。但是js中存在异步任务，即延迟执行或在未来某个时间段执行，当出现多个异步任务的时候就会有优先级的问题，谁先执行，谁后执行，这时候就出现了任务队列。排队执行的任务称为同步任务，并行执行的任务称为异步任务。每当任务进入执行栈时会被判断是同步任务还是异步任务，同步任务直接压栈执行，异步任务进入任务队列排队，根据宏任务和微任务分类分别进入宏任务队列和微任务队列，按照先宏任务后微任务的次序执行

所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。

### 执行栈与任务队列
执行栈是任务代码执行的地方

异步任务进入任务队列排队，等到执行栈为空时才开始执行异步任务

### 事件循环(Event Loop)？
浏览器两个任务线程，一个叫task，另一个叫microTasck。处理异步任务的时候需要这两个线程进行配合，同步任务进task，宏任务放到task最后，微任务推进microTask当前同步任务完成之后，会执行微任务队列，执行完成之后会清空，然后执行task里的宏任务。如此反复，直到所有任务都完成
宏任务是一个一个执行的。
微任务是一队一队执行的。
可以认为宏任务

### node事件循环和浏览器事件循环的差异

浏览器中包含
- js引擎线程
- GUI渲染线程
- 定时器触发线程
- 异步http请求线程
浏览器中的事件循环包含微任务队列和宏任务队列，按照先宏任务后微任务的执行顺序进行。

node中的事件循环包含6个阶段  
- timers
- I/O callbacks
- idle, prepare
- poll
- check
- close callback

外部输入数据 -> 轮询(poll) -> 检查(check) -> 关闭事件回调(close callback) -> 定时器检查(timers) -> I/O事件回调(I/O callbacks) -> 闲置(idle,prepare) -> 轮询(poll)

如此反复



### 微任务和宏任务
- 宏任务：同步js代码（即script标签里的代码）、IO操作、UI渲染、setTimeout/setInterval/setImmediate(即宿主环境本身具有的能力)等
- 微任务：promise、async/await、process.nextTick(即js具有的能力)等

### 迭代器（Iterator）和生成器（Generator）
迭代器可以认为是一种类似链表的数据结构，包含next()方法和value值。
生成器可以认为是一种生成迭代器对象的函数，返回一个迭代器。

使用示例如下
```js
function *createIterator(){
  yield 1;
  yield 2;
  yield 3;
}

let iterator = createIterator();

console.log(
  iterator.next().value,
  iterator.next().value,
  iterator.next().value,
)
```

### Promise、async/await
promise核心
- 状态不可逆、只会变化一次、不可取消
- 值无阻塞传递和链式调用
- then里面才是异步操作，promise实例过程都是同步操作


使用示例
```js

/**
 * promise三要素
 * 1. 值无阻塞穿透，
 * 2. then链式调用
 * 3. 状态不可变
 */
new Promise((resolve,reject)=>{
  resolve();
}).then((res)=>{

},(err)=>{

}).then((res)=>{

},(err)=>{

}).catch(err=>{

})
```

实现一个简易的promise
```
```
await是基于promise的封装，async是基于Generate的封装

使用示例
async-await.js
```js
const getData = ()=>new Promise(resolve=>setTimeout(()=>resolve('data'),1000));

const test = async function(){
  const data1 = await getData();
  console.log('data1:',data1);

  const data2 = await getData();
  console.log('data2:',data2);
}

test();
```

index.json
```js
{
  "name":"zhangsna"
}
```

实现一个简易的async函数(首先我们把async看成是一个高阶函数，接受一个generate函数当作参数,即实现一个co模块)
```

```

### 问题汇总(FAQ)
- promise和setTimeout执行顺序问题  
- 实现一个async函数与co模块原理  
- 异步操作（promise、async-await、generate、setTimeout、setInterval）的异常处理  
- 回调函数属于异步任务吗？ 
- 同步任务是宏任务吗？
- script标签里的同步代码为啥是宏任务？  
- 异步操作如何取消  
- Node与浏览器的 Event Loop 差异  
- 迭代器中如何抛出错误  
- 如何判断一个对象是不是promise  
- 实现ajax并发请求控制

### 参考
- [浏览器与Node的事件循环(Event Loop)有何区别?](https://juejin.cn/post/6844903761949753352)
- [从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)
- [ECMAScript 6 入门 Promise 对象](https://es6.ruanyifeng.com/#docs/promise)
- [ECMAScript 6 入门 Generator 函数的语法](https://es6.ruanyifeng.com/#docs/generator)
- [ECMAScript 6 入门 Generator 函数的异步应用](https://es6.ruanyifeng.com/#docs/generator-async)
- [ECMAScript 6 入门 async 函数](https://es6.ruanyifeng.com/#docs/async)
- [异步JavaScript](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5)
- [通用异步编程概念](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/%E6%A6%82%E5%BF%B5)
- [深入理解es6 NICHOLAS C.ZAKAS 著]()
- [手写async await的最简实现（20行）](https://segmentfault.com/a/1190000022705474)
- [阿里&字节：手写 async/await 的实现](https://github.com/sisterAn/JavaScript-Algorithms/issues/56)
- [co源码](https://github.com/tj/co/blob/master/index.js)
- [MDN文档 异步JavaScript简介](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/%E7%AE%80%E4%BB%8B)

