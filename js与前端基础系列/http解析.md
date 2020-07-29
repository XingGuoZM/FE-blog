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

### 常用状态码及其含义  
+ 1xx：指示信息--表示请求已接收，继续处理
  - 100 Continue 初始的请求已经接受，客户应当继续发送请求的其余部分。（HTTP 1.1新）
  - 101 Switching Protocols 服务器将遵从客户的请求转换到另外一种协议（HTTP 1.1新）
+ 2xx：成功--表示请求已被成功接收、理解、接受
  - 200 OK 一切正常，对GET和POST请求的应答文档跟在后面。
  - 201 Created 服务器已经创建了文档，Location头给出了它的URL。
  - 202 Accepted 已经接受请求，但处理尚未完成。
  - 203 Non-Authoritative Information 文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝（HTTP 1.1新）。
  - 204 No Content 没有新文档，浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而Servlet可以确定用户文档足够新，这个状态代码是很有用的。
  - 205 Reset Content 没有新的内容，但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容（HTTP 1.1新）。
  - 206 Partial Content 客户发送了一个带有Range头的GET请求，服务器完成了它（HTTP 1.1新）。
+ 3xx：重定向--要完成请求必须进行更进一步的操作
  - 300 Multiple Choices 客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明。
  - 301 Moved Permanently 客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL。
  - 302 Found 类似于301，但新的URL应该被视为临时性的替代，而不是永久性的。注意，在HTTP1.0中对应的状态信息是“Moved Temporatily”。出现该状态代码时，浏览器能够自动访问新的URL，因此它是一个很有用的状态代码。注意这个状态代码有时候可以和301替换使用。例如，如果浏览器错误地请求http://host/~user（缺少了后面的斜杠），有的服务器返回301，有的则返回302。严格地说，我们只能假定只有当原来的请求是GET时浏览器才会自动重定向。请参见307。
  - 303 See Other 类似于301/302，不同之处在于，如果原来的请求是POST，Location头指定的重定向目标文档应该通过GET提取（HTTP 1.1新）。
  - 304 Not Modified 客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用。
  - 305 Use Proxy 客户请求的文档应该通过Location头所指明的代理服务器提取（HTTP 1.1新）。
  - 307 Temporary Redirect 和302（Found）相同。许多浏览器会错误地响应302应答进行重定向，即使原来的请求是POST，即使它实际上只能在POST请求的应答是303时 才能重定向。由于这个原因，HTTP1.1新增了307，以便更加清除地区分几个状态代码：当出现303应答时，浏览器可以跟随重定向的GET和POST请求；如果是307应答，则浏览器只能跟随对GET请求的重定向。（HTTP 1.1新）

+ 4xx：客户端错误--请求有语法错误或请求无法实现
  - 400 Bad Request 请求出现语法错误。
  - 401 Unauthorized 客户试图未经授权访问受密码保护的页面。应答中会包含一个WWW-Authenticate头，浏览器据此显示用户名字/密码对话框，然后在填写合适的Authorization头后再次发出请求。
  - 403 Forbidden 资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。
  - 404 Not Found 无法找到指定位置的资源。这也是一个常用的应答。
  - 405 Method Not Allowed 请求方法（GET、POST、HEAD、DELETE、PUT、TRACE等）对指定的资源不适用。（HTTP 1.1新）
  - 406 Not Acceptable 指定的资源已经找到，但它的MIME类型和客户在Accpet头中所指定的不兼容（HTTP 1.1新）。
  - 407 Proxy Authentication Required 类似于401，表示客户必须先经过代理服务器的授权。（HTTP 1.1新）
  - 408 Request Timeout 在服务器许可的等待时间内，客户一直没有发出任何请求。客户可以在以后重复同一请求。（HTTP 1.1新）
  - 409 Conflict 通常和PUT请求有关。由于请求和资源的当前状态相冲突，因此请求不能成功。（HTTP 1.1新）
  - 410 Gone 所请求的文档已经不再可用，而且服务器不知道应该重定向到哪一个地址。它和404的不同在于，返回407表示文档永久地离开了指定的位置，而404表示由于未知的原因文档不可用。（HTTP 1.1新）
  - 411 Length Required 服务器不能处理请求，除非客户发送一个Content-Length头。（HTTP 1.1新）
  - 412 Precondition Failed 请求头中指定的一些前提条件失败（HTTP 1.1新）。
  - 413 Request Entity Too Large 目标文档的大小超过服务器当前愿意处理的大小。如果服务器认为自己能够稍后再处理该请求，则应该提供一个Retry-After头（HTTP 1.1新）。
  - 414 Request URI Too Long URI太长（HTTP 1.1新）。
  - 416 Requested Range Not Satisfiable 服务器不能满足客户在请求中指定的Range头。（HTTP 1.1新）

+ 5xx：服务器端错误--服务器未能实现合法的请求
  - 500 Internal Server Error 服务器遇到了意料不到的情况，不能完成客户的请求。
  - 501 Not Implemented 服务器不支持实现请求所需要的功能。例如，客户发出了一个服务器不支持的PUT请求。
  - 502 Bad Gateway 服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答。
  - 503 Service Unavailable 服务器由于维护或者负载过重未能应答。例如，Servlet可能在数据库连接池已满的情况下返回503。服务器返回503时可以提供一个Retry-After头。
  - 504 Gateway Timeout 由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答。（HTTP 1.1新）505 HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本。（HTTP 1.1新）


### 参考  
- [HTTP1.0、HTTP1.1 和 HTTP2.0 的区别](https://www.cnblogs.com/heluan/p/8620312.html)  
- [MDN HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)  
- [What is HTTP (Hypertext Transfer Protocol)?](https://ecomputernotes.com/computernetworkingnotes/services-and-applications/hypertext-transfer-protocol)  
- [HTTP 与 HTTPS 的区别](https://www.runoob.com/w3cnote/http-vs-https.html)  
- [TCP三次握手四次挥手详解](https://www.cnblogs.com/zmlctt/p/3690998.html)  
- [TCP三次握手和四次挥手，史上最简单的解释，通俗易懂](https://github.com/wuwnnwng/TCP-THANDFH/blob/master/tcp.txt)  
- [2020年前端面试题及答案](https://blog.csdn.net/raleway/article/details/104268283)  