
### http 1.0缓存
Expires

### http 1.1缓存

Cache-Control

### 私有缓存和公有缓存
Cashe-Control: public/private

### 强缓存和协商缓存
强缓存会直接从浏览器里拿数据，协商缓存会先访问服务器看缓存是否过期，再决定是否从浏览器里拿数据
控制强缓存的字段有：Expires和Cache-Control
控制协商缓存的字段：Last-Modified/If-Modified-Since和Etag/If-None-Match

### 新鲜度与过期时间
If-None-Match
Cashe-Control: max-age=31536000 单位为秒
状态码:304

![](https://mdn.mozillademos.org/files/13771/HTTPStaleness.png)

## 参考
- [彻底弄懂HTTP缓存机制及原理](https://www.cnblogs.com/chenqf/p/6386163.html)
- [HTTP缓存技术详解](https://www.jianshu.com/p/4f07740d68e4)
- [MDN文档 HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)
- [缓存（二）——浏览器缓存机制：强缓存、协商缓存](https://github.com/amandakelake/blog/issues/41)
- [蚂蚁、字节、滴滴面试经历总结](https://juejin.im/post/6844904161830502407)
