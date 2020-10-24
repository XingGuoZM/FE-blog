
// Node 
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('hello', (res) => {
  console.log(res);
});

myEmitter.emit('hello', {name:'张三'});


// 浏览器  
// window.dispatchEvent('hello',{name:'张三'});
// window.addEventListener('hello', (res)=>{
//   console.log(res)
// })