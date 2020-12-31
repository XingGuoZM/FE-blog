const myCanvas = document.querySelector('#myCanvas');
const ctx = myCanvas.getContext('2d');

const rect = myCanvas.getBoundingClientRect();

function draw(){
  myCanvas.onmousedown=function(e){
    ctx.moveTo(e.clientX,e.clientY);
    myCanvas.onmousemove = function(ev){
      ctx.lineTo(ev.clientX,ev.clientY);
      ctx.stroke();
    }
    myCanvas.onmouseup = function(e){
      myCanvas.onmousemove=null;
    }
  }
}
draw();

