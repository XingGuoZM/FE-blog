

/**
 * 第一题：实现洋葱圈模型 compose
 * 参考：https://github.com/koajs/compose/blob/master/index.js
 */
const app = { middlewares: [] };
app.use = (fn) => {
   app.middlewares.push(fn);
};

app.compose = function() {
  // Your code goes here
  //同步执行
  // function dispatch(index){
  //   if(index===app.middlewares.length) return ;
  //   const fn=app.middlewares[index];
  //   return fn(()=>dispatch(index+1))
  // }
  // dispatch(0);

  // [prev(),curr(),next()]
  // prev(curr(next()))

  const funcs=app.middlewares
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
app.use(next => {
   console.log(1);
   next();
   console.log(2);
});
app.use(next => {
   console.log(3);
   next();
   console.log(4);
});
app.use(next => {
   console.log(5);
   next();
   console.log(6);
});
app.compose();


/**
 *  第二题：输出顺序
 */
async function async1() {        
  console.log('async1 start');//推进第一个微任务队列
  await async2();
  console.log('async1 end');//推进第二个微任务队列
}
async function async2() {
  console.log('async2'); //推进第一个微任务队列
}

console.log('script start'); //主进程
setTimeout(function() {
    console.log('setTimeout');//推进第一个宏任务队列，有延迟，在宏任务队列最后一个
}, 0);  
async1();
new Promise(function(resolve) {
    console.log('promise1');//推进第一个微任务队列
    resolve();
  }).then(function() {
    console.log('promise2');//推进第二个微任务队列
});
console.log('script end');//主进程


// 宏任务队列：['script start','script end','setTimeout']
// 微任务队列1：['async1 start','async2','promise1']
// 微任务队列2:['async1 end','promise2']

//执行顺序为：
/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * async1 end
 * promise2
 * setTimeout
 */
