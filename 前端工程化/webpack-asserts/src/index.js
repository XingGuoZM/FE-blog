import './index.css';
import img from'./1.png'

function component(){
  const element = document.createElement('div');
  element.innerHTML = '资源配置';
  element.classList.add('hello');

  // 插入图片
  const myImg = new Image();
  myImg.src=img;
  element.appendChild(myImg);
  
  return element;
}
document.body.appendChild(component());