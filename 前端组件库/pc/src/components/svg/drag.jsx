import { useEffect, useRef, useState } from 'react';
import './drag.css';

function Svg2Drag() {
  const dragRef = useRef();
  const svgRef = useRef();
  let active = false;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  // const [innerX, setInnerX] = useState(0);
  // const [innerY, setInnerY] = useState(0);
  let innerX = 0, innerY = 0;

  useEffect(() => {
    const drag = dragRef.current.getBoundingClientRect();
    const svg = svgRef.current.getBoundingClientRect();

    dragRef.current.addEventListener('mousedown', (e) => {
      active = true;
      innerX = e.clientX - drag.left;
      innerY = e.clientY - drag.top;
      console.log(e.clientX, drag);
    });
    svgRef.current.addEventListener('mousemove', (e) => {
      if (active &&
        e.clientX >= innerX &&
        e.clientY >= innerY &&
        e.clientX <= svg.width - drag.width + innerX &&
        e.clientY <= svg.height - drag.height + innerY) {

        setX(e.clientX - innerX);
        setY(e.clientY - innerY);
      }
    });

    document.body.addEventListener('mouseup', (e) => {
      active = false;

    });
  }, []);

  return <svg className='svg-wrap' ref={svgRef}>
    {/* <circle
      ref={dragRef}
      cx={x}
      cy={y}
      r="40"
      strokeWidth="1"
      fill="red" /> */}
    <rect
      ref={dragRef}
      width="50"
      height="50"
      x={x}
      y={y}
      style={{
        fill: 'red',
        strokeWidth: '1'
      }} />
  </svg>
}

export default Svg2Drag;