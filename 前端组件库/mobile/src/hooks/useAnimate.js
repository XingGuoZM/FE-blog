import { useEffect, useState, useRef } from 'react';
/**
 * 帧动画Hook
 * element<HTMLElement>: 动画目标节点
 * setKeyframes
 * setOptions
 */
export default function useAnimate(element) {
  const [keyframes, setKeyframes] = useState([]);
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (element) {
      element.animate(keyframes, options);
    }
  }, [keyframes, options]);
  return { setKeyframes, setOptions };
}
