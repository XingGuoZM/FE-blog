import { useEffect, useState, useRef } from 'react';
import useAnimate from '../hooks/useAnimate';
import './speard.css';

function Spread() {
  const contentRef = useRef();
  const item1Ref = useRef();
  const item2Ref = useRef();
  const item3Ref = useRef();
  const item4Ref = useRef();
  const item1 = useAnimate(item1Ref.current, () => { console.log('complete') });
  const item2 = useAnimate(item2Ref.current);
  const item3 = useAnimate(item3Ref.current);
  const item4 = useAnimate(item4Ref.current);
  useEffect(() => {

  }, []);
  const start = () => {
    const options = {
      duration: 1000,
      iterations: 1,
      // fill: 'forwards',
    }
    item1.setKeyframes([
      { transform: 'translate(0) scale(0.5)' },
      { transform: 'translate(-100px,-100px) scale(1)' },
    ]);
    item2.setKeyframes([
      { transform: 'translate(0) scale(0.5)' },
      { transform: 'translate(100px,-100px) scale(1)' }
    ]);
    item3.setKeyframes([
      { transform: 'translate(0) scale(0.5)' },
      { transform: 'translate(100px,100px) scale(1)' }
    ]);
    item4.setKeyframes([
      { transform: 'translate(0) scale(0.5)' },
      { transform: 'translate(-100px,100px) scale(1)' }
    ]);
    item1.setOptions(options);
    item2.setOptions(options);
    item3.setOptions(options);
    item4.setOptions(options);
  }
  return <div className='wrap' onClick={start}>
    <div className='content' ref={contentRef}>
      <div className='item' ref={item1Ref} />
      <div className='item' ref={item2Ref} />
      <div className='item' ref={item3Ref} />
      <div className='item' ref={item4Ref} />

    </div>
  </div>
}
export default Spread;