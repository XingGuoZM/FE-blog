import { useEffect, useState, useRef } from 'react';
import useTransition from './useTransition';

export default function useMarquee(element,list, index) {
  const intervalRef = useRef();
  const [isStart,setIsStart] = useState(false);
  const [setTransform, setDisableTransition] = useTransition(element, { duration: 1000, onComplete:()=>{} });
  useEffect(() => {
    if (isStart && element) {
      intervalRef.current = setInterval(() => {
        index++;
        if (index == list.length) {
          setDisableTransition(true);
          setTransform('translateY(0px)');
          index = 0;
        } else {
          setDisableTransition(false);
          setTransform(`translateY(-${index}rem)`);
        }
      }, 1000);
    }
  }, [isStart]);
  const start =()=>{
    setIsStart(true);
  }

  return [start];
}
