import { useEffect, useState, useRef } from 'react';
import useScroll from '../hooks/useScroll';
import './infinateScroll.css';
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

function InfinateScroll() {
  const wrapRef = useRef();
  const listRef = useRef();
  const [start, stop] = useScroll(wrapRef.current, listRef.current, { duration: 3000 })
  useEffect(() => {
    start();
  }, []);
  return <div className='wrap' ref={wrapRef}>
    <div className='list' ref={listRef}>
      {numbers.map((item, index) => <div className='item' key={index}>{item}</div>)}
    </div>
  </div>
}

export default InfinateScroll;