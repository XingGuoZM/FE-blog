import { useEffect, useState, useRef } from 'react';
import useTransition from '../hooks/useTransition';
import './horseLamp.css';

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function HorseLamp(props) {
  const listRef = useRef();
  const timerRef = useRef();
  let index = 0;
  const [setTransform, setDisableTransition] =
    useTransition(listRef.current, { duration: 1000, onComplete: () => { } });

  useEffect(() => {
    // start();
    // window.requestAnimationFrame(loop);
    timeout();
  }, []);
  let start;
  function loop(fn, ms) {
    if (!start) start = ms;
    let elapse = ms - start;
    console.log(elapse)
    if (elapse < 1000) {
      window.requestAnimationFrame((ms) => loop(fn, ms));
    } else {
      fn();
    }
  }
  function timeout() {
    const fn = () => {
      if (listRef.current) {
        index++;
        if (index == list.length) {
          setDisableTransition(true);
          setTransform('translateY(0px)');
          index = 0;
        } else {
          setDisableTransition(false);
          setTransform(`translateY(-${index}rem)`);
        }
      }
    }
    window.requestAnimationFrame((ms) => loop(fn, ms))
  }
  return <div className='wrap'>
    <div className='list' ref={listRef}>
      {list.map((item, index) => <div className='item' key={index}>{item}</div>)}
    </div>
  </div>
}

export default HorseLamp;