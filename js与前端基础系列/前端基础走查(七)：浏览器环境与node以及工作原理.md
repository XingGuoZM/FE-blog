### 浏览器渲染过程
关键渲染路径是浏览器将 HTML，CSS 和 JavaScript 转换为屏幕上的像素所经历的步骤序列。  

关键渲染路径包含了 文档对象模型 (DOM)，CSS 对象模型 (CSSOM)，渲染树和布局。

### DOMContentLoaded与script加载async和defer

async和defer都是对script外链的js资源的异步操作的过程。js资源的加载和解析过程，defer是异步加载，同步解析，async是异步加载，异步解析。


### node执行过程


### 问题汇总（FAQ）
- script加载资源时，async和defer异同
- DOMContentLoaded何时执行？

### 参考  
- [关键渲染路径](https://developer.mozilla.org/zh-CN/docs/Web/Performance/Critical_rendering_path)
- [MDN文档 DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)