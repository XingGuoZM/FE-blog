## Promise解析  

```
3个状态：pending、fullfilled、rejected。

new Promise((resolve,reject)=>{
  resolve()
}).then(res=>{

}).catch(err=>{

})
```

## promise解决了什么问题  
把异步操作的回调函数嵌套问题变成了异步操作的链式调用

## 手动实现一个promise  
```

```

#### 参考  
* [MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
- [promise源码](https://github.com/then/promise/blob/master/src/core.js)  