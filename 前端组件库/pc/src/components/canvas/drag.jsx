import {useState,useEffect} from 'react';
import './drag.css';

function Canvas2Drag(){
  const [startX,setStartX] = useState();

  useEffect(()=>{
    const ctx = init();
    // drawLine(ctx);
    window.requestAnimationFrame(drawLine(ctx))
    // drawRectangle(ctx);
    drawRound(ctx);
  });

  function init(){
    const canvas = document.querySelector('#myCanvas');
    return  canvas.getContext('2d');
    
  }

  function drawLine(ctx){
    let time = new Date();
    console.log(time.getSeconds())
    if(time.getSeconds()>55) return;
    ctx.moveTo(10*time.getSeconds(),50*time.getSeconds());
    ctx.lineTo(10*time.getSeconds(),10*time.getSeconds());

    ctx.stroke();

    window.requestAnimationFrame(drawLine(ctx))
  }

  function drawRectangle(ctx){
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (20, 20, 100, 100);
  }

  function drawRound(ctx){
    ctx.beginPath();
    ctx.arc(100,75,50,0,2*Math.PI);
    ctx.fillStyle='#c2c';
    ctx.fill();
  }

  return <canvas id='myCanvas' width="800px" height="500px" className="wrap"/>
}


export default Canvas2Drag;