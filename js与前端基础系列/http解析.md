### http历史  
超文本传输协议 

### TCP三次握手  

### http1.0 http1.1和http2.0的区别  
+ http 1.0  
  - 使用header里的If-Modified-Since,Expires来做为缓存判断的标准  
  - 服务器只允许请求资源整体推送，不支持断点续传功能  
  - 每台服务器都绑定一个唯一的IP地址，请求消息中的URL并没有传递主机名（hostname）  
+ http 1.1  
  - 引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略  
  - 请求头引入了range头域，它允许只请求资源的某个部分  
  - 新增了24个错误状态响应码  
  - 请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）
  - 支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。
+ http2.0
  - 新的二进制格式  
  - 多路复用
  - header压缩
  - 服务端推送  

### http 和 https的区别  
页面响应速度
+ http  
  - 不需要申请证书  
  - 明文传输，安全系数低  
  - 默认端口 80  
  - 页面响应速度快,主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，而 HTTPS除了 TCP 的三个包，还要加上 ssl 握手需要的 9 个包，所以一共是 12 个包  
+ https
  - 需要到 CA（Certificate Authority，数字证书认证机构）申请证书，一般需要缴费  
  - 加密传输，安全系数高  
  - 默认端口 443  
  - 可以有效的防止运营商劫持  
  - 建构在SSL/TLS 之上的 HTTP 协议，耗费服务器资源  

### 参考  
- [HTTP1.0、HTTP1.1 和 HTTP2.0 的区别](https://www.cnblogs.com/heluan/p/8620312.html)  
- [MDN HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)  
- [What is HTTP (Hypertext Transfer Protocol)?](https://ecomputernotes.com/computernetworkingnotes/services-and-applications/hypertext-transfer-protocol)  
- [HTTP 与 HTTPS 的区别](https://www.runoob.com/w3cnote/http-vs-https.html)