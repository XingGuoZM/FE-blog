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
先来分析一下题目，题意即将html树转化成对象树的表示形式，主要难点就是需要正确匹配到标签并进行转化成对象的属性。下面我们来开始写代码,首先我们要找到标签的匹配正则，我们参考[html-parser.js](https://github.com/vuejs/vue/blob/dev/src/compiler/parser/html-parser.js),然后循环切割html字符串，再通过类似递归（在开始标签的时候入栈，在闭合标签出栈并构建）的方式构建树，具体实现如下：

参考代码
```js
/**
 * 输入：'<div id="main" data-x="hello">Hello<span id="sub" /></div>'
 * 输出：
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
 * 
 */
/**
 * 
  伪代码
    1. 通过正则匹配到开始标签，通过startTagOpen匹配，可以获取到开始标签tag,入栈
    2. 切割html字符串
    3. 匹配属性，通过attribute匹配，循环直至所有attribute都匹配完成，可以获取所有的attributes
    4. 切割html字符串
    5. 匹配开始标签的闭合, >或者/> ,通过startTagClose匹配,可以知道是否为自闭合selfClose
    6. 切割html字符串
    7. 匹配到子级标签的开始或者自己结束标签的第一个标示符, <, 可以获取到标签的内部文本text
    8. 切割字符串
    9. 如果是结束标签,出栈，构建对象树，可以获取到children，继续循环
    10. 如果是新的开始标签，继续循环
 */

const html2Object = (htmlStr) => {
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`
  const startTagOpen = new RegExp(`^<${qnameCapture}`)
  const startTagClose = /^\s*(\/?)>/
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
  let stack = [];
  let root;
  const matchTagStart = (element) => {
    const tagStart = htmlStr.match(startTagOpen);
    if (tagStart) {
      element.tag = tagStart[1];
      stack.push(element);
      htmlStr = htmlStr.substring(tagStart[0].length);
    }
  }
  const matchTagAttribute = (element) => {
    while (htmlStr.match(attribute)) {
      let attr = htmlStr.match(attribute);
      element.attributes[attr[1]] = attr[3];
      if (attr) htmlStr = htmlStr.substring(attr[0].length);
    }
  }
  const matchTagClose = (element) => {
    const tagClose = htmlStr.match(startTagClose);
    if (tagClose) {
      if (tagClose[0].trim() === '/>') {
        element.selfClose = true;
        const c = stack.pop();
        const p = stack.pop();
        if (p) {
          p.children.push(c);
          stack.push(p);
        }
      }
      htmlStr = htmlStr.substring(tagClose[0].length);
    }
  }
  const matchTagEnd = () => {
    const et = htmlStr.match(endTag);
    if (et) {
      const c = stack.pop();
      const p = stack.pop();
      if (p) {
        p.children.push(c);
        stack.push(p);
        root = JSON.parse(JSON.stringify(stack));
      }
      htmlStr = htmlStr.substring(et[0].length);
    }
  }
  const matchTagText = (element) => {
    const index = htmlStr.indexOf('<');
    element.text = htmlStr.substring(0, index);
    htmlStr = htmlStr.substring(index);
  }
  while (htmlStr) {
    let element = {
      tag: '',
      text: '',
      selfClose: false,
      attributes: {},
      children: [],
    }
    matchTagStart(element);
    matchTagAttribute(element);
    matchTagClose(element);
    matchTagText(element);
    matchTagEnd(element);
  }
  return root;
}
```
以上我们已经实现了一个简易的html模版解析方法，相当于html模版的对象表示法。当然也可以实现逆向，将html模版对象转化成dom树，这个相对比较简单。有了这个我们就会更好理解抽象语法树ast，ast即是对我们js代码的对象描述，和上面的例子是一个道理，有了这么一颗树我们会很容易对我们的代码进行静态操作。

## ast
抽象语法树，js代码词法树型结构的表示。js代码在编译的过程中会首先解析成抽象语法树的形式。我们可以在[astexplorer](https://astexplorer.net/)网站上查看js代码的ast结构。我们可以看一个简单的例子
```js
const print = ()=>{
  console.lot('hello world');
} 
print();
```
转化成ast之后的代码变成了
```json
{
  "type": "Program",
  "start": 0,
  "end": 62,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 1,
      "end": 52,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 7,
          "end": 52,
          "id": {
            "type": "Identifier",
            "start": 7,
            "end": 12,
            "name": "print"
          },
          "init": {
            "type": "ArrowFunctionExpression",
            "start": 15,
            "end": 52,
            "id": null,
            "expression": false,
            "generator": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 19,
              "end": 52,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 23,
                  "end": 50,
                  "expression": {
                    "type": "CallExpression",
                    "start": 23,
                    "end": 49,
                    "callee": {
                      "type": "MemberExpression",
                      "start": 23,
                      "end": 34,
                      "object": {
                        "type": "Identifier",
                        "start": 23,
                        "end": 30,
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 31,
                        "end": 34,
                        "name": "lot"
                      },
                      "computed": false,
                      "optional": false
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "start": 35,
                        "end": 48,
                        "value": "hello world",
                        "raw": "'hello world'"
                      }
                    ],
                    "optional": false
                  }
                }
              ]
            }
          }
        }
      ],
      "kind": "const"
    },
    {
      "type": "ExpressionStatement",
      "start": 54,
      "end": 62,
      "expression": {
        "type": "CallExpression",
        "start": 54,
        "end": 61,
        "callee": {
          "type": "Identifier",
          "start": 54,
          "end": 59,
          "name": "print"
        },
        "arguments": [],
        "optional": false
      }
    }
  ],
  "sourceType": "module"
}
```
我们发现转化之后的代码对象和数组的嵌套的树形结构，每个对象都最少有type、start、end三个属性，他们分别代表的是类型，开始列，结束列

## acorn与babel
acorn是一个js解析库，能帮助我们将js解析成ast，如果想将jsx解析成ast则需要使用[acorn-jsx](https://github.com/acornjs/acorn-jsx)
如果要将typescript解析成ast则需要用到babel或者typescript
- [acorn-demo](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/acorn-demo)
- [babel-demo](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/babel-demo)

## 参考
- [vue html-parser](https://github.com/vuejs/vue/blob/dev/src/compiler/parser/html-parser.js)
- [acorn](https://github.com/acornjs/acorn/tree/master/acorn)
- [recast](https://github.com/benjamn/recast)
- [babel](https://www.babeljs.cn/docs/)