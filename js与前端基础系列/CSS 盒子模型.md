

### 盒子模型  
- 外边距(margin)  
- 边框(border)  
- 内填充(padding)  
- 内容(content)  

### 两种盒子模型
计算宽高的方式不一样  

+ W3C盒模型（标准盒模型） 
  - 实际宽度 = 设置宽度（content值） + border值 + padding值  

+ 怪异盒模型(又称ie盒模型)
  - 实际宽度 = 设置宽度  

例如：一个宽度为200px的div，padding值为20px。  
那么在w3c盒模型下，这个div实际宽度为240px。  
在怪异盒模型下，这个div实际宽度为160px

### 参考  
- [MDN 盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)  
- [盒子模型有几种？区别在哪？](https://blog.csdn.net/theaaaheartbeat/article/details/105554592)  