// const { resolve } = require("path")

/**
 * promise三要素
 * 1. 值无阻塞穿透，
 * 2. then链式调用
 * 3. 状态不可变
 */
// new Promise((resolve,reject)=>{
//   resolve();
// }).then((res)=>{

// },(err)=>{

// }).then((res)=>{

// },(err)=>{

// }).catch(err=>{

// })

const myPromise = val => Promise.resolve(val);

const delay = (duration) => {
  return (val) => new Promise(resolve => setTimeout(() => resolve(val), duration));
}

myPromise('hello').then(delay(1000)).then(val => console.log(val));