原文地址：[What is Babel, and how will it help you write JavaScript?](http://nicholasjohnson.com/blog/what-is-babel/)

Babel是一个JavaScript编译器，可将边缘JavaScript转换为可以在任何浏览器（甚至旧浏览器）中运行的普通旧ES5 JavaScript。

它使新ES6规范添加到JavaScript的所有语法糖都可用，包括类，粗箭头和多行字符串。

## 安装
Babel的出现是为打包成node模块。 如您所料，是通过npm来安装它：
```
npm install –save-dev 'babel-cli'
```

有很多webpack，gulp，grunt，Sublime，Webstorm等的插件。无论您使用什么开发工具链，Babel都可以插入其中。

[See here for setup instructions for your toolset of choice.](https://babeljs.io/docs/setup/)

## 类
JavaScript是自带类的特性。 对象可以直接从其他对象继承，因此任何对象都可以是任何其他对象的父级（超类）。

任何函数都可以是构造函数，并且使用new关键字调用它会产生一个新对象。

您可以在此处阅读有关此内容的更多信息[JavaScript for Smart People course - Object Orientation section](http://nicholasjohnson.com/javascript/javascript-for-programmers/exercises/object-orientation/)

这一切都非常酷并且具有JavaScript风格，但是可以理解的是，这使得C＃和Java的开发人员有些恼火。 因为他们习惯了一些严格严谨的语言，因此ES6引入了class关键字。 这使我们可以定义只能用作构造函数的函数。

众所周知，类是一个特殊的cookie切割器对象，只能用于定义其他对象。 这是原型继承的特例。 我们将自己限制为仅从我们明确决定应如此使用的函数中创建对象。

## 在Babel中的类

ES6类如下所示：
```
class Person {}
var dave = new Person
```
如果我们通过Babel运行它，我们只会得到一个构造函数，并加上一些修饰：
```
"use strict";
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Person = function Person() {
  _classCallCheck(this, Person);
};
var dave = new Person();
```
我们有Person函数，可以将其用作标准的原型构造函数。 通过_classCallCheck函数，我们还可以进行一些安全检查。

_classCallCheck函数在Person构造函数内部被调用，除非将Person函数视为构造函数，否则它将引发错误。

## 多行字符串
ES6还具有定义字符串的新方法。 反引号（`（Macintosh键盘上的左下角））使您可以创建多行字符串。 在JavaScript中定义模板时，这特别有用。 这是一个简单的Angular模板：
```
var template = `
<div>
  <h1>hello {{name}}</h1>
</div>
`
```
This compiles to:
```
var template = "
  <div>
    <h1>hello {{name}}</h1>
  </div>
  ";
```

## 粗箭头
粗箭头为我们定义匿名函数提供了一种不错的语法。

我们可以这样写：
```
(x, y) => {return x + y};
```
Babel给了我们这个:
```
(function (x, y) {
  return x + y;
});
```
请注意，尚未调用此函数。 我可以将其保存为变量，或将其作为参数传递给回调或Promise。

如果要调用该函数，可以执行以下操作：
```
(x, y) => {return x + y} (1,2);
```
这产生了这个：
```
(function (x, y) {
  return x + y;
})(1, 2);
```

### 仅带有一个参数的粗箭头
我们可以走得更远。 如果我们的函数仅包含一行代码（假设一行以分号结尾），则可以完全省略花括号：
```
x => x + 1
```
编译成：
```
(function (x) {
  return x + 1;
});
```

### 实践中的粗箭头
让我们使用其中之一来输出数组中的所有元素。
```
[1, 2, 99].map(num => console.log(num));
```
给到我们的是
```
[1, 2, 99].map(function (num) {
  return console.log(num);
});
```

### 粗箭头和this（词法作用域）
不要跳过这一点，这很重要。

在JavaScript中，此关键字在调用函数时设置为紧靠点之前的对象。 这是合乎逻辑的，但通常很烦人，因为有时需要将其存储在其中。

如果这对您来说听起来很疯狂，那就有点。 [此处的更多信息](http://nicholasjohnson.com/javascript/javascript-for-programmers/exercises/meaning-of-this/)：

粗箭头通过保留this的当前值来绕过它。 我们称其为词法作用域。
```
x = {
  y: function() {
    () => {console.log(this)}();
  }
}
```
编译成这样
```
x = {
  y: function y() {
    var _this = this;
    (function () {
      console.log(_this);
    })();
  }
};
```

我们可以看到，此值已存储在闭包内部的变量中。

## 总结一下
ES6主要是ES5之上的语法糖。 底层的JavaScript仍然是我们习惯的原型列表处理语言。 ES6为我们提供了一些不错的语法，最终可以转换为相当普通的普通JavaScript。

这种糖有些是为了使Java / C＃的人受益，他们最初常常发现原型继承令人困惑。

其中一些功能（例如粗箭头）为我们提供了更简洁，更现代的语法，并增强了JavaScript的功能。

## 扩展阅读
获取更多Babel和ES6的特性，查看这里：[https://babeljs.io/docs/learn-es2015/](https://babeljs.io/docs/learn-es2015/)

立即尝试，请看看（repl）[https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=var%20a%20%3D%20%7B%0A%20%20b%3A%20function()%20%7B%0A%20%20%20%20var%20c%20%3D%20()%20%3D%3E%20console.log(this.d)%0A%20%20%20%20c()%3B%0A%20%20%7D%2C%0A%20%20d%3A'Hey%20there!'%0A%7D%3B%0A%0Aa.b()]