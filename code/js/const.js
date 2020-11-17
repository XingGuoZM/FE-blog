function _const  (data, value) {
  global.data=value;
  Object.defineProperty(global,data,{
    enumerable:false,
    configurable:false,
    get:function(){
      return value;
    },
    set:function(data){
      if(data!==value){
        throw new Error('Assignment to constant variable!');
      }else {
        return value;
      }
    }
  });
}

_const('a',10);
console.log(a); // 10
delete a;
console.log(a); //10
for(let item in global){
  if(item === 'a'){
    console.log(global[item]);
  }
}
a=20 // 报错