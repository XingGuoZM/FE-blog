const { resolve } = require("path")

/**
 * promise三要素
 * 1. 值无阻塞穿透，
 * 2. then链式调用
 * 3. 状态不可变
 */
new Promise((resolve,reject)=>{
  resolve();
}).then((res)=>{

},(err)=>{

}).then((res)=>{

},(err)=>{

}).catch(err=>{

})