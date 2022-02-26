解释一下原型和原型链
Symbol是构造函数吗？
constructor的值是只读的吗？null和undefined有constructor属性吗？

__proto__是什么？
instanceof和typeof有什么区别？instanceof实现原理？

解释一下作用域和作用域链
[call、apply和bind的区别？](https://juejin.cn/post/6844903496253177863#heading-7)
call、apply、bind应用场景
call、apply、bind实现原理

如何确定/改变this指向？

## 
作用域、作用域链
原型、原型链


## 函数
构造函数、普通函数、箭头函数、方法
new、__proto__、prototype、constructor
箭头函数特性（this、arguments）
如何实现继承？如何实现重载？


function是引用传递还是值传递？**ECMAScript中所有的函数的参数都是按值传递的** [参考](https://juejin.cn/post/6844903854882947080#heading-7)

函数调用方式（普通函数、方法、构造函数、call/apply）

说一下有几种数据类型？bigInt和symbol应用场景
symbol:对象的属性名、代替常量、定义类的私有属性和方法
如何判断symbol数据类型
数据类型之间相互转换？


赋值与拷贝（克隆）的区别？
深克隆和浅克隆的区别？
如何实现深克隆？
[自己实现一个深克隆,考虑symbol和对象相互引用](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/148)
JSON.stringify方法处理深克隆会有什么问题？
递归实现深克隆会有什么问题？如何解决？
lodash是怎么实现深克隆的
如何克隆一个function？需要考虑什么问题？


说一下你对闭包的理解?闭包的应用场景有哪些？
[对闭包的看法，为什么要用闭包？说一下闭包原理以及应用场景](https://github.com/lgwebdream/FE-Interview/issues/17)

内存泄漏、浏览器垃圾回收机制
sessionstorage、localstorage、cookie区别
localstorage如何实现过期时间功能

var、let和const区别及实现原理
Set、Map、WeakSet和WeakMap有什么区别
[说下你对 Reflect 的理解？为什么会有 Reflect 的出现？Proxy 也简单的说一下？](https://github.com/lgwebdream/FE-Interview/issues/1203)
[js proxy实现简单的数据绑定](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/123)
[如何模拟实现 Array.prototype.splice](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/384)
[最简洁代码实现indexOf方法](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/321)
[实现颜色转换 'rgb(255, 255, 255)' -> '#FFFFFF' 的多种思路](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/475)

为何try里面放return，finally还会执行，理解其内部机制

构造函数new的过程？实现一个new
0.1+0.2是否等于0.3？为什么？

数组sort方法有什么问题？
[为什么for循环高于forEach性能](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/121)
字符串反转？
字符串大小写取反？

说一说事件循环？
Node与浏览器EventLoop的差异
promise...then方法里面的逻辑为什么会比setTimeout先执行？

说一说promise？实现promise.all/race?错误处理
[有限状态机](http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html)
[因为实现不了Promise.all，一场面试凉凉了](https://juejin.cn/post/7038371452084551694#heading-8)
promise构造函数同步执行还是异步执行
setTimeout能准确按时执行回调函数吗？为什么？怎么做到准时？
[用 setTimeout 实现 setInterval，阐述实现的效果与setInterval的差异](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/259)
[setTimeout、Promise、Async/Await 的区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33)
[async/await是如何通过同步的方式实现异步的](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/156)
[实现一个异步求和函数](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/484)

节流和防抖有什么区别？手写一个防抖函数

JavaScript异常处理的方式，统一的异常处理方案


```
什么是值？什么是类型？什么是变量？它们之间的区别和联系
基本类型和引用类型的区别是什么？null和undefined的区别是什么
“一切皆对象”怎么理解？number也是对象吗？字符串也是对象么？
基础类型放在栈上？引用类型存放在堆中，请问是为什么？字符串是存放在栈上吗？对象中有一个number属性，那么number属性是存放在堆上还是栈上
==的逻辑是什么？
作用域的本质，闭包和作用域的关系是什么
var、let、const三者的本质不同是什么？为什么不使用var
数组的本质是什么，运用了什么样的设计模式，数组和对象的关系
原型链能够实现所谓的继承的本质原因是什么
箭头函数是用来解决什么问题
什么是高阶函数，用处和用法
什么是异步编程，为什么说它对web开发很重要

```
