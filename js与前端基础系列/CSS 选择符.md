### CSS 选择符有哪些？及优先级  
- id选择器（ # myid）  
- 类选择器（.myclassname）
- 标签选择器（div, h1, p）  
- 相邻选择器（h1 + p）  
- 子选择器（ul > li）  
- 后代选择器（li a）  
- 通配符选择器（ * ）  
- 属性选择器（a[rel = "external"]）  
- 伪类选择器（a: hover, li:nth-child）  

 优先级：
  !important > id > class > tag
  !important > 内联 > id  

### CSS3新增伪类  
- p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
- p:last-of-type 选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
- p:only-of-type 选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
- p:only-child 选择属于其父元素的唯一子元素的每个 <p> 元素。
- p:nth-child(2) 选择属于其父元素的第二个子元素的每个 <p> 元素。
- :enabled :disabled 控制表单控件的禁用状态。
- :checked 单选框或复选框被选中。  

### 参考  
- [2020年前端面试题及答案](https://blog.csdn.net/raleway/article/details/104268283)  