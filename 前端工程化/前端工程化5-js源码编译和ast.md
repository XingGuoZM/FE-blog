## 写在前面
前面几节大概了解了webpack的使用和执行过程，上一节我们知道了webpack的解析器是acorn，那今天我们就来研究一下js源码编译以及acorn这个库。

## ast
抽象语法树，js代码词法树型结构的表示。js代码在编译的过程中会首先转化成抽象语法树的形式
我们可以在[astexplorer](https://astexplorer.net/)网站上查看js代码的ast结构。

## babel

## acorn
acorn是一个js解析库，能帮助我们将js代码解析成ast
[acorn-demo](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/acorn-demo)

## acorn和recast

## 参考
- [acorn](https://github.com/acornjs/acorn/tree/master/acorn)
- [recast](https://github.com/benjamn/recast)
- [babel](https://www.babeljs.cn/docs/)