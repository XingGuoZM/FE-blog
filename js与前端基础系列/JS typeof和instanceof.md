
### 变量类型判断方法汇总
1. Object.prototype.toString.call(),例如
```
Object.prototype.toString.call('hello'); // "[object String]"
Object.prototype.toString.call({name:'jack'}); // "[object Object]"
```
2. typeof判断基本类型
3. instanceof判断对象的具体类型

### 解释
- typeof: 返回一个字符串，表示未经计算的操作数的类型
    1. 对于基本类型，除null以外，均可以返回正确的结果，NaN返回number。
    2. 对于引用类型，除function以外，一律返回 object 类型。
    3. 对于 null ，返回object类型。
    4. 对于function返回function类型。
    5. 对于包装类(如Object,String,Number等)均返回function
```js
    typeof null // "object"
    typeof NaN //"number"
    typeof function(){console.log(123)} // "function"
    typeof Object // "function",由此类推Number、String、Boolean
```

- instanceof：用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

![](https://raw.githubusercontent.com/chenfengyanyu/my-web-accumulation/master/images/typeof/proto.jpeg)

### 实现原理
typeof原理即
instanceof原理即判断右边的变量的原型是否在左边变量的原型链上

### 模拟实现typeof 和 instanceof

typeof
```
```

instanceof
```

```


### 示例
```js
let num=123;
let User = function(){};
let Cat = function(){};
let u=new User();
let c=new Cat();

console.log(typeof num==='number'); // true
console.log(u instanceof User);  // true
console.log(u instanceof Cat);  //false
```

## 问题汇总(FAQ)
1. 为啥typeof null是'object'，但null instanceof Object却是false呢？typeof NaN是'number',但NaN instanceof Number为false？
每一个函数都会有两个自带的属性(construtor,\_\_proto\_\_)
2. 

### 参考
- [JS 基础｜搞懂 typeof 和 instanceof](http://jartto.wang/2019/01/17/js-typeof/)
- [MDN文档 instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
- [MDN文档 typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
- [Why is null instanceof Object false?](https://www.sololearn.com/Discuss/1815657/why-is-null-instanceof-object-false)
- [浅谈 instanceof 和 typeof 的实现原理](https://juejin.im/post/6844903613584654344)