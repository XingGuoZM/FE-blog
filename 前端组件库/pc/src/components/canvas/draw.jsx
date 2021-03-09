import { useState, useRef, useEffect } from 'react';
import './draw.css';

function Canvas2Draw() {
  const drawRef = useRef();
  let active = false;


  useEffect(() => {
    const canvas = drawRef.current;
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', (e) => {
      active = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (active) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
      }
    });
    document.body.addEventListener('mouseup', (e) => {
      active = false;
    });
  });

  return <canvas ref={drawRef}
    id='myCanvas'
    width='800'
    height="500"
    className="wrap" />
}

export default Canvas2Draw;