
/**
 * 
 * @param {*} context 需要绑定的对象
 * @param {*} args 参数数组 
 */
Function.prototype.myCall=function(context, ...args){
  context = context || window;
  args = args || [];
  // Function.prototype this为当前运行的函数
  // 让fn的上下文为 context
  context.fn = this;
  const ans = context.fn(...args);
  delete context.fn;
  return ans;
}


function a(){
 console.log(this); 
}
a.myCall(global,false)
// console.log(a.name)
// A.myCall(global);
// console.log(global.name)