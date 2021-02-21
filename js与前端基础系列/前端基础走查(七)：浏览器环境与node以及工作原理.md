### 浏览器渲染过程
关键渲染路径是浏览器将 HTML，CSS 和 JavaScript 转换为屏幕上的像素所经历的步骤序列。  

关键渲染路径包含了 文档对象模型 (DOM)，CSS 对象模型 (CSSOM)，渲染树和布局。

### DOMContentLoaded与script加载async和defer

async和defer都是对script外链的js资源的异步操作的过程。js资源的加载和解析过程，defer是异步加载，同步解析，async是异步加载，异步解析。

### 浏览器页面生命周期
- DOMContentLoaded —— 浏览器已完全加载 HTML，并构建了 DOM 树，但像 \<img\> 和样式表之类的外部资源可能尚未加载完成。
- load —— 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。
- beforeunload/unload —— 当用户正在离开页面时。

每个事件都是有用的：
- DOMContentLoaded 事件 —— DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接口。
- load 事件 —— 外部资源已加载完成，样式已被应用，图片大小也已知了。
- beforeunload 事件 —— 用户正在离开：我们可以检查用户是否保存了更改，并询问他是否真的要离开。
- unload 事件 —— 用户几乎已经离开了，但是我们仍然可以启动一些操作，例如发送统计数据。

### 浏览器控制面板介绍（chrome为例）
Element、Console比较简单，element主要用于查看dom结构与标签元素和样式，console用于控制台输出日志、报错和警告等。
Sources和Network是比较常用且非常有用的工具。这两个面板对于web前端调试有着至关重要的作用。Sources可以查看源代码、打断点、查看执行栈。Network用于查看网络请求

Performance和Memory相对用的比较少，Performance面板用于测试网页性能，Memory用于查看内存情况
Application面板用于查看本地存储管理


### node环境
node官网给出的解释是node是基于chrome v8引擎的运行时。首先来了解下chrome v8是什么？它能够干什么？

node是运行在服务环境上的js

### 问题汇总（FAQ）
- script加载资源时，async和defer异同
- script标签里的代码为什么是宏任务？
- 使用createElement创建script标签，是异步加载脚本吗？
- defer和async与DOMContentLoaded执行顺序？
- DOMContentLoaded何时执行？
- ui渲染与宏任务执行顺序


### 参考  
- [关键渲染路径](https://developer.mozilla.org/zh-CN/docs/Web/Performance/Critical_rendering_path)
- [MDN文档 DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)
- [页面生命周期：DOMContentLoaded，load，beforeunload，unload](https://zh.javascript.info/onload-ondomcontentloaded)
- [脚本：async，defer](https://zh.javascript.info/script-async-defer)
- [资源加载：onload，onerror](https://zh.javascript.info/onload-onerror)
- [你不知道的 DOMContentLoaded](https://zhuanlan.zhihu.com/p/25876048)
- [javascript高级程序设计（第4版）]()

