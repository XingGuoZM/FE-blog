// 函数组合 

const funcs=[
  function func1(){
    console.log(1)
  },function func2(){
    console.log(2)
  },function func3(){
    console.log(3)
  },function func4(){
    console.log(4)
  },function func5(){
    console.log(5)
  }]

//法一：
function compose1(funcs){
  return funcs.reduce((prev, curr) => (...args) => curr(prev(...args)))
}
// 法二：
function compose2(funcs){
  let prev
  for(let i=0;i<funcs.length;i++){
    prev=funcs[i](prev)
  }
  return prev || function(){}
}


// compose1(funcs)()
// compose2(funcs)()
// func1(func2(func3(func4(()=>func5()))))


// sync compose (同步组合)
function func1(next){
  console.log(1)
  next()
  console.log(2)
}
function func2(next){
  console.log(3)
  next()
  console.log(4)
}
function func3(next){
  console.log(5)
  next()
  console.log(6)
}
const arr=[func1,func2,func3]

//方法一：
const composeSync1=function(){
  function dispatch(index){
    if(index===arr.length) return ;
    return arr[index](()=>dispatch(index+1))
  }
  return dispatch(0)
}
//方法二：
const composeSync2=function(){
  let prev=()=>{ }
  for(let i=arr.length-1;i>=0;i--){
    prev=arr[i].bind(this,prev)
  }
  return prev()
}
// composeSync1()
// composeSync2()


// async compose (异步组合)
function fn1(next){
  console.log(1)
  next()
  console.log(2)
}
function fn2(next){
  getData(3)
  next()
  console.log(4)
}
function fn3(next){
  console.log(5)
  next()
  console.log(6)
}

//延时1s获取数据
function getData(index){
  setTimeout(()=>{console.log(index)},1000)
}
const fnArr=[fn1,fn2,fn3]

// const composeAsync=function(){
//   async function dispatch(index){
//     if(index===fnArr.length) return ;
//     return await fnArr[index](()=>dispatch(index+1))
//   }
//   return dispatch(0)
// }

function composeAsync(middleware) {
  // 判断代码...
  
  return function () {
    let index = -1
    return dispatch(0)

    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      // if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(()=>dispatch( i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
composeAsync(fnArr)()
// koa-compose (koa中间件)


