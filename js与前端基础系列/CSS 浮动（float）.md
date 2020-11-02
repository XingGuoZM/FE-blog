## 浮动释义  
浮动元素脱离文档流，不占据空间。浮动元素碰到包含它的边框或者浮动元素的边框停留。  

## 使用
float值
- left：表明元素必须浮动在其所在的块容器左侧的关键字。
- right：表明元素必须浮动在其所在的块容器右侧的关键字。
- none：表明元素不进行浮动的关键字。
- inline-start：关键字，表明元素必须浮动在其所在块容器的开始一侧，在ltr脚本中是左侧，在rtl脚本中是右侧。
- inline-end：关键字，表明元素必须浮动在其所在块容器的结束一侧，在ltr脚本中是右侧，在rtl脚本中是左侧。

```css
float:left;
```

## 示例

## 问题汇总（FAQ）

## 清除浮动的方法  
1. 使用空标签清除浮动。

这种方法是在所有浮动标签后面添加一个空标签 定义css clear:both. 弊端就是增加了无意义标签。

2. 使用after伪对象清除浮动

该方法只适用于非IE浏览器。具体写法可参照以下示例。使用中需注意以下几点。一、该方法中必须为需要清除浮动元素的伪对象中设置 height:0，否则该元素会比实际高出若干像素；
```css
  #parent:after{
　　content:".";
　　height:0;
　　visibility:hidden;
　　display:block;
　　clear:both;
　}
```
3. 设置overflow为hidden或者auto
4. 浮动外部元素

### 参考  
- [2020年前端面试题及答案](https://blog.csdn.net/raleway/article/details/104268283)  
- [MDN文档 float](https://developer.mozilla.org/zh-CN/docs/CSS/float)