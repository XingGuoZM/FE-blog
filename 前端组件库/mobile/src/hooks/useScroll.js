import { useEffect, useState, useRef } from 'react';
import useAnimate from './useAnimate';

export default function useScroll(parentElement, element) {
  const { setKeyframes, setOptions } = useAnimate(element);
  const start = () => {
    setKeyframes([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-50rem)' }
    ]);
    setOptions({
      duration: 5000,
      fill: 'forwards',
      iterations: Infinity
    });
  }
  return [start];
}
