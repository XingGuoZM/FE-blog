import { useEffect, useState, useRef } from 'react';

export default function CountDown(props) {
  const { remainTs, onComplete } = props;
  const [countDownTime, setCountDownTime] = useState(0);
  const timer = useRef();
  useEffect(() => {
    count(remainTs);
    return () => {
      window.clearTimeout(timer.current);
    };
  }, [remainTs]);
  const count = (remainTs) => {
    if (timer.current) window.clearTimeout(timer.current);
    setCountDownTime(remainTs - 1000);
    if (remainTs <= 0) {
      window.clearTimeout(timer.current);
      onComplete();
    } else {
      timer.current = window.setTimeout(() => count(remainTs - 1000), 1000);
    }
  };

  const counter = (ms) => {
    let minuteText = '';
    let secondText = '';
    const second = Math.floor((ms % 60000) / 1000);
    const minute = Math.floor(ms / 60000);
    if (minute >= 0) {
      minuteText = minute < 10 ? `0${minute}` : String(minute);
    }
    if (second >= 0) {
      secondText = second < 10 ? `0${second}` : String(second);
    }
    return {
      minute: minuteText,
      second: secondText,
    };
  };
  const getCountDownTime = () => {
    if (countDownTime <= 0) return '00:00';
    const { minute = '-', second = '-' } =
      counter(Math.ceil(countDownTime / 1000) * 1000) || {};
    return `${minute}:${second}`;
  };
  return <div>{getCountDownTime()}</div>
}