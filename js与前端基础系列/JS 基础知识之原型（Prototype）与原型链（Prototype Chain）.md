### 原型、原型链、构造函数  
- 针对构造函数的  
- 向上查找  

![](https://raw.githubusercontent.com/chenfengyanyu/my-web-accumulation/master/images/typeof/proto.jpeg)
### proto、prototype、constructor
- proto：事实上就是原型链指针！！

- prototype：上面说到这个是指向原型对象的

- constructor：每一个原型对象都包含一个指向构造函数的指针，就是constructor

### 代码展示
```js
class Base {
  static instance(){
    // TODO:返回绑定类的实例对象
    return new this();
  }
  name1(){
    // TODO:返回调用对象的类名
    return this.constructor.name;
  }

  static name2(){
    //返回绑定类的类名
    return this.name;
  }
}

class A extends Base{}
class B extends Base{}

  //========== 测试 =========
  
  // console.log(A.instance().name1()) // 'A'
  // console.log(B.instance().name1()) // 'B'
  // console.log(A.name2()) //'A'
  // console.log(B.name2()) //'B'
```

### 参考  
- [什么是作用域链，什么是原型链，它们的区别，在js中它们具体指什么？](https://www.cnblogs.com/pssp/p/5204324.html)  
- [原型与原型链的理解](https://www.jianshu.com/p/f30fa27999e3)
- [JavaScript深入之从原型到原型链 ](https://github.com/mqyqingfeng/Blog/issues/2)
- [三分钟看完JavaScript原型与原型链](https://juejin.im/post/6844903567375990791)