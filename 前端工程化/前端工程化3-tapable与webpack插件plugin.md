## 前言
在讲webpack插件之前，我们要先讲一下tapable,tapable是webpack的核心库。我们都知道webpack的编译（Compiler）和构建（Compilation）是最核心的东西，它们都是tapable的子类。我们查看webpack的官方文档时会看到如下api
```
run
AsyncSeriesHook

参数：compiler
```
其中AsyncSeriesHook表示钩子类型，它是由tapable提供的。

## tapable
在写了一系列的[demo](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-tapable)之后才慢慢对tapable有所了解。原来tapable是管理事件的类库，它能帮助我们处理异步同步、串并行等各种复杂的事件，提供了相对完善的钩子（hook）来使用它。

其中webpack就是扩展自tapable,它的工作机制就是讲各个插件串联起来。tapable是一种事件流机制，它主要是事件的监听和触发，包含多种不同的监听和触发事件的方式。开始读取 records 之前，钩入(hook into) compiler。

## 参考
- [https://github.com/webpack/tapable](https://github.com/webpack/tapable)
- [干货！撸一个webpack插件(内含tapable详解+webpack流程)](https://juejin.cn/post/6844903713312604173)
- [Webpack tapable 使用研究](https://juejin.cn/post/6844903895584473096)
- [Webpack 核心库 Tapable 的使用与原理解析](https://zhuanlan.zhihu.com/p/100974318)
