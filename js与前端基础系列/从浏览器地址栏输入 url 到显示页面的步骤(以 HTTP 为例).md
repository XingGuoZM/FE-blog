在浏览器地址栏输入 URL
浏览器查看缓存，如果请求资源在缓存中并且新鲜，跳转到转码步骤
如果资源未缓存，发起新请求
如果已缓存，检验是否足够新鲜，足够新鲜直接提供给客户端，否则与服务器进行验证。
检验新鲜通常有两个 HTTP 头进行控制Expires和Cache-Control：
HTTP1.0 提供 Expires，值为一个绝对时间表示缓存新鲜日期
HTTP1.1 增加了 Cache-Control: max-age=,值为以秒为单位的最大新鲜时间
浏览器解析 URL获取协议，主机，端口，path
浏览器组装一个 HTTP（GET）请求报文
浏览器获取主机 ip 地址，过程如下：
浏览器缓存
本机缓存
hosts 文件
路由器缓存
ISP DNS 缓存
DNS 递归查询（可能存在负载均衡导致每次 IP 不一样）
打开一个 socket 与目标 IP 地址，端口建立 TCP 链接，三次握手如下：
客户端发送一个 TCP 的SYN=1，Seq=X的包到服务器端口
服务器发回SYN=1， ACK=X+1， Seq=Y的响应包
客户端发送ACK=Y+1， Seq=Z
TCP 链接建立后发送 HTTP 请求
服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用 HTTP Host 头部判断请求的服务程序
服务器检查HTTP 请求头是否包含缓存验证信息如果验证缓存新鲜，返回304等对应状态码
处理程序读取完整请求并准备 HTTP 响应，可能需要查询数据库等操作
服务器将响应报文通过 TCP 连接发送回浏览器
浏览器接收 HTTP 响应，然后根据情况选择关闭 TCP 连接或者保留重用，关闭 TCP 连接的四次握手如下：
主动方发送Fin=1， Ack=Z， Seq= X报文
被动方发送ACK=X+1， Seq=Z报文
被动方发送Fin=1， ACK=X， Seq=Y报文
主动方发送ACK=Y， Seq=X报文
浏览器检查响应状态吗：是否为 1XX，3XX， 4XX， 5XX，这些情况处理与 2XX 不同
如果资源可缓存，进行缓存
对响应进行解码（例如 gzip 压缩）
根据资源类型决定如何处理（假设资源为 HTML 文档）
解析 HTML 文档，构件 DOM 树，下载资源，构造 CSSOM 树，执行 js 脚本，这些操作没有严格的先后顺序，以下分别解释
构建 DOM 树：
Tokenizing：根据 HTML 规范将字符流解析为标记
Lexing：词法分析将标记转换为对象并定义属性和规则
DOM construction：根据 HTML 标记关系将对象组成 DOM 树
解析过程中遇到图片、样式表、js 文件，启动下载
构建CSSOM 树：
Tokenizing：字符流转换为标记流
Node：根据标记创建节点
CSSOM：节点创建 CSSOM 树
根据 DOM 树和 CSSOM 树构建渲染树:
从 DOM 树的根节点遍历所有可见节点，不可见节点包括：1）script,meta这样本身不可见的标签。2)被 css 隐藏的节点，如display: none
对每一个可见节点，找到恰当的 CSSOM 规则并应用
发布可视节点的内容和计算样式
js 解析如下：
浏览器创建 Document 对象并解析 HTML，将解析到的元素和文本节点添加到文档中，此时document.readystate 为 loading
HTML 解析器遇到没有 async 和 defer 的 script 时，将他们添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。这样就可以用 document.write()把文本插入到输入流中。同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作 script 和他们之前的文档内容
当解析器遇到设置了async属性的 script 时，开始下载脚本并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器不会停下来等它下载。异步脚本禁止使用 document.write()，它们可以访问自己 script 和之前的文档元素
当文档完成解析，document.readState 变成 interactive
所有defer脚本会按照在文档出现的顺序执行，延迟脚本能访问完整文档树，禁止使用 document.write()
浏览器在 Document 对象上触发 DOMContentLoaded 事件
此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，等这些内容完成载入并且所有异步脚本完成载入和执行，document.readState 变为 complete,window 触发 load 事件

### 参考
- [从浏览器地址栏输入 url 到显示页面的步骤(以 HTTP 为例)](https://github.com/qiu-deqing/FE-interview#%E4%BB%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E5%9C%B0%E5%9D%80%E6%A0%8F%E8%BE%93%E5%85%A5-url-%E5%88%B0%E6%98%BE%E7%A4%BA%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%AD%A5%E9%AA%A4%E4%BB%A5-http-%E4%B8%BA%E4%BE%8B)