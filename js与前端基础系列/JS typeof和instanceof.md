
## 变量类型判断方法
1. Object.prototype.toString.call(),例如
```js
Object.prototype.toString.call('hello'); // "[object String]"
Object.prototype.toString.call({name:'jack'}); // "[object Object]"
```
2. typeof判断基本类型，返回一个字符串，表示未经计算的操作数的类型.
    - 对于基本类型，除null以外，均可以返回正确的结果，NaN返回number。
    - 对于引用类型，除function以外，一律返回 object 类型。
    - 对于 null ，返回object类型。
    - 对于function返回function类型。
    - 对于包装类(如Object,String,Number等)均返回function
```js
typeof 'hello' //"string"
typeof({}) //"object"
typeof null //"object"
```
3. instanceof用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。即可以理解为判断某个对象是什么具体的引用类型。例如
```js
function a(){}
a instanceof Object // true
null instanceof Object //false
"a" instanceof String //false
```

## 模拟实现typeof 和 instanceof
typeof:利用Object.prototype.toString.call()返回值进行字符串切割来实现
```js
function myTypeof(arg){
  let typeStr = Object.prototype.toString.call(arg);
  if(arg === null) return 'object';
  return typeStr.split(' ')[1].split(']')[0].toLowerCase()+'';
}
```

instanceof:通过遍历原型链来比较实现
```js
function myInstanceof(instance,type){
  while(instance){
    instance=instance.__proto__;
    if(instance===type.prototype) return true;
  }
  return false
}
```

## 问题汇总(FAQ)
1. 为什么typeof null是'object'，但null instanceof Object却是false呢？typeof NaN是'number',但NaN instanceof Number为false？
2. typeof和instanceof有什么区别？
3. typeof返回值有几个？
4. instanceof有什么缺陷？

## 参考
- [JS 基础｜搞懂 typeof 和 instanceof](http://jartto.wang/2019/01/17/js-typeof/)
- [MDN文档 instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
- [MDN文档 typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
- [Why is null instanceof Object false?](https://www.sololearn.com/Discuss/1815657/why-is-null-instanceof-object-false)
- [浅谈 instanceof 和 typeof 的实现原理](https://juejin.im/post/6844903613584654344)