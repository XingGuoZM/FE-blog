
最近面试有被问到如何实现一个三角形，借此机会总结一下，将常用的几种方法梳理一遍。
源文件地址：[创建一个三角形](https://github.com/XingGuoZM/blog/blob/master/%E9%80%A0%E8%BD%AE%E5%AD%90/triangle.html)
### 绘制三角形的几种方法汇总

1. transform rotateZ(45deg) + 父子divoverflow：hidden
HTML
```html
    <div class='triangle1-wrap'>
        <div class='triangle1'></div>
    </div>
```

CSS
```css
    .triangle1-wrap{
        width:50px;
        height:50px;
        overflow:hidden;
    }
    .triangle1{
        width:50px;
        height:50px;
        background-color:red;
        transform:rotateZ(45deg);
        margin-top:35px;
    }
```

2. 设置border
HTML
```html
    <div class='triangle2'></div>
```

CSS
```css
    .triangle2{
        width:0px;
        height:0px;
        border-top:solid 50px red;
        border-bottom:solid 50px transparent;
        border-left:solid 50px transparent;
        border-right:solid 50px transparent;
    }
```

3. canvas

HTMl
```html
    <canvas id='triangle3' width='50' height='50'></canvas>
```
JS
```js
    const triangle = document.getElementById('triangle3');
    const ctx = triangle.getContext('2d');
    //填充三角形（等边）
    ctx.beginPath();
    ctx.moveTo(50,0);
    ctx.lineTo(0,50);
    ctx.lineTo(50,50); 
    ctx.fillStyle='aqua';
    ctx.fill(); 
```
4. svg
HTML
```html
    <svg class='triangle4'>
        <path name="三角形" fill="green" d="M50 0 L0 50 L50 50  Z"/>
    </svg>
```
CSS
```css
    .triangle4{
        width:50px;
    }
```

5. 渐变
HTML
```html
    <div class="triangle5"></div>
```
CSS
```css
    .triangle5{
        width: 50px;
        height:50px;
        background-image:linear-gradient(45deg,#fff 50%, #2980B9 0);
    }
```
6. 伪类
HTML
```html
    <div class="triangle6"></div>
```
CSS
```css
    .triangle6{
        width:50px;
        height:50px;
        position: relative;
        overflow:hidden;
    }
    .triangle6:after{
        content: "";
        width: 50px;
        height: 50px;
        background-color:brown;
        transform: rotate(45deg);
        position: absolute;
        left: 35px;
        top: 0px;
    }
```

7. background-image
HTML
```html
    <div class="triangle7"></div>
```
CSS
```css
    .triangle7{
        width:50px;
        height:50px;
        background-image:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602140892677&di=754062cafde7897f9550b7691882b17b&imgtype=0&src=http%3A%2F%2Ftrademark-pics-search.oss-cn-shanghai.aliyuncs.com%2Fsmall%2Ft4517751695000576.jpg');
        background-size:100% 100%;
    }
```
8. 字体
HTML
```html
    <div class="triangle8">▲</div>
```

CSS
```css
    .triangle8{
        font-size:50px;
        color:darkmagenta;
    }
```

### 效果展示

![](https://img2020.cnblogs.com/blog/1347757/202010/1347757-20201008122716490-897347364.png)