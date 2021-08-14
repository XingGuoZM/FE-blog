import { useEffect, useState, useRef } from 'react';
/**
 * 过渡动画Hook
 * element<HTMLElement>: 动画目标节点
 * duration<number>: 动画时长,单位毫秒
 * onCompolete<function>: 动画结束时回调
 */
export default function useTransition(element, { duration, onComplete }) {
  const [transform, setTransform] = useState();
  const [disableTransition, setDisableTransition] = useState(false);
  const start = useRef(0);

  // 每次transform变化时开始滚动
  useEffect(() => {
    if (element) {
      element.style.transform = transform;

      element.style.transition = !disableTransition && `transform ${duration / 1000}s`;
    }
    const loop = (timestamp) => {
      if (!start.current) start.current = timestamp;
      const elapsed = timestamp - start.current;
      if (elapsed < duration) {
        window.requestAnimationFrame(loop);
      } else if (element) {
        onComplete && onComplete();
      }
    };
    window.requestAnimationFrame(loop);
  }, [transform, disableTransition]);

  return [setTransform, setDisableTransition];
}
