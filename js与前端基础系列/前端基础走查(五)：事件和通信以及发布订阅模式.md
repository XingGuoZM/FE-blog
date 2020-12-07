### 什么是事件  


### 浏览器环境和node环境下的事件  
- 浏览器中使用dispatchEvent 来发布事件，使用addEventListener来绑定并监听事件。
- Node中使用emit发布事件，使用on来监听事件。


### 浏览器  
- 事件流 
  - 事件捕获  
  - 事件冒泡  
  - 阻止冒泡（event.stopPropagation()）  
  - 阻止默认  
- DOM事件  
  - 鼠标  
  - 键盘  
- 自定义事件   
```
  window.addEventListener('hello',(e)=>{
      console.log(e.detail)
  });
  window.dispatchEvent(new CustomEvent('hello', {detail:{name:'张三'}}))
```  

### Node  
```
  const EventEmitter = require('events');
  const myEmitter = new EventEmitter();

  myEmitter.on('hello', (res) => {
    console.log(res);
  });
  
  myEmitter.emit('hello', {name:'张三'});
```