
/**
 * 
 * @param {*} context 需要绑定的对象
 * @param {*} args 参数数组 
 */
Function.prototype.myCall=function(context, ...args){
  context = typeof(context) == 'object' ? context : window;
  args = Array.isArray(args) ? args : [];

  const key = Symbol();
  context[key] = this;
  //隐式调用函数
  const ans = context[key](...args);
  delete context[key];
  return ans;
}


function a(){
 console.log(this); 
}
a.myCall(global,false)
// console.log(a.name)
// A.myCall(global);
// console.log(global.name)