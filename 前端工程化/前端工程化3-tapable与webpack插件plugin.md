## 前言
在讲webpack插件之前，我们要先讲一下tapable,tapable是webpack的核心库。我们都知道webpack的编译（Compiler）和构建（Compilation）是最核心的东西，它们都是tapable的子类。我们查看webpack的官方文档时会看到如下api
```
run
AsyncSeriesHook

开始读取 records 之前，钩入(hook into) compiler。

参数：compiler
```
其中AsyncSeriesHook表示钩子类型，它是由tapable提供的。

## tapable
tapable事件发布流


## 参考
- [https://github.com/webpack/tapable](https://github.com/webpack/tapable)
- [干货！撸一个webpack插件(内含tapable详解+webpack流程)](https://juejin.cn/post/6844903713312604173)
- [Webpack tapable 使用研究](https://juejin.cn/post/6844903895584473096)
