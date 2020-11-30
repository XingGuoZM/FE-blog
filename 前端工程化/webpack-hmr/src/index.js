import _ from 'lodash';
import print from './print';

function component(){
  const element = document.createElement('div');
  const btn = document.createElement('button');
  btn.onclick= print;
  btn.innerHTML='click Mes';
  element.appendChild(btn)
  
  return element;
}

document.body.appendChild(component());
if(module.hot){
  module.hot.accept('./print.js',()=>{
    console.log('Accepting the updated print module');
    print();
  })
}