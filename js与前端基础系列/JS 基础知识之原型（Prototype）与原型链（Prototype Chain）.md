

每一个函数都会自带3个属性(construtor,\_\_proto\_\_,prototype)
每一个对象都会自带2个属性(constructor,\_\_proto\_\_)

## 什么是constructor、什么是__proto__、什么是prototype? 它们之间的关系是怎样的？ 它们的作用是什么？
- \_\_proto\_\_: 构造函数的原型

- prototype: 本身的原型

- constructor: 构造函数

自己的理解
![](https://img2020.cnblogs.com/blog/1347757/202012/1347757-20201205223317849-1907819081.png)

网络盗图
![](https://img-blog.csdnimg.cn/20200903014751814.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTk2NDU0,size_16,color_FFFFFF,t_70#pic_center)


### new的执行过程示例
![](https://img2020.cnblogs.com/blog/1347757/202012/1347757-20201205225037996-1157951344.png)


其实new的过程就是将一个函数转化为一个对象，就这么简单。
1. 新建一个空对象
```js
let obj = {};
```
2. 将函数的prototype赋给对象的__proto__
```js
obj.__proto__=func.prototype

```
3. 执行函数，特别要注意函数有this指向问题,当然有参数把参数也带上
```js
let ans = func.call(obj)
```
4. 判断func返回值类型，如果是引用类型则返回这个引用类型的对象
```js
return typeof(ans)==='object'?obj:ans
```

### 完整代码如下
```js
function myNew(func, ...args){
	let obj = {};
	obj.__proto__ = func.prototype;
	let ans = func.call(obj, ...args);
	return typeof(result) === 'object' ? ans :obj;
}
```

### 测试代码
```js

function A(a){
	this.name='123'
}
console.log(myNew(A,12)); 
```
### 测试结果
![](https://img2020.cnblogs.com/blog/1347757/202012/1347757-20201205230256523-343569621.png)


## 原型链

每个实例对象（ object ）都有一个私有属性（称之为 \_\_proto\_\_ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( \_\_proto\_\_ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节


### 问题汇总(FAQ)
1. 为啥对象里面没有prototype?
2. 手写new？

### 参考  
- [原型与原型链的理解](https://www.jianshu.com/p/f30fa27999e3)
- [JavaScript深入之从原型到原型链 ](https://github.com/mqyqingfeng/Blog/issues/2)
- [三分钟看完JavaScript原型与原型链](https://juejin.im/post/6844903567375990791)
- [MDN文档 继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [三张图搞懂JavaScript的原型对象与原型链](https://www.cnblogs.com/shuiyi/p/5305435.html)
- [Web前端面试指导(三十九)：new操作符具体干了什么呢?](https://blog.csdn.net/lxcao/article/details/52792466)