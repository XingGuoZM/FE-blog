import {useState,useEffect} from 'react';
import './draw.css';


function Draw(){


  useEffect(()=>{
    init();
  });

  function init(){
    const canvas = document.querySelector('#myCanvas');
    const ctx = canvas.getContext('2d');
    
    
    canvas.addEventListener('mousedown',(e)=>{
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;
      ctx.beginPath();
      ctx.moveTo(x,y);
      canvas.addEventListener('mousemove',(e)=>{
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
      });
  
      canvas.addEventListener('mouseup',(e)=>{
        // console.log(12)
        ctx.closePath();
      });
    });

  }

  return <canvas id='myCanvas' width='500' height='500' className="drawWrap"/>
}

export default Draw;