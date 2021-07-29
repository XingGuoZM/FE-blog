## 前言
在讲webpack插件之前，我们要先讲一下tapable,tapable是webpack的核心库。我们都知道webpack的编译（Compiler）和构建（Compilation）是最核心的东西，它们都是tapable的子类。我们查看webpack的官方文档时会看到如下api
```
run
AsyncSeriesHook
在开始读取 records 之前调用。

回调参数：compiler
```
其中AsyncSeriesHook表示钩子类型，它是由tapable提供的。

## tapable
在写了一系列的[demo](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-tapable)之后才慢慢对tapable有所了解。原来tapable是管理事件的类库，它能帮助我们处理异步同步、串并行等各种复杂的事件，提供了相对完善的钩子（hook）来使用它。

其中webpack就是扩展自tapable,它的工作机制就是讲各个插件串联起来。tapable是一种事件流机制，它主要是事件的监听和触发，包含多种不同的监听和触发事件的方式。tapable提供的钩子（hook）有以下几个
```js
const {
  // 同步钩子
  SyncHook,
  // 多个同步钩子，可以选择某一个进行熔断（Bail）
  SyncBailHook,
  // 多个同步钩子串联叠加，下一步依赖上一步的结果，就像瀑布一样（Waterfall）
  SyncWaterfallHook,
  // 同步循环钩子，只要返回一个非undefined，就会一直循环（Loop）执行下去
  SyncLoopHook,
  // 异步钩子，多个并行（Parallel）的异步事件都执行完毕
  AsyncParallelHook,
  // 多个并行异步钩子，可以选择进行熔断（Bail），直接执行最终的回调，无论其他事件是否执行完成
  AsyncParallelBailHook,
  // 多个串行的异步钩子
  AsyncSeriesHook,
  // 多个串行的异步钩子，可选择性的进行熔断
  AsyncSeriesBailHook,
  // 多个串行执行的异步钩子，下一步的执行依赖上一步的结果
	AsyncSeriesWaterfallHook
 } = require("tapable");
```
tapable的使用有了基本的了解，下面我们来看一看tapable的核心源码，我们先来看一下[SyncHook](https://github.com/webpack/tapable/blob/master/lib/SyncHook.js),代码很少，直接贴上。
```js
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class SyncHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

const factory = new SyncHookCodeFactory();

const TAP_ASYNC = () => {
	throw new Error("tapAsync is not supported on a SyncHook");
};

const TAP_PROMISE = () => {
	throw new Error("tapPromise is not supported on a SyncHook");
};

const COMPILE = function(options) {
	factory.setup(this, options);
	return factory.create(options);
};

function SyncHook(args = [], name = undefined) {
	const hook = new Hook(args, name);
	hook.constructor = SyncHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}

SyncHook.prototype = null;

module.exports = SyncHook;
```
精简一下，就是如下几行代码，我们发现这个钩子直接new了一个Hook的实例，然后再给它赋上几个基本的属性，tapAsyn和tapPromise直接报错，compile也是从factory直接create一个。现在我们要看的就是Hook和HookCodeFactory这两个公共类。
```js
function SyncHook(args = [], name = undefined) {
	const hook = new Hook(args, name);
	hook.constructor = SyncHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
	hook.compile = COMPILE;
	return hook;
}
```

### Hook类解读
[Hook.js源码地址](https://github.com/webpack/tapable/blob/master/lib/Hook.js)
看源码的时候我们要先对其进行删减，把最精华的核心代码提炼出来阅读，然后一个就是要对其函数进行分类，一类一类来看。


### HookCodeFactory类解读
[HookCodeFactory源码](https://github.com/webpack/tapable/blob/master/lib/HookCodeFactory.js)


## 参考
- [https://github.com/webpack/tapable](https://github.com/webpack/tapable)
- [干货！撸一个webpack插件(内含tapable详解+webpack流程)](https://juejin.cn/post/6844903713312604173)
- [Webpack tapable 使用研究](https://juejin.cn/post/6844903895584473096)
- [Webpack 核心库 Tapable 的使用与原理解析](https://zhuanlan.zhihu.com/p/100974318)
