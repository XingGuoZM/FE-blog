import { useState, useRef } from "react";

function useMarquee({ data, listRef, wrapRef }) {
  const [transform, setTransform] = useState("");
  const [transition, setTransition] = useState();
  const durationRef = useRef();
  const delayRef = useRef();
  const countRef = useRef(0);
  const move = (duration) => {
    const height = listRef.current.children[0].offsetHeight;
    setTransform(`translateY(-${height}px)`);
    setTransition(`transform ${duration / 1000}s`);
    countRef.current += 1;
  };
  const reset = () => {
    setTransform("translateY(0px)");
    setTransition("none");
  };
  const start = (delay, duration) => {
    const viewHeight = wrapRef.current.offsetHeight;
    const itemHeight = listRef.current.children[0].offsetHeight;
    const num = Math.floor(viewHeight / itemHeight) + 1;
    if (countRef.current > data.length - num) {
      return;
    }
    window.clearTimeout(delayRef.current);
    delayRef.current = setTimeout(() => {
      move(duration);
      window.clearTimeout(durationRef.current);
      durationRef.current = setTimeout(reset, duration);
      start(delay, duration);
    }, delay);
  };
  return { start, index: countRef.current, transform, transition };
}

export default useMarquee;
