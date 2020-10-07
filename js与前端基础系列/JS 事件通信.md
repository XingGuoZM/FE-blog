### 浏览器自定义事件  
```
  window.addEventListener('hello',(e)=>{
      console.log(e.detail)
  });
  window.dispatchEvent(new CustomEvent('hello', {detail:{name:'张三'}}))
```  

### Node自定义事件  
```
  const EventEmitter = require('events');
  const myEmitter = new EventEmitter();

  myEmitter.on('hello', (res) => {
    console.log(res);
  });
  
  myEmitter.emit('hello', {name:'张三'});
```