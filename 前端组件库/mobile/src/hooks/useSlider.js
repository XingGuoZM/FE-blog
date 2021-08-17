import { useEffect, useState, useRef } from 'react';
import useTransition from './useTransition';

export default function useMarquee(element, list, { duration, delay, direction }) {
  const timerRef = useRef();
  const [isStart, setIsStart] = useState(false);
  const [setTransform, setDisableTransition] = useTransition(element, { duration, onComplete: () => { } });
  useEffect(() => {
    if (isStart) {
      start();
    }
  }, [isStart]);
  const loop = (index) => {
    const len = list.length;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    // 当滚动至最后一项时，发生瞬间移动，从0开始
    if (element && len > 0) {
      index++;
      const height = element.clientHeight;
      const width = element.clientWidth;
      timerRef.current = window.setTimeout(
        () => {
          if (index === len) {
            setDisableTransition(true);
            index = 0;
          } else {
            setDisableTransition(false);
          }
          if (direction === 'row') {
            setTransform(`translateX(-${(index * width) / len}px)`);
          } else {
            setTransform(`translateY(-${(index * height) / len}px)`);
          }

          loop(index);
        },
        index === len ? duration : delay
      );
    }
  };
  const start = () => {
    setIsStart(true);
    loop(0);
  }
  const stop = () => {
    window.clearInterval(timerRef.current);
    setIsStart(false);
  }

  return [start, stop];
}
