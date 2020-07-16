### setTimeout、setInterval、setImmediate  
- setTimeout:延时器  
- setInterval:定时器  
- setImmediate: 执行队列没有任务时，立即执行，相当于setTimout(fn,0),但通过setImmediate的异步调用的延时不是0ms，因为它需要监控执行栈




### 参考  
- [JS魔法堂：初探传说中的setImmediate函数](https://www.cnblogs.com/fsjohnhuang/p/4151595.html)
- [MDN window.setImmediate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate)  
- [MDN window.setInterval](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval)  
- [MDN window.setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)  