
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



## 参考
- [使用svg的path来绘画扇形](https://blog.51cto.com/xiaoshunzi/2349142)
- [MDN文档 路径](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)