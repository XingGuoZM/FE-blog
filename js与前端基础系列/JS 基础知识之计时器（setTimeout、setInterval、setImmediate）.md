### setTimeout、setInterval、setImmediate  
- setTimeout:延时器  
- setInterval:定时器  
- setImmediate: 执行队列没有任务时，立即执行，相当于setTimout(fn,0),但通过setImmediate的异步调用的延时不是0ms，因为它需要监控执行栈


### setTimeout执行原理  
setTimeout的运行机制，执行该语句时，是立即把当前定时器代码推入事件队列，当定时器在事件列表中满足设置的时间值将传入的函数加入任务队列，之后的执行就交给任务队列负责，但是如果此时任务队列不为空，则需等待，所以执行定时器内代码的时间可能会大于设置的时间。

### 参考  
- [JS魔法堂：初探传说中的setImmediate函数](https://www.cnblogs.com/fsjohnhuang/p/4151595.html)
- [MDN window.setImmediate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate)  
- [MDN window.setInterval](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval)  
- [MDN window.setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)  
- [2020前端近期面试题整理](https://blog.csdn.net/kkm486622296/article/details/106063151)  