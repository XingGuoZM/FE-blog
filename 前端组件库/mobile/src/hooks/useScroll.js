import { useEffect, useState } from 'react';
import useTransition from './useTransition';

export default function useMarquee(parentElement, element, { duration }) {
  const [isStart, setIsStart] = useState(false);
  const [setTransform, setDisableTransition] = useTransition(element, { duration });
  useEffect(() => {
    if (isStart) {
      start();
    }
  }, [isStart]);
  const loop = () => {
    setTransform(`translateY(0)`);
    setDisableTransition(true);
    window.setInterval(() => {
      if (element && parentElement) {
        const wrapHeight = parentElement.clientHeight;
        const listHeight = element.clientHeight;
        const dis = listHeight - wrapHeight;
        setTransform(`translateY(-${dis}px)`);
        setDisableTransition(false);
      }
    }, duration)

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
