/**
 * 节流
 * @param fn
 * @param time
 */
export default function throttle(fn, time) {
  let lastTime = 0;
  return function (...args) {
    const nowTime = +new Date();
    if (!lastTime || nowTime - lastTime > time) {
      fn(...args);
      lastTime = nowTime;
    }
  };
}