
import { useState, useRef, useEffect } from 'react';
import './drag.css';

function Canvas2Drag() {
  const dragRef = useRef();
  let active = false;
  let disx = 0;
  let disy = 0;
  let innerx = 0;
  let innery = 0;

  useEffect(() => {
    const canvas = dragRef.current;
    const ctx = canvas.getContext('2d');
    init(canvas, ctx);
    drawRect(ctx, 0, 0);
  });
  function init(canvas, ctx) {
    canvas.addEventListener('mousedown', (e) => {
      active = true;
      disx = e.clientX - innerx;
      disy = e.clientY - innery;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (active) {
        drawRect(ctx, e.clientX - disx, e.clientY - disy);
        ctx.stroke();
      }
    });
    document.body.addEventListener('mouseup', (e) => {
      active = false;
      innerx = e.clientX - disx;
      innery = e.clientY - disy;
    });

  }
  function drawRect(ctx, x, y) {
    ctx.clearRect(0, 0, 800, 500);
    ctx.fillStyle = "#fcc";
    ctx.fillRect(x, y, 100, 50);
  }

  return <canvas
    ref={dragRef}
    width='800'
    height="500"
    className="canvas-drag" />
}


export default Canvas2Drag;