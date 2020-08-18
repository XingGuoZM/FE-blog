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
我们在useEffect里面使用window.performance即可获得各个时间节点，我们通过计算就能得到白屏时间、首屏时间。我们要看到效果，首先我们要多加一点mock数据，数据太少性能问题不明显,那如何造出大量的mock数据呢，这时候我们的mock.js就派上用场了，为什么之前要加一个mock.js,直接取mock.json不行吗？当然可以，只不过要快速创造出大量的数据，千条万条mock.json文件就会变得非常大，我们只需要在mock.js加个循环就能快速造出大量数据。我们可以这样写：

- mock.js
```

import mock from '../../mock.json';

export const getList = (page) => {
  if (page < 1) return [];
  let res = mock.data[0].list;
  return res.map(item => {
    item.id = page * item.id;
    return item;
  });
};

export const getNav = () => {
  return mock.nav;
};
```

我们在页面调用的时候直接取值即可。

### 问题展示  
我们可以使用浏览器暴露的api - performance来计算时间，chrome提供了性能检测的面板，非常轻松就能检测到，来看一下我们前面做的长列表究竟有多牛逼？？？

![性能检测情况](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200818231159208-889288110.png)

我们在检测中可以看到，数据一多，页面就会拖不动，体验非常非常差，而且看到控制台还报了不少错误。好不容易做出个页面，居然如此垃圾，经不起风浪，真让人失望，自信心备受打击哦。下一节我们来讲一下如何定位问题并且快速的解决性能上的问题，如何做到轻松流畅的拖动几万条数据。


### 参考  
- [Window.performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/performance)  
- [Performance --- 前端性能监控](https://www.jianshu.com/p/1355232d525a) 
- [前端性能监控：window.performance](https://www.cnblogs.com/libin-1/p/6501951.html)  
- [node官方文档 perf_hooks（性能钩子）](http://nodejs.cn/api/perf_hooks.html)  
- [首屏渲染时间获取 performance.now()](https://www.cnblogs.com/wang-z-z/p/9485887.html)  
- [chrome调试-性能分析performance篇](https://www.jianshu.com/p/b6f87bac5381)