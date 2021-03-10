import {
  useState,
  useEffect,
  useRef
} from 'react';
import './index.css';
/**
 * 拖拽组件实现
 * 1. 拖动效果的实现(onmousedown、onmousemove、onmouseup + translate)
 * 2. 拖动边界的判断
 * 3. 辅助线
 * 
 * 优化点
 * 1. 入参考虑，特别考虑单位问题（px，rem，vw/vh）
 * 2. 
 */

function Dragger(props) {

  const dragRef = useRef(null);
  const { width, height, config } = props;

  const [y, setY] = useState(config.top);
  const [x, setX] = useState(config.left);
  const [innerY, setInnerY] = useState(null);
  const [innerX, setInnerX] = useState(null);
  // const [offsetW, setOffsetW] = useState(null);
  // const [offsetH, setOffsetH] = useState(null);
  const [active, setActive] = useState(false);

  function handleDown(e) {
    const dragger = dragRef.current;
    const ix = e.clientX - dragger.offsetLeft;
    const iy = e.clientY - dragger.offsetTop;
    setActive(true);
    setInnerY(iy);
    setInnerX(ix);
  }
  function handleMove(e) {
    if (active &&
      e.clientX >= innerX &&
      e.clientY >= innerY &&
      e.clientX <= width - config.width + innerX &&
      e.clientY <= height - config.height + innerY
    ) {
      setY(e.clientY - innerY);
      setX(e.clientX - innerX);
    }
  }
  function handleUp(e) {
    setActive(false);
  }

  useEffect(() => {
    // const dragger = dragRef.current;
    // setOffsetW(dragger.offsetWidth);
    // setOffsetH(dragger.offsetHeight);
  }, []);
  return <div className="drag-wrap" onMouseUp={(e) => handleUp(e)}>
    <section
      className="src-wrap"
      style={{
        width: width + 'px',
        height: height + 'px'
      }}
      onMouseMove={(e) => handleMove(e)}>
      <div
        className="dragger"
        ref={dragRef}
        style={{
          width: config.width + 'px',
          height: config.height + 'px',
          backgroundColor: config.backgroundColor,

          position: 'absolute',
          top: y + 'px',
          left: x + 'px'
        }}
        onMouseDown={(e) => handleDown(e)} />
      <span
        className='dragger-line'
        style={{
          display: active ? 'block' : 'none',
          height: height + 'px',
          position: 'absolute',
          left: x + config.width / 2 + 'px'
        }} />
      <span
        className='dragger-line'
        style={{
          display: active ? 'block' : 'none',
          width: width + 'px',
          position: 'absolute',
          top: y + config.height / 2 + 'px'
        }} />
    </section>
  </div>
}

export default Dragger;