
### babel是什么？
javascript转译器，最简单的应用就是将es6的语法转成es5让浏览器或者node环境能识别

### babel作用
将js代码转译成宿主环境能识别的代码,例如babe可以将es6+的代码转化成es5代码。

### babel常用api
- @babel/parser 将源代码解析成 AST
- @babel/traverse 对AST节点进行递归遍历，生成一个便于操作、转换的path对象
- @babel/generator 将AST解码生成js代码
- @babel/types通过该模块对具体的AST节点进行进行增、删、改、查

### 示例
```

```

## 参考
- [babel中文网](https://www.babeljs.cn/)
- [webpack实战-手写一个loader](https://zhuanlan.zhihu.com/p/102729238)