import { useEffect, useRef, useState } from 'react';

function Svg2Drag() {
  const dragRef = useRef();
  let active = false;

  useEffect(() => {
    dragRef.current.addEventListener('mousedown', (e) => {
      active = true;
    });
    dragRef.current.addEventListener('mousemove', (e) => {
      if (active) {

      }
    });

    document.body.addEventListener('mouseup', () => {
      active = false;
    });
  });

  return <svg style={{ position: 'absolute', top: '20px', left: '20px', width: '80px', height: '80px' }}>
    <circle
      ref={dragRef}
      cx="40"
      cy="40"
      r="40"
      strokeWidth="1"
      fill="red" />
  </svg>
}

export default Svg2Drag;