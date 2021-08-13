import { useEffect, useState, useRef } from 'react';
import useTransition from '../hooks/useTransition';
import './horseLamp.css';

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function HorseLamp(props) {
  const listRef = useRef();
  const intervalRef = useRef();
  let index = 0;
  const [setTransform, setDisableTransition] = useTransition(listRef.current, { duration: 1000, onComplete });
  function onComplete() { }
  useEffect(() => {
    if (listRef.current) {
      intervalRef.current = setInterval(() => {
        index++;
        if (index == list.length) {
          setDisableTransition(true);
          setTransform('translateY(0px)');
          index = 0;
        } else {
          setTransform(`translateY(-${index}rem)`);
        }

      }, 1000);

    }
  }, []);
  return <div className='wrap'>
    <div className='list' ref={listRef}>
      {list.map((item, index) => <div className='item' key={index}>{item}</div>)}
    </div>
  </div>
}

export default HorseLamp;