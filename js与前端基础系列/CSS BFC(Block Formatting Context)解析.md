### 什么是BFC(Block formatting context)  
BFC（块级格式上下文）就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
BFC 就是 ‘块级格式上下文’ 的格式，创建了BFC的元素就是一个独立的盒子，不过只有BLock-level box可以参与创建BFC，它规定了内部的Bloc-level Box 如何布局，并且与这个独立盒子里的布局不受外部影响，当然它也不会影响到外面的元素。 
### 应用场景： 
  1. 解决margin叠加的问题 
  2. 用于布局（overflow: hidden）,BFC不会与浮动盒子叠加。 
  3. 用于清除浮动，计算BFC高度。  

### 参考 
- [【CSS】深入理解BFC原理及应用](https://www.jianshu.com/p/acf76871d259)  
- [MDN 块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)  
- [2020年前端面试题及答案](https://blog.csdn.net/raleway/article/details/104268283)  