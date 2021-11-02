## 写在前面
前面几节大概了解了webpack的使用和执行过程，上一节我们知道了webpack的解析器是acorn，那今天我们就来研究一下js源码编译以及acorn这个库。我们先来看一个笔试题

**问题**
将一个 html 字符串变成树的形式

```html
<div id="main" data-x="hello">Hello<span id="sub" /></div>
```

这样的一串字符串变成如下的一棵树，考虑尽可能多的形式，比如自闭合标签等。

```js
    {
      tag: "div",
      selfClose: false,
      attributes: {
        "id": "main",
        "data-x": "hello"
      },
      text: "Hello",
      children: [
        {
          tag: "span",
          selfClose: true,
          attributes: {
            "id": "sub"
          }
        }
      ]
    }
```
先来分析一下题目，题意即将html树转化成对象树的表示形式，主要难点就是需要正确匹配到标签并进行转化成对象的属性。下面我们来开始写代码

## ast
抽象语法树，js代码词法树型结构的表示。js代码在编译的过程中会首先转化成抽象语法树的形式
我们可以在[astexplorer](https://astexplorer.net/)网站上查看js代码的ast结构。

## babel

## acorn
acorn是一个js解析库，能帮助我们将js代码解析成ast
[acorn-demo](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/acorn-demo)

## acorn和recast

## 参考
- [vue html-parser](https://github.com/vuejs/vue/blob/dev/src/compiler/parser/html-parser.js)
- [acorn](https://github.com/acornjs/acorn/tree/master/acorn)
- [recast](https://github.com/benjamn/recast)
- [babel](https://www.babeljs.cn/docs/)