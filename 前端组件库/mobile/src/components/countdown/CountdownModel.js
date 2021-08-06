import { useState, useEffect, useRef } from 'react';

const counter = (ms) => {
  if (ms <= 0) return ms;
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

function _CountDown(props) {
  const timer = useRef();
  const {
    onComplete, // 倒计时结束回调
    timeRemaining, // 倒计时剩余时间,单位为"毫秒"
    Component,
  } = props;
  const [countDownTime, setCountDownTime] = useState(0);

  useEffect(() => {
    count(timeRemaining);
    return () => {
      window.clearTimeout(timer.current);
    };
  }, [timeRemaining]);

  const count = (remainTs) => {
    if (timer.current) window.clearTimeout(timer.current);
    if (remainTs <= 0 && timeRemaining > 0) {
      window.clearTimeout(timer.current);
      onComplete();
    } else {
      setCountDownTime(remainTs - 1000);
      timer.current = window.setTimeout(() => count(remainTs - 1000), 1000);
    }
  };
  return (
    <Component
      getTime={() => counter(countDownTime)}
      timeRemaining={timeRemaining}
    />
  );
}

export default _CountDown;
