import { useEffect, useState, useRef } from 'react';
import useSlider from '../hooks/useSlider';
import './carousel.css'
const list = [0, 1, 2, 0];

function Carousel() {
  const listRef = useRef();
  const [start, stop] = useSlider(listRef.current, list, { duration: 1000, delay: 1000, direction: 'row' })
  useEffect(() => {
    start();
  }, []);
  return <div className='wrap'>
    <div className='list' ref={listRef} style={{ width: list.length * 7.5 + 'rem' }}>
      {list.map((item, index) => <div className='item' key={index}>{item}</div>)}
    </div>
  </div>
}
export default Carousel;