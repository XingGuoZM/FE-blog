import { useEffect, useState } from 'react';
let timer = 0;
export default function CountDown(props) {
  const { remainTs, onComplete } = props;
  const [countDownTime, setCountDownTime] = useState(0);
  useEffect(() => {
    count(remainTs);
    return () => {
      window.clearTimeout(timer);
    };
  }, [remainTs]);
  const count = (remainTs) => {
    if (timer) window.clearTimeout(timer);
    setCountDownTime(remainTs - 1000);
    if (remainTs <= 0) {
      window.clearTimeout(timer);
      onComplete();
    } else {
      timer = window.setTimeout(() => count(remainTs - 1000), 1000);
    }
  };
  const castToString = (v) => (v < 10 ? `0${v}` : String(v));
  const counter = (ms) => {
    let minuteText = '';
    let secondText = '';
    const second = Math.floor((ms % 60000) / 1000);
    const minute = Math.floor(ms / 60000);
    if (minute >= 0) {
      minuteText = castToString(minute);
    }
    if (second >= 0) {
      secondText = castToString(second);
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