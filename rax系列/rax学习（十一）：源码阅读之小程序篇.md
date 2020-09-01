
### 简单介绍下
前面十节都是讲rax使用，有人就会说了。我们公司也不用rax，那我学它干嘛呢？学了也用不上啊。其实这种想法是不对的，技术都有很多共性的，深挖底层实现会发现大部分都是我们熟悉的知识，只不过是别人进行了一层封装，从本节开始我们通过阅读源码来实现一个简易的rax，大多数大公司都不会直接用开源的框架的，他们会用开发一套适合本公司业务的框架，说白了就是在外面的开源项目中找一个和业务比较友好的开源框架来进行改装，就是这么回事儿！

我们开始从小程序讲起，为什么要从小程序开始讲呢！因为小程序页面和我们的web页面基本上没啥很大的区别，我们就可以把小程序页面当作网页，app（微信、支付宝等）当作一个浏览器。我们找到[rax源码仓库](https://github.com/alibaba/rax/tree/master/packages)，开始从rax的render函数，createElement函数再到rax的渲染引擎等一系列展开来学习。

#### render函数

### 参考  
- [Rax 转小程序链路原理解析（一）](https://zhuanlan.zhihu.com/p/100198414?from=singlemessage)  
- [Rax 小程序编译时方案原理解析（二）](https://zhuanlan.zhihu.com/p/160811912)  
- [前端 DSL 实践指南（上）—— 内部 DSL](https://zhuanlan.zhihu.com/p/107947462)  
- [DSL的概念](https://www.cnblogs.com/feng9exe/p/10901595.html)  
- [使用Javascript实现DSL解析器:揭开DSL神秘面纱](https://juejin.im/post/6844903540444397582)  
- [AST 与前端工程化实战](https://juejin.im/post/6844903910960791566)