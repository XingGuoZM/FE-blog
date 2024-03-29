### 实现思路
setTimeout + 递归，然后就是一个时间的转化。
特别要注意在特定的地方清除定时器

### 在线预览
[react倒计时hooks](https://codesandbox.io/s/usehooks-vki3p?file=/src/useCountdown.js)

### 核心代码
```js
import { useRef, useState, useEffect } from "react";

const formatMoment = (ms, type = "DD HH:mm:ss") => {
  if (ms <= 0)
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    };
  let remainTs = ms;
  let day = 0;
  if (type.indexOf("DD") !== -1) {
    day = Math.floor(ms / 1000 / 3600 / 24);
    remainTs = ms % (24 * 60 * 60 * 1000);
  }
  const hour = Math.floor(remainTs / 60 / 60 / 1000);
  remainTs %= 60 * 60 * 1000;
  const minute = Math.floor(remainTs / 60 / 1000);
  remainTs %= 60 * 1000;
  const second = Math.floor(remainTs / 1000);

  return {
    day,
    hour,
    minute,
    second
  };
};
/**
 * timeRemaining:剩余时间的时间戳
 * onComplete:倒计时结束的回调
 */
export default function useCountdown(timeRemaining, onComplete) {
  const cancelToken = useRef(false);
  const timer = useRef();
  const [countDownTime, setCountDownTime] = useState(0);
  useEffect(
    () => () => {
      cancelToken.current = true;
    },
    []
  );

  useEffect(() => {
    count(timeRemaining);

    return () => {
      window.clearTimeout(timer.current);
    };
  }, [timeRemaining]);

  const count = (remainTs) => {
    if (timer.current) window.clearTimeout(timer.current);
    if (cancelToken.current) return;
    if (remainTs <= 0 && Number(timeRemaining) > 0) {
      window.clearTimeout(timer.current);
      onComplete();
    } else {
      setCountDownTime(remainTs - 1000);
      timer.current = window.setTimeout(() => count(remainTs - 1000), 1000);
    }
  };
  const { day, hour, minute, second } = formatMoment(countDownTime);
  return { day, hour, minute, second };
}

```
