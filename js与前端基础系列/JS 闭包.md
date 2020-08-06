### 闭包是什么  
函数作用域转移，该作用域下的变量也跟着转移，导致相关变量不被销毁常驻内存。  
函数里return另一个函数，调用之时进行赋值转移。类似如下结构
```
function func1(){
  return function func2(){
    //you code
  }
}
const func3=func1();
```
### 作用域  

### 参考  
* [MDN 闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)  
- [初识js中的闭包](https://www.cnblogs.com/pssp/p/5189345.html)  
- [学习Javascript闭包（Closure）](https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)