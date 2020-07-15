### js操作keyframe动画  
```
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
