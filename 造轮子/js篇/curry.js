//函数柯里化  

function func(a){
  console.log(a)
}

const curry = (
  f, arr = []
) => (...args) => (
  a => a.length === f.length ?
    f(...a) :
    curry(f, a)
)([...arr, ...args]);

curry(1)(2)(3)
curry(1,2)(3)
curry(1)(2,3)
curry(1,2,3)