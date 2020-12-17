

### 异步任务是什么？


### 事件循环(Event Loop)？
浏览器两个任务线程，一个叫task，另一个叫microTasck。处理异步任务的时候需要这两个线程进行配合，同步任务进task，宏任务放到task最后，微任务推进microTask当前同步任务完成之后，会执行微任务队列，执行完成之后会清空，然后执行task里的宏任务。
node事件循环和浏览器事件循环的区别

### 微任务和宏任务
- 宏任务：同步代码，setTimeout/setInterval等
- 微任务：promise，process.nextTick

### promise、Generate、async/await


### 实现一个promise


### 问题汇总(FAQ)
1. promise和setTimeout执行顺序问题？
2. 实现一个async函数
3. 异步的异常处理

### 参考
- [浏览器与Node的事件循环(Event Loop)有何区别?](https://juejin.cn/post/6844903761949753352)
- [从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)

