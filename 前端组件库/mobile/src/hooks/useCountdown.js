import { useRef, useState, useEffect } from 'react';
/**
 * 倒计时
 * @returns
 */

const counter = (ms) => {
  if (ms <= 0)
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    };
  let remainTs = 0;
  const day = Math.floor(ms / 1000 / 3600 / 24);
  remainTs = ms % (24 * 60 * 60 * 1000);
  const hour = Math.floor(remainTs / 60 / 60 / 1000);
  remainTs %= 60 * 60 * 1000;
  const minute = Math.floor(remainTs / 60 / 1000);
  remainTs %= 60 * 1000;
  const second = Math.floor(remainTs / 1000);
  remainTs %= 1000;
  const millisecond = Math.floor(remainTs);
  return {
    day,
    hour,
    minute,
    second,
    millisecond,
  };
};
export default function useCountdown(
  timeRemaining,
  onComplete
) {
  const timer = useRef();
  const [countDownTime, setCountDownTime] = useState(0);
  useEffect(() => {
    count(timeRemaining);

    return () => {
      window.clearTimeout(timer.current);
    };
  }, [timeRemaining]);

  const count = (remainTs) => {
    if (timer.current) window.clearTimeout(timer.current);
    if (remainTs <= 0 && Number(timeRemaining) > 0) {
      window.clearTimeout(timer.current);
      onComplete();
    } else {
      setCountDownTime(remainTs - 1000);
      timer.current = window.setTimeout(() => count(remainTs - 1000), 1000);
    }
  };
  const { day, hour, minute, second, millisecond } = counter(countDownTime);
  return { day, hour, minute, second, millisecond };
}
