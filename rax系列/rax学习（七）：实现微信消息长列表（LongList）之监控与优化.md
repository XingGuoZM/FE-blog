仓库地址：[rax-longlist](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist) 
### 简单介绍一下  
上一节完成了业务埋点，本节我们来实践一下性能监控和页面优化。前端的性能监控,就不得不提Performance，它可以检测页面中的性能，W3C性能小组引入进来的一个新的API，它可以检测到白屏时间、首屏时间、用户可操作的时间节点，页面总下载的时间、DNS查询的时间、TCP链接的时间等

- 白屏时间：从我们打开网站到有内容渲染出来的时间点。

- 首屏时间：首屏内容渲染完毕的时间节点。

- 用户可操作时间节点：domready触发节点。

- 总下载时间：window.onload的触发节点。

盗图一张：
![](https://images2015.cnblogs.com/blog/595796/201603/595796-20160323172552386-842768536.png)
当然以上都是针对浏览器环境的，在node环境中也提供了检测性能的[性能的钩子(perf_hooks)](http://nodejs.cn/api/perf_hooks.html)  

### 需求  
- 实现前端性能监控

- 完成页面优化

### 解决方案  

### 参考  
- [Window.performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/performance)  
- [Performance --- 前端性能监控](https://www.jianshu.com/p/1355232d525a) 
- [前端性能监控：window.performance](https://www.cnblogs.com/libin-1/p/6501951.html)  
- [node官方文档 perf_hooks（性能钩子）](http://nodejs.cn/api/perf_hooks.html)  