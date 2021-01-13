## 写在前面
通过清除多余代码方式来优化项目打包体积的技术，因为commonjs是运行时，所以在代码运行前无法分析出不需要的代码，因此tree-shaking适用于es module，即通过import引入依赖。

## tree shaking原理
通过编译来判断加载了哪些模块，哪些模块未引用，进而删除未被使用的代码。它依赖于ES6模块语法的静态结构特性

## webpack中如何使用tree shaking
方式一 sideEffects：package.json中加sideEffects属性
```js
"sideEffects": false
```
方式二 usedExports：webapck.config.js中加usedExports
```js
  mode: 'development',
  optimization: {
    usedExports: true,
  }
```

## 示例demo
[webpack tree-shaking]()

[rollup tree-shaking]()

## 参考
- [webpack中文网 tree shaking](https://webpack.docschina.org/guides/tree-shaking/)