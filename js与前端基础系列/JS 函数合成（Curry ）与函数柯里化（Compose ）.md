
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
```
// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
/**
 *  法一：es5
 */
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = [].slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var adder = function () {
      var _adder = function() {
          // [].push.apply(_args, [].slice.call(arguments));
          _args.push(...arguments);
          return _adder;
      };

      // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
      _adder.toString = function () {
          return _args.reduce(function (a, b) {
              return a + b;
          });
      }

      return _adder;
  }
  // return adder.apply(null, _args);
  return adder(..._args);
}
```


### 参考  
- [JS函数柯里化（curry）和函数合成（compose）](http://c.biancheng.net/view/5744.html)  
- [JS函数式编程中compose的实现](https://www.jianshu.com/p/eda918cf738a)  
- [ES6 Curry and Function Composition](https://github.com/learn-javascript-courses/es6-curry)  
- [JS中的柯里化(currying)](https://www.zhangxinxu.com/wordpress/2013/02/js-currying/)  
- [[译] JavaScript中的函数柯里化](https://juejin.im/post/5c1a2f786fb9a04a073051f4)  
- [详解JS函数柯里化](https://www.jianshu.com/p/2975c25e4d71)  
- [前端基础进阶（十）：深入详解函数的柯里化](https://www.jianshu.com/p/5e1899fe7d6b)