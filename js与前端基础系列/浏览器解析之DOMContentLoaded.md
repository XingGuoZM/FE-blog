浏览器加载和解析过程
--- 
构建对象模型(DOM,CSSOM) -> 构建渲染树(renderTree) -> 布局 -> 渲染

1. html文档解析与css文档解析互不影响
2. js会阻塞html的文档解析，即遇到\<script\>时，浏览器会停下对html的解析，转而处理脚本
3. css文档解析完成之后才会开始执行js
4. 

load与DOMContentLoaded的区别
---
html文档解析完成会触发DOMContentLoaded
所有资源加载完成之后才会触发loaded


defer与async异同
--- 
正常情况下脚本下载与解析会阻塞html文档的解析
async表示异步加载并执行
defer表示异步下载但延迟执行，延迟至DOMContentLoaded事件触发之前完成


### 参考
- [你不知道的 DOMContentLoaded](https://zhuanlan.zhihu.com/p/25876048)
- [async vs defer attributes](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
- [浏览器的渲染过程](https://zhuanlan.zhihu.com/p/74792085)