import {useState,useEffect} from 'react';
import './drag.css';

function Canvas2Drag(){
  

  useEffect(()=>{
    const ctx = init();
    // drawLine(ctx);
    window.requestAnimationFrame(()=>drawLine(ctx))
    // drawRectangle(ctx);
    drawRound(ctx);
  });

  function init(){
    const canvas = document.querySelector('#myCanvas');
    return  canvas.getContext('2d');
    
  }

  function drawLine(ctx){
    let time = +new Date();
    // console.log(time);
    // if(time.getMilliseconds()>600) return ;

    ctx.clearRect(0,0,500,800);
    ctx.moveTo(time/100000000000,time/100000000000);
    ctx.lineTo(time/10000000000,time/10000000000);

    ctx.stroke();

    window.requestAnimationFrame(()=>drawLine(ctx));
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

  return <canvas id='myCanvas' width="800" height="500" className="wrap"/>
}


export default Canvas2Drag;