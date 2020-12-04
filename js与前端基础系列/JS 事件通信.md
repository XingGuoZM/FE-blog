### 浏览器自定义事件  
```js
  window.addEventListener('hello',(e)=>{
      console.log(e.detail)
  });
  window.dispatchEvent(new CustomEvent('hello', {detail:{name:'张三'}}))
```  

### Node自定义事件  
```js
  const EventEmitter = require('events');
  const myEmitter = new EventEmitter();

  myEmitter.on('hello', (res) => {
    console.log(res);
  });
  
  myEmitter.emit('hello', {name:'张三'});
```

### 参考
- [Nodejs中文网 events](http://nodejs.cn/api/events.html)  
- [MDN官网 CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)