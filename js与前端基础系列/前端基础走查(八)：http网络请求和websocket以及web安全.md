### HTTP(超文本传输协议)


### HTTP缓存
- Cache-control
- Expired

### 浏览器跨域问题及解决方案
- jsonp: script标签src属性发送get请求，在url里加入一个回调函数当作参数来获取服务端返回的数据。
- cors（跨域资源共享）: 是一种基于HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其它origin（域，协议和端口），这样浏览器可以访问加载这些资源。跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的"预检"请求。在预检中，浏览器发送的头中标示有HTTP方法和真实请求中会用到的头

### ajax与XmlHttpRequest

ajax是一种页面局部刷新的技术，局部的数据变化动态更新
xmlhttprequest对象




### websocket


### 网络安全
- xss攻击: 跨站脚本攻击是一种代码注入攻击。 攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。 利用这些恶意脚本，攻击者可获取用户的敏感信息如Cookie、SessionID 等，进而危害数据安全。

- csrf攻击: 攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。 利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

### 问题汇总(FAQ)
- 状态码302与301有啥区别
- http缓存
- 手写batchFetch,请求合并 
- 封装一个axios统一请求
- 封装一个基于websocket长链接
- websocket有什么缺点
- 浏览器跨域问题？解决办法？
- axios请求取消、请求拦截


### 参考
- [MDN文档 WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
- [MDN文档 HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
- [MDN文档 HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)
- [MDN文档 跨源资源共享（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [前端安全系列（一）：如何防止XSS攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)
- [前端安全系列（二）：如何防止CSRF攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)