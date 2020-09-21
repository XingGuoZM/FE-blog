
### 前言  
url中传入特殊字符会出现乱码，需要对uri进行编码和转码操作

### 释义  
在开始之前，我们先要了解两个名词URL、URI，什么是URL，什么是URI，什么是URN？

- URI(Uniform Resource Identifier): 统一资源标识符，用来唯一的标识一个资源  
- URL(Uniform Resource Locator): 统一资源定位器，它是一种具体的URI，即URL可以用来标识一个资源，而且还指明了如何locate这个资源  
- URN(Uniform Resource Name): 统一资源命名，是通过名字来标识资源  

URI是以一种抽象的，高层次概念定义统一资源标识，而URL和URN则是具体的资源标识的方式。URL和URN都是一种URI

- encodeURIComponent  
  编码URI，转义的字符：A-Z a-z 0-9 - _ . ! ~ * ' ( )  
- decodeURIComponent  
  解码通过encodeURIComponent编码的URI

  
- encodeURI    
  编码URI，不转义的字符：A-Z a-z 0-9 - _ . ! ~ * ' ( )  
- decodeURI  
  解码通过encodeURI编码的URI 

- encodeURI和encodeURIComponent区别
  1. 是否转义字符：A-Z a-z 0-9 - _ . ! ~ * ' ( )  

### 示例  


### 应用  
- url中传参带中文
- url中带有特殊字符大小写


### 参考  
- [MDN URI](https://wiki.developer.mozilla.org/en-US/docs/Glossary/URI)  
- [URI和URL的区别](https://www.cnblogs.com/gaojing/archive/2012/02/04/2413626.html)
- [MDN decodeURI()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)  
- [MDN encodeURI()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)  
- [MDN decodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)  
- [MDN encodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)  
- [为什么要encodeURI(url)两次才不会出现乱码？](https://www.jianshu.com/p/831618a8e116)