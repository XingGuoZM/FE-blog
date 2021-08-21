import { useEffect, useState, useRef } from 'react';
import useAnimate from './useAnimate';

export default function useMarquee(parentElement, element, { duration }) {
  const timerRef = useRef();
  // const [isStart, setIsStart] = useState(false);
  const [setStart] = useAnimate(element, [
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-100px)' }
  ], {
    duration: 1000,
    iterations: Infinity
  });
  useEffect(() => {
    setStart(true)
  }, []);
  const start = () => {
    // setIsStart(true);
  }

  return [start];
}
