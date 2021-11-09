import { useEffect, useState, useRef } from 'react';
import useSlider from '../hooks/useSlider';
import './horseLamp.css';

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function HorseLamp(props) {
  const listRef = useRef();
  const [start] = useSlider(listRef.current, list, { duration: 1000, delay: 1000, direction: 'column' });
  useEffect(() => {
    start();
  }, []);

  return <div className='wrap'>
    <div className='list' ref={listRef}>
      {list.map((item, index) => <div className='item' key={index}>{item}</div>)}
    </div>
  </div>
}

export default HorseLamp;