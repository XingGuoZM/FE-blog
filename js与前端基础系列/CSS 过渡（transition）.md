### 简介  
过渡，动画的一种。用户只需定义需要变化的属性，当属性值发生变化时，浏览器会自动进行动画。
- transition-property: 需要过渡的属性
- transition-duration: 过渡的时长
- transition-timing-function: 在一个过渡或动画中一维数值的改变速度，常用关键字
  - linear: 动画会以恒定的速度从初始状态过渡到结束状态
  - ease: 动画的加速度先增后减
  - ease-in: 动画的加速度一直增
  - ease-in-out: 动画加速度先增后减
  - ease-out: 动画加速度一直减，和ease类似，初始加速度比ease小
  - step-start: 动画会立刻跳转到结束状态，并一直停留在结束状态直到动画结束
  - step-end: 动画会一直保持初始状态直到动画结束，然后立刻跳转到结束状态
- transition-delay: 在过渡效果开始作用之前需要等待的时间

## 示例
```html
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8'/>
    <title>trasition 渐变</title>
    <style>
      .wrap{
        width:100px;
        height:50px;
        background-color: darkseagreen;
        transition: background-color 1s ease-out;
      }
    </style>
  </head>
  <body>
    <div class="wrap"></div>

    <script>
      window.onload=function(){
        document.querySelector('.wrap').style.backgroundColor='#000'
      }
    </script>
  </body>
</html>
```
### 过渡动画优缺点
- 无法绘制细腻的动画，适合做简单动效
- 无需关心具体的动画帧，简单
- 

## 问题汇总（FAQ）


### 参考  
- [MDN transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)  
- [MDN transition-property](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property)
- [MDN transition-duration](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration)
- [MDN transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)
- [timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function)
- [MDN transition-delay](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay)
- [CSS-TRICKS transition](https://css-tricks.com/almanac/properties/t/transition/)
