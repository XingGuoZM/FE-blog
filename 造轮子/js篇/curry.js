//函数柯里化  

function func(a){
  console.log(a)
}

function curry(){

  return function(){

  }
}

curry(1)(2)(3)
curry(1,2)(3)
curry(1)(2,3)
curry(1,2,3)