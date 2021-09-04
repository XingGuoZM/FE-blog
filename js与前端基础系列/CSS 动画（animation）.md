 

## 简介  
动画，需配合@keyframes使用，可灵活自定义动画帧。

- animation-name
- animation-duration
- animation-timing-function
- animation-delay
- animation-iteration-count
- animation-direction
- animation-fill-mode 
- animation-play-state

## 常见动画实现汇总
1. 平移（弹跳，抖动）
2. 缩放（呼吸）
3. 旋转（佛光）
4. 翻折（翻牌子）
5. 抛物线（撒花）
6. 闪光

## 扩展
- 实现动画的几种方式  
  1. requestAnimationFrame  
  2. setTimeout  
  3. setInterval  
  4. CSS @keyframes  
  5. canvas + requestAnimation
  6. transition
- js操作keyframe动画  
```js
const getkeyframes=(name)=> {
  var animation = {};
  // 获取所有的style
  let ss = document.styleSheets;
  for (let item of ss) {
    // const item = ss[i];
    if (item.cssRules[0] && item.cssRules[0].name && item.cssRules[0].name === name) {
      animation.cssRule = item.cssRules[0];
      animation.styleSheet = item;
      animation.index = 0;
    }
  }
  return animation;
}
const setKeyframes=(keyFrames)=>{

  const runkeyframes =keyFrames
  // 创建style标签
  const style = document.createElement('style');
  // 设置style属性
  style.type = 'text/css';
  // 将 keyframes样式写入style内
  style.innerHTML = runkeyframes;
  // 将style样式存放到head标签
  let head=document.getElementsByTagName('head')[0]
  if(document.querySelectorAll('style').length>2){
    head.replaceChild(style,head.lastElementChild);
  }else{
    head.appendChild(style)
  }

}
const removeKeyframes=function(){
  let head=document.getElementsByTagName('head')[0]
  head.removeChild(head.lastElementChild)
}
```
## element animate
js也能使用animate来做帧动画，

## 问题汇总（FAQ）
- js如何操作keyframe？
element animate函数



## 参考  
- [MDN animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)  