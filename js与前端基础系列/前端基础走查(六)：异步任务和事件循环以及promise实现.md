### 同步任务异步任务和微任务宏任务
js单线程，顺序执行任务。排队执行的任务称为同步任务，并行执行的任务称为异步任务。每当任务

### 执行栈与任务队列
同步任务直接进入执行栈执行

异步任务进入任务队列排队，等到执行栈为空时才开始执行异步任务

### 事件循环(Event Loop)？
浏览器两个任务线程，一个叫task，另一个叫microTasck。处理异步任务的时候需要这两个线程进行配合，同步任务进task，宏任务放到task最后，微任务推进microTask当前同步任务完成之后，会执行微任务队列，执行完成之后会清空，然后执行task里的宏任务。


node事件循环和浏览器事件循环的差异


浏览器中包含
- js引擎线程
- GUI渲染线程
- 定时器触发线程
- 异步http请求线程

node中包含



### 微任务和宏任务
- 宏任务：同步js代码（即script标签里的代码）、IO操作、UI渲染、setTimeout/setInterval/setImmediate(即宿主环境本身具有的能力)等
- 微任务：promise、async/await、process.nextTick(即js具有的能力)等

### Promise、Generate、async/await
promise核心
- 状态不可逆、只会变化一次、不可取消
- 值无阻塞传递和链式调用
- then里面才是异步操作，promise实例过程都是同步操作

await是基于promise的封装，async是基于Generate的封装
### 实现一个promise和async
promise
```

```

async
```

```


### 问题汇总(FAQ)
- promise和setTimeout执行顺序问题
- 实现一个async函数
- 异步的异常处理
- 回调函数属于异步任务吗？
- 同步任务是宏任务吗？
- 异步操作的取消
- Node与浏览器的 Event Loop 差异


### 参考
- [浏览器与Node的事件循环(Event Loop)有何区别?](https://juejin.cn/post/6844903761949753352)
- [从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)
- [ECMAScript 6 入门 Promise 对象](https://es6.ruanyifeng.com/#docs/promise)
- [ECMAScript 6 入门 Generator 函数的语法](https://es6.ruanyifeng.com/#docs/generator)
- [ECMAScript 6 入门 Generator 函数的异步应用](https://es6.ruanyifeng.com/#docs/generator-async)
- [ECMAScript 6 入门 async 函数](https://es6.ruanyifeng.com/#docs/async)
- [异步JavaScript](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5)
- [通用异步编程概念](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/%E6%A6%82%E5%BF%B5)

