
### 简单介绍下
前面十节都是讲rax使用，有人就会说了。我们公司也不用rax，那我学它干嘛呢？学了也用不上啊。其实这种想法是不对的，技术都有很多共性的，深挖底层实现会发现大部分都是我们熟悉的知识，只不过是别人进行了一层封装，从本节开始我们通过阅读源码来实现一个简易的rax，大多数大公司都不会直接用开源的框架的，他们会用开发一套适合本公司业务的框架，说白了就是在外面的开源项目中找一个和业务比较友好的开源框架来进行改装，就是这么回事儿！

我们开始从小程序讲起，为什么要从小程序开始讲呢！因为小程序页面和我们的web页面基本上没啥很大的区别，我们就可以把小程序页面当作网页，app（微信、支付宝等）当作一个浏览器。我们找到[rax源码仓库](https://github.com/alibaba/rax/tree/master/packages)，开始从rax的render函数，createElement函数再到rax的渲染引擎等一系列展开来学习。

### 什么是DSL（领域特定语言）？  
DSL 其实是 Domain Specific Language 的缩写，中文翻译为领域特定语言（下简称 DSL）；而与 DSL 相对的就是 GPL，这里的 GPL 并不是我们知道的开源许可证，而是 General Purpose Language 的简称，即通用编程语言，也就是我们非常熟悉的 Objective-C、Java、Python 以及 C 语言等等。
最常见的 DSL 包括 Regex 以及 HTML & CSS

### 编译时和运行时的区别？  
- 编译时：就是编译器帮你把源代码翻译成机器能识别的代码

- 运行时：所谓运行时就是代码跑起来了.被装载到内存中去了

总结：编译时即代码的翻译，运行时即代码的转化

### AST（抽象语法树）解析？  
盗图一份
![](http://dl2.iteye.com/upload/attachment/0110/0833/7be2e1f3-c60a-3d85-b265-8856896db6f1.png)

程序代码本身可以被映射成为一棵语法树，而通过操纵语法树，我们能够精准的获得程序代码中的某个节点


### vdom
- [element](https://github.com/alibaba/rax/blob/master/packages/rax/src/vdom/element.js)  
- [instance](https://github.com/alibaba/rax/blob/master/packages/rax/src/vdom/instance.js)  
- [native](https://github.com/alibaba/rax/blob/master/packages/rax/src/vdom/native.js)  
- [shallowEqual](https://github.com/alibaba/rax/blob/master/packages/rax/src/vdom/shallowEqual.js)  
```
import { isNull, isObject, EMPTY_OBJECT } from '../types';

const hasOwnProperty = EMPTY_OBJECT.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
export function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y; // eslint-disable-line no-self-compare
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export default function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (!isObject(objA) || isNull(objA) || !isObject(objB) || isNull(objB)) {
    return false;
  }

  let keysA = Object.keys(objA);
  let keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
```
- [inject](https://github.com/alibaba/rax/blob/master/packages/rax/src/vdom/inject.js)  
- [flattenChildren](https://github.com/alibaba/rax/blob/master/packages/rax/src/vdom/flattenChildren.js)  


### rax方法  
- [index文件](https://github.com/alibaba/rax/blob/master/packages/rax/src/index.js)
```
export createElement from './createElement';
export createContext from './createContext';
export createRef from './createRef';
export forwardRef from './forwardRef';
export { useState, useContext, useEffect, useLayoutEffect, useRef, useCallback, useMemo, useReducer, useImperativeHandle } from './hooks';
export memo from './memo';
export Fragment from './fragment';
export render from './render';
export Component, { PureComponent } from './vdom/component';
export version from './version';

import Host from './vdom/host';
import Instance from './vdom/instance';
import Element from './vdom/element';
import flattenChildren from './vdom/flattenChildren';
import DevtoolsHook from './devtools/index';

export const shared = {
  Host,
  Instance,
  Element,
  flattenChildren
};

if (process.env.NODE_ENV !== 'production') {
  /* global __RAX_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __RAX_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
    typeof __RAX_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
    __RAX_DEVTOOLS_GLOBAL_HOOK__.inject(DevtoolsHook);
  }

  if (typeof window !== 'undefined') {
    if (window.__RAX_INITIALISED__) {
      console.error('Warning: more than one instance of Rax has been initialised, this could lead to unexpected behaviour.');
    }
    window.__RAX_INITIALISED__ = true;
  }
}
```
- [createElement()](https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js)  
- [createRef()](https://github.com/alibaba/rax/blob/master/packages/rax/src/createRef.js)  
```
export default function createRef() {
  return {
    current: null
  };
}
```

- [render()](https://github.com/alibaba/rax/blob/master/packages/rax/src/render.js)  



### 参考  
- [Rax 转小程序链路原理解析（一）](https://zhuanlan.zhihu.com/p/100198414?from=singlemessage)  
- [Rax 小程序编译时方案原理解析（二）](https://zhuanlan.zhihu.com/p/160811912)  
- [前端 DSL 实践指南（上）—— 内部 DSL](https://zhuanlan.zhihu.com/p/107947462)  
- [DSL的概念](https://www.cnblogs.com/feng9exe/p/10901595.html)  
- [使用Javascript实现DSL解析器:揭开DSL神秘面纱](https://juejin.im/post/6844903540444397582)  
- [什么叫编译时和运行时](https://blog.csdn.net/weiwenhp/article/details/8107203)  
- [AST抽象语法树——最基础的javascript重点知识，99%的人根本不了解](https://segmentfault.com/a/1190000016231512)  
- [前端里说的ast是什么?](https://www.zhihu.com/question/33107553)  
- [JavaScript的语法解析与抽象语法树](https://www.iteye.com/news/30731)