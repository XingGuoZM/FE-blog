### 先来看个题目  
话说有个函数如下
```js
function a(){
  let aa = 0;
  function b(){
      aa ++;
      console.log(aa);
  }
  return b;
}
```
我们调用方式如下
```js
//方式一：直接连续调用
a()(); //1
a()(); //1

//方式二：赋值之后再调用
const fn=a();
fn(); // 1
fn(); // 2
```
解释一下，第一种调用方式没有形成闭包，所以aa在a调用完成时就已经被销毁了。
第二种调用方式作用域转移到了fn上，所以aa并没有随着a的调用完成而销毁，所以第二次输出会在前一次。

由以上例子可以证明闭包的存在条件，
1. 作用域嵌套，返回一个作用域，例如一个函数中返回另一个函数
2. 作用域转移，然后再调用，例如外部函数赋值新变量，执行新变量

#### 我们对上面题目继续进行变化一下  
1. 变形一：将log放在a函数下
```js
function a(){
  let aa = 0;
  console.log(aa);
  function b(){
      aa ++;
  }
  return b;
}

//调用
const fn=a();
fn();
fn();
fn();
```
我们查看控制台打印出什么？，只打印出一个0，调用三次fn只打印出一个0？是的，没错。因为fn每次调用的是b这个函数，a只执行了一次。

2. 变形二：函数内部使用全局变量
```js
let i=0;
function a(){
  i++;
  console.log(i);
}

//调用
const fn = a;
fn(); //1
fn(); //2
```
如果写成如上形式，那么它是一个闭包吗？答案肯定不是的，

3. 变形三：调用b之后再返回
```js
function a(){
  let aa = 0;

  function b(){
      aa ++;
      console.log(aa);
  }
  return b();
}

// 调用 
const fn = a;
fn(); //1
fn(); //1
```
如果写成这样，也不会形成闭包，b在return 之前已经执行完成了


### 闭包是什么  
函数(局部)作用域转移，该作用域下的变量也跟着转移，导致相关变量不被销毁常驻内存。  
函数里return另一个函数，调用之时进行赋值转移。类似如下结构

```js
function func1(){
  return function func2(){
    //you code
  }
}
const func3=func1();
```
## 闭包存在危害
内存泄漏

## 如何解决
赋值为null

### 工作中使用闭包的情况  
1. 防抖和节流  
2. 较大作用域中修改较小作用域中变量的值，私有属性  

### 参考  
- [MDN文档 闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)  
- [初识js中的闭包](https://www.cnblogs.com/pssp/p/5189345.html)  
- [学习Javascript闭包（Closure）](https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)  
- [JS 节流函数（throttle）与防抖函数（debounce）](https://www.cnblogs.com/xingguozhiming/p/13401466.html)