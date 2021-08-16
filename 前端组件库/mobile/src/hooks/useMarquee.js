import { useEffect, useState, useRef } from 'react';
import useTransition from './useTransition';
let index=0;
export default function useMarquee(element,list,{duration,delay}) {
  const intervalRef = useRef();
  const [isStart,setIsStart] = useState(false);
  const [setTransform, setDisableTransition] = useTransition(element, { duration, onComplete:()=>{} });
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
      }, delay);
    }
  }, [isStart]);
  const start =()=>{
    setIsStart(true);
  }

  return [start];
}
