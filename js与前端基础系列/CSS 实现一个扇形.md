
今天晚上面试被问到用canvas实现一个扇形，现在就来总结一下前端实现一个扇形的几种方式  
源文件地址：[实现一个扇形](https://github.com/XingGuoZM/blog/blob/master/%E9%80%A0%E8%BD%AE%E5%AD%90/triangle.html)

## 代码实现
### 方法1. border-radius
HTML
```html
  <div class="sector1"></div>
```

CSS
```css
  width: 100px;
  height: 100px;
  border-top-left-radius: 100px;
  background-color: aquamarine;
```
### 方法2. canvas + arc
HTML
```html
  <canvas id="sector2" class="sector2"></canvas>
```
CSS
```css
  width: 200px;
  height: 100px;
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

## 效果展示

![](https://img2020.cnblogs.com/blog/1347757/202010/1347757-20201021222805532-1733620340.png)
