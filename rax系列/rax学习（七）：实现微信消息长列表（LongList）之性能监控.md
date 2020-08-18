仓库地址：[rax-longlist](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist) 
### 简单介绍一下  
上一节完成了业务埋点，本节我们来学习一下性能监控，初步认识一下performance这个api。前端的性能监控,就不得不提Performance，它可以检测页面中的性能，W3C性能小组引入进来的一个新的API，它可以检测到白屏时间、首屏时间、用户可操作的时间节点，页面总下载的时间、DNS查询的时间、TCP链接的时间等

- 白屏时间：从我们打开网站到有内容渲染出来的时间点。这个过程包括dns查询、建立tcp链接、发送首个http请求等过程、返回html文档，即responseStart - navigationStart

- 首屏时间：首屏内容渲染完毕的时间节点。加载完资源文件后通过js动态获取接口数据，然后数据返回回来渲染内容，包括css加载、html结构渲染、js文件加载，ajax请求到最后内容渲染，这个计算方式不确定，一般我们页面渲染都会有异步的数据请求，然后又会进行渲染一遍才能完整的展示，所以我们需要在代码里面动态的计算时间。

- domready时间(用户可操作时间节点)：domready触发节点，即domContentLoadedEventEnd - navigationStart

- onload时间(总下载时间)：window.onload的触发节点，即loadEventEnd - navigationStart

盗图一张：
![](https://images2015.cnblogs.com/blog/595796/201603/595796-20160323172552386-842768536.png)
当然以上都是针对浏览器环境的，在node环境中也提供了检测性能的[性能的钩子(perf_hooks)](http://nodejs.cn/api/perf_hooks.html)  


控制台打印出performance，我们可以看到如下信息


![performance](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200817223323454-782980096.png)


我们在chrome开发者面板下也有一个performance，它就是专门来做性能调试与分析的，我们来看看如何使用它，我们以博客园首页为例：


![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200818221739120-1934280093.png)


![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200818223115435-1879309858.png)


### 需求  
- 监控列表的性能，暴露存在的性能问题

### 解决方案  
我们在useEffect里面使用window.performance即可获得各个时间节点，我们通过计算就能得到白屏时间、首屏时间。我们要看到效果，首先我们要多加一点mock数据，数据太少性能问题不明显


### 效果展示  




### 参考  
- [Window.performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/performance)  
- [Performance --- 前端性能监控](https://www.jianshu.com/p/1355232d525a) 
- [前端性能监控：window.performance](https://www.cnblogs.com/libin-1/p/6501951.html)  
- [node官方文档 perf_hooks（性能钩子）](http://nodejs.cn/api/perf_hooks.html)  
- [首屏渲染时间获取 performance.now()](https://www.cnblogs.com/wang-z-z/p/9485887.html)  
- [chrome调试-性能分析performance篇](https://www.jianshu.com/p/b6f87bac5381)