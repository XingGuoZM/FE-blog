
今天晚上面试被问到用canvas实现一个扇形，现在就来总结一下前端实现一个扇形的几种方式  
源文件地址：[实现一个扇形](https://github.com/XingGuoZM/blog/blob/master/code/sector.html)

## 代码实现
### 方法1. border-radius
HTML
```html
  <div class="sector1"></div>
```

CSS
```css
  width: 50px;
  height: 50px;
  border-bottom-right-radius: 50px;
  background-color: #110099;
```
### 方法2. canvas + arc
HTML
```html
  <canvas id="sector2" width='200' height='100'></canvas>
```
JS
```js
  const drawSector = function () {
    const ctx = document.querySelector('#sector2').getContext('2d');
    ctx.moveTo(50, 50);
    ctx.arc(50, 50, 50, 0, 90 * Math.PI / 180);
    ctx.lineTo(50, 50);
    ctx.stroke();
  }

  drawSector();
```

### 方法3. svg+path
HTML
```html
  <svg width='200' height='100'>
    <path xmlns="http://www.w3.org/2000/svg" fill="#110099" 
    d="M 50 50 
    A 50 50 90 0 0 50 -50 
    L 50 50  
    Z" />
  </svg>
```

## 效果展示

![](https://img2020.cnblogs.com/blog/1347757/202010/1347757-20201021231854461-978516051.png)

## 深入研究
1. 自定义角度、自定义半径、自定义起始坐标等，封装一个组件，通过传递一个角度画出对应角度的扇形
2. 页面没什么效果，我想加点动画，比如刚进入页面的时候来一段绘制动画，参考[echarts](https://echarts.apache.org/examples/zh/editor.html?c=pie-legend)  
3. 加入交互，鼠标悬浮，点击的回调函数透出
4. 容错处理、异常处理等，局部错误不会阻塞整体绘制
5. 可以做到可视化建图吗？实现思路
6. 比较svg和canvas实现成本与体验效果

## 参考
- [使用svg的path来绘画扇形](https://blog.51cto.com/xiaoshunzi/2349142)
- [MDN文档 路径](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)