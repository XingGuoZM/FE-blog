

/**
 * 第一题：实现洋葱圈模型 compose
 */
const app = { middlewares: [] };
app.use = (fn) => {
   app.middlewares.push(fn);
};

app.compose = function() {
  // Your code goes here

  
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
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2'); 
}

console.log('script start'); 
setTimeout(function() {
    console.log('setTimeout');
}, 0);  
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
  }).then(function() {
    console.log('promise2');
});
console.log('script end');
