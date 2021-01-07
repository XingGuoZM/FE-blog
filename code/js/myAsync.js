/**
 * 手写一个async函数
 */

 function myAsync(func){
  return function(){
    const gen = func.apply(this,arguments);
    return new Promise((resolve,reject)=>{
      function step(key,arg){
        let result ;

        result = gen[key](arg);

        const {value,done} = result;

        if(done){
          return resolve(value);
        }else{
          return Promise.resolve(value).then(val=>step('next',val),err=>step('throw',err));
        }
      }
      step('next');
    });
  }
 }


//测试
const getData = ()=>new Promise(resolve=>setTimeout(()=>resolve('data'),1000));

// myAsync(getData)().then(res=>{
//   console.log(res);
// })