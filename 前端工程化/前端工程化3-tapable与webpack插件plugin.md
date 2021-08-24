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

其中webpack就是扩展自tapable,它的工作就是管理众多插件，对外提供tap（注册）和call（调用）方法。tapable是一种事件流机制，它主要是事件的监听和触发，本质上是订阅-发布模式，包含多种不同的监听和触发事件的方式。tapable提供的钩子（hook）有以下几个
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
精简一下，就是如下几行代码，我们发现这个钩子直接new了一个Hook的实例，然后再给它赋上几个基本的属性，tapAsyn和tapPromise直接报错，compile也是从factory直接create一个。实现上使用了面向对象的继承和工厂模式，现在我们要看的就是Hook和HookCodeFactory这两个公共类。
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
我们再来看下其他钩子，AsyncParallelHook、AsyncParallelHook等异步钩子的核心代码都和上面类似，最重要的是Hook类和comiple方法。所以Hook类和HookCodeFactory类是公共的、可复用的父类。

### Hook类解读
[Hook.js源码地址](https://github.com/webpack/tapable/blob/master/lib/Hook.js)
**结构分析**
看源码的时候我们要先对其进行删减，把最精华的核心代码提炼出来阅读，然后一个就是要对其函数进行分类，一类一类来看。首先先看结构，我们对代码精简一下，大概是如下结构代码。Hook类外面有3个委托函数，分别对应sync、async和promise，这3个委托方法都会调用Hook类的_createCall方法。taps属性用于存储插件、interceptors属性用于存储拦截器，compile方法是个抽象方法，需要子类进行重写。还有我们熟悉的tap、tapAsync、tapPromise方法，intercept方法用于插件的拦截。
```js
const CALL_DELEGATE = function(...args) {
	this.call = this._createCall("sync");
	return this.call(...args);
};
const CALL_ASYNC_DELEGATE = function(...args) {
	this.callAsync = this._createCall("async");
	return this.callAsync(...args);
};
const PROMISE_DELEGATE = function(...args) {
	this.promise = this._createCall("promise");
	return this.promise(...args);
};

class Hook {
	constructor(args = [], name = undefined) {
		this._args = args;
		this.taps = [];
		this.interceptors = [];

		this.call = CALL_DELEGATE;
		this.callAsync = CALL_ASYNC_DELEGATE;
		this.promise = PROMISE_DELEGATE;

		this.compile = this.compile;
		this.tap = this.tap;
		this.tapAsync = this.tapAsync;
		this.tapPromise = this.tapPromise;
	}
	compile(options) {
		throw new Error("Abstract: should be overridden");
	}
	_createCall(type) {
		...
	}
	tap(options, fn) {
		...
	}

	tapAsync(options, fn) {
		...
	}

	tapPromise(options, fn) {
		...
	}
	intercept(interceptor) {
		...
	}
}
```
_insert方法主要作用是在taps数组最前面插入一项，

### HookCodeFactory类解读
[HookCodeFactory源码](https://github.com/webpack/tapable/blob/master/lib/HookCodeFactory.js)
看HookCodeFactory的源码也是遵循上面的原则，先看结构，对该类进行拆解。通过观察我们发现有以下几个方法:create、setup、contentWithInterceptors、callTap、callTapsSeries、callTapsLooping、callTapsParallel等。
create和setup方法是一对，我们可以看到每个钩子里都有compile方法，这个方法里都存在这两行代码
```js
	factory.setup(this, options);
	return factory.create(options);
```
setup方法很简单，将注册的方法都收集起来。

## 参考
- [https://github.com/webpack/tapable](https://github.com/webpack/tapable)
- [干货！撸一个webpack插件(内含tapable详解+webpack流程)](https://juejin.cn/post/6844903713312604173)
- [Webpack tapable 使用研究](https://juejin.cn/post/6844903895584473096)
- [Webpack tapable 源码研究](https://juejin.cn/post/6844903898088472589)
- [Webpack 核心库 Tapable 的使用与原理解析](https://zhuanlan.zhihu.com/p/100974318)
