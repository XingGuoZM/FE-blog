### http历史  
超文本传输​​协议（HTTP）是一个用于传输超媒体文档（例如 HTML）的应用层协议  

### TCP三次握手与四次挥手  
三次握手(Three-way Handshake)，是指建立一个TCP连接时，需要客户端和服务器总共发送3个包  
四次挥手(four-way handshake)，是指TCP的连接的拆除需要发送四个包  

解析：要建立tcp连接，我们必须分别站在客户端这边和服务器这边来看连接已经成功了。即服务器需要明确知道自己能接收数据并且知道客户端能接收到自己发送的数据，同理客户端也要明确知道自己能接收到服务器传来的数据并且知道自己发送的数据能被服务器接收到。
  - 第一次握手：客户端向服务器发出报文。此时客户端不知道服务器能不能接收到数据，服务器收到报文之后确定自己能接收到客户端发来的数据  
  - 第二次握手：服务器向客户端回应报文。此时服务器不知道客户端能不能接收到数据，客户端收到报文之后确定自己能接收到服务器发来的数据  
  - 第三次握手：客户端向服务器回应报文。此时服务器收到报文之后，也知道了客户端能接收到自己发过去的数据，至此服务器和客户端双方都知道自己能接收到对方发来的数据，也知道自己发送的数据对方能收到。  

盗图一份  

![TCP三次握手](http://www.centos.bz/wp-content/uploads/2012/08/100327002629.png)

拆除连接的四次挥手，可以由客户端和服务器任意一方发起拆除连接，和上面建立连接一样，我们的目的是要服务器和客户端双方都要让对方知道自己可以拆除连接。比如由服务器发起拆除连接。
  - 第一次挥手：服务器发出报文。先看客户端这边，客户端接到报文之后，确定知道服务器可以拆除连接；再看服务器这边，服务器不知道自己是否可以拆除连接，因为客户端还没回应。
  - 第二次挥手：客户端回应报文。至此服务器知道自己可以拆除连接，客户端也知道服务器可以拆除连接。
  - 第三次挥手：客户端发出报文。先看服务器这边，服务器接到报文之后，确定知道客户端可以拆除连接；再看客户端这边，客户端不知道自己是否可以拆除连接，因为服务器还没回应。
  - 第四次挥手：服务器回应报文。至此客户端也知道自己可以拆除连接，服务器也知道客户端可以拆除连接  

盗图一份  

![TCP四次挥手](http://www.centos.bz/wp-content/uploads/2012/08/100327022731.jpg)

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
- [TCP三次握手四次挥手详解](https://www.cnblogs.com/zmlctt/p/3690998.html)  
- [TCP三次握手和四次挥手，史上最简单的解释，通俗易懂](https://github.com/wuwnnwng/TCP-THANDFH/blob/master/tcp.txt)