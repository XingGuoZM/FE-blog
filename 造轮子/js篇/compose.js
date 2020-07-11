// 函数组合 

function func1(){
  console.log(1)
}
function func2(){
  console.log(2)
}
function func3(){
  console.log(3)
}

function func4(){
  console.log(4)
}
function func5(){
  console.log(5)
}
const func6=()=>{ console.log(6)}
//法一：
function compose1(){
  const funcs=[...arguments][0]
  return funcs.reduce((prev, curr) => (...args) => curr(prev(...args)))
}
// 法二：
function compose2(){
  const funcs=[...arguments][0]
  let prev
  for(let i=funcs.length-1;i>=0;i--){
    prev=funcs[i](prev)
  }
  return prev || function(){}
}

const funcs=[func1,func2,func3,func4,func5]
// compose1(funcs)()
compose2(funcs)()
// func1(func2(func3(func4(()=>func5()))))
