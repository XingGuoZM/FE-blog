
### 强缓存和协商缓存
强缓存是利用http的返回头中的Expires或者Cache-Control两个字段来控制的，用来表示资源的缓存时间
1. 浏览器先根据这个资源的http头信息来判断是否命中强缓存。如果命中则直接加在缓存中的资源，并不会将请求发送到服务器。
2. 如果未命中强缓存，则浏览器会将资源加载请求发送到服务器。服务器来判断浏览器本地缓存是否失效。若可以使用，则服务器并不会返回资源信息，浏览器继续从缓存加载资源。
3. 如果未命中协商缓存，则服务器会将完整的资源返回给浏览器，浏览器加载新资源，并更新缓存。
Expires和Cashe-Control异同
Expires是过期的时间点，Cashe-Control是过期时长。

协商缓存
Last-Modify/If-Modify-Since
ETag/If-None-Match
304

### 参考
- [HTTP缓存机制](https://www.cnblogs.com/ranyonsue/p/8918908.html)