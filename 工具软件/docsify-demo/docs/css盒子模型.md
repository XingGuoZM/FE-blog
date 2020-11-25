

### 盒子模型  
- 外边距(margin)  
- 边框(border)  
- 内填充(padding)  
- 内容(content)  
盗图一份：

![标准盒模型](https://user-gold-cdn.xitu.io/2020/6/17/172c14a7523ef5c5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)  

### 两种盒子模型：计算宽高的方式不一样  
+ W3C盒模型（标准盒模型） ：chrom、IE9+、(添加doctype)
  - 实际宽度 = 设置宽度（content值） + border值 + padding值  

+ 怪异盒模型(又称ie盒模型)：IE 678 下(不添加doctype) 使用ie盒模型
  - 实际宽度 = 设置宽度（content值）  

例如：一个宽度为200px的div，padding值为20px。  
那么在w3c盒模型下，这个div实际宽度为240px。  
在怪异盒模型下，这个div实际宽度为160px  

### box-sizing  
为了解决标准盒模型和IE盒模型的不同，CSS3增添了盒模型属性box-sizing，content-box(默认)，border-box 让元素维持IE传统盒子模型， inherit 继承 父盒子模型  

### 盒子分类：块级盒子（Block box） 和 内联盒子（Inline box）  
+ 块级盒子 
  - 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
  - 每个盒子都会换行
  - width 和 height 属性可以发挥作用
  - 内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”
+ 内联盒子  
  - 盒子不会产生换行。
  - width 和 height 属性将不起作用。
  - 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
  - 水平方向的内边距、外边距以及边框会被应用而且也会把其他处于 inline 状态的盒子推开。


### 边界塌陷  
块元素的 top 与 bottom 外边距有时会合并（塌陷）为单个外边距（合并后最大的外边距），这样的现象称之为 外边距塌陷

### 参考  
- [MDN 盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)  
- [盒子模型有几种？区别在哪？](https://blog.csdn.net/theaaaheartbeat/article/details/105554592)  
- [2020年前端面试题及答案](https://blog.csdn.net/raleway/article/details/104268283)  
- [CSS layout入门](https://www.cnblogs.com/winter-cn/archive/2012/11/13/2768732.html)