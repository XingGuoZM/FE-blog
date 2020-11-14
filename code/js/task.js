// async function async1() {        
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }
// async function async2() {
//   console.log('async2'); 
// }

// console.log('script start'); 
// setTimeout(function() {
//     console.log('setTimeout');
// }, 0);  
// async1();
// new Promise(function(resolve) {
//     console.log('promise1');
//     resolve();
//   }).then(function() {
//     console.log('promise2');
// });
// console.log('script end');


// 宏任务队列1：script start、async1 start、async2 、promise1、script end
// 微任务队列1：async1 end、promise2

// 宏任务队列2：setTimeout
// 微任务队列2:


new Promise(res=>{
  setTimeout(()=>console.log(0),0);
  res();
}).then(res=>{
  setTimeout(()=>console.log(1),0);
});
setTimeout(()=>console.log(2),0);


