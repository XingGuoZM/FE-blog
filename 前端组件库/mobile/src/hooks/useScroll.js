import { useEffect, useState, useRef } from 'react';
import useTransition from './useTransition';

export default function useMarquee(parentElement, element, { duration }) {
  const [isStart, setIsStart] = useState(false);
  const [setTransform, setTransition] = useTransition(element, { duration });
  const endRef = useRef(false);
  useEffect(() => {
    if (isStart) {
      start();
    }
  }, [isStart]);
  const loop = () => {
    if (element && parentElement) {
      const wrapHeight = parentElement.clientHeight;
      const listHeight = element.clientHeight;
      const dis = listHeight - wrapHeight;
      if (endRef.current) {
        setTransform(`translateY(-${dis}px)`);
        setTransition(`transform ${duration / 1000}s linear 0s`);
        endRef.current = false;
      } else {
        setTransform(`translateY(0px)`);
        setTransition(null);
        endRef.current = true;
      }
      window.setTimeout(() => {
        loop();
      }, endRef.current ? 0 : duration);
    }
  };
  const start = () => {
    setIsStart(true);
    loop();
  }
  const stop = () => {
    setIsStart(false);
  }

  return [start, stop];
}
