import { useEffect, useState, useRef } from 'react';
/**
 * 帧动画Hook
 * element<HTMLElement>: 动画目标节点
 * duration<number>: 动画时长,单位毫秒
 * onCompolete<function>: 动画结束时回调
 */
export default function useTransition(element, keyframes, options) {
  const [start, setStart] = useState();
  useEffect(() => {
    if (element) {
      element.animate(keyframes, options);
    }
  }, [start]);

  return [setStart];
}
