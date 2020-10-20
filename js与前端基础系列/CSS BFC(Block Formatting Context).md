### 什么是BFC(Block formatting context)  
BFC（块级格式上下文）就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
BFC 就是 ‘块级格式上下文’ 的格式，创建了BFC的元素就是一个独立的盒子，不过只有BLock-level box可以参与创建BFC，它规定了内部的Bloc-level Box 如何布局，并且与这个独立盒子里的布局不受外部影响，当然它也不会影响到外面的元素。 

### 形成条件
- 浮动 float 除 none 以外的值
- 定位 position（absolute，fixed）
- display 为以下其中之一的值 inline-block，table-cell，table-caption
- overflow 除了 visible 以外的值（hidden，auto，scroll）
### 应用场景
  1. 解决margin叠加的问题 
  2. 用于布局（overflow: hidden）,BFC不会与浮动盒子叠加。 
  3. 用于清除浮动，计算BFC高度。  

### 本质
BFC的本质就是所有元素都是块级元素（或者可以当成块级元素）处理，默认情况下在垂直方向上一个接一个的放置，垂直方向上的距离由margin决定。
除此之外还有  
- IFC（Inline formatting contexts）：内联格式上下文
  - display: inline-box
- FFC（Flex formatting contexts）：自适应格式上下文
  - display:flex/inline-flex
- GFC（GrideLayout formatting contexts）：网格布局格式化上下文

### 参考 
- [【CSS】深入理解BFC原理及应用](https://www.jianshu.com/p/acf76871d259)  
- [MDN 块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)  
- [2020年前端面试题及答案](https://blog.csdn.net/raleway/article/details/104268283)  
- [CSS中的BFC详解](https://www.cnblogs.com/chen-cong/p/7862832.html)  
- [请描述一下BFC、IFC、GFC 和 FFC的区别？](https://zhuanlan.zhihu.com/p/134094372)
- [详解BFC、IFC、GFC、FFC](https://juejin.im/post/6844904117056323597)