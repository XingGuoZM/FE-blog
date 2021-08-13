import React, { useState, useEffect, useRef } from 'react';
import useTransition from '../hooks/useTransition';
import './scrollAnimation.css';

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
function ScrollAnimation(props) {
  const listRef = useRef();
  const cellRef = useRef();
  const [setTransform] = useTransition(listRef.current, { duration: 1000, onComplete });
  function onComplete() {
    if (listRef.current) {
      listRef.current.style.transition = null;
      listRef.current.style.transform = 'translateY(0px)';
    }
  }
  useEffect(() => {
    if (listRef.current && cellRef.current) {
      const listHeight = listRef.current.clientHeight;
      const cellHeight = cellRef.current.clientHeight;

      setTransform(`translateY(-${listHeight - cellHeight}px)`);
    }
  }, [])
  return <div className='wrap'>
    <div className='list' ref={listRef}>
      {list.map((item, index) => <div ref={cellRef} className='item' key={index}>{item}</div>)}
    </div>
  </div>
}

export default ScrollAnimation;