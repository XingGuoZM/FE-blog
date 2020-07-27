
### 函数合成  
```
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
// 方法一：
function compose1(){
  const funcs=[...arguments][0]
  return funcs.reduce((a, b) => (...args) => a(b(...args)))()
}
//方法二：
function compose2(){
  const funcs=[...arguments][0]
  let prev
  for(let i=funcs.length-1;i>=0;i--){
    prev=funcs[i](prev)
  }
  return prev || function(){}
}
const funcs=[func1,func2,func3,func4,func5]
compose1(funcs)
compose2(funcs)
```
### 函数柯里化  


### 参考  
- [JS函数柯里化（curry）和函数合成（compose）](http://c.biancheng.net/view/5744.html)  
- [JS函数式编程中compose的实现](https://www.jianshu.com/p/eda918cf738a)  
- [ES6 Curry and Function Composition](https://github.com/learn-javascript-courses/es6-curry)  
- [JS中的柯里化(currying)](https://www.zhangxinxu.com/wordpress/2013/02/js-currying/)  
- [[译] JavaScript中的函数柯里化](https://juejin.im/post/5c1a2f786fb9a04a073051f4)  