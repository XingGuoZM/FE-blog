

Function.prototype.myBind = function(context,...args){
  const fn = this;
  args = Array.isArray(args) ? args : [];
  return function newFn(...newArgs){
    if(this instanceof newFn){
      return new fn(...args,...newArgs);
    }
    return fn.apply(context,[...args,...newArgs]);
  }
}