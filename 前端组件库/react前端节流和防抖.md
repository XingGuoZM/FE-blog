### 实现思路
自定义hooks+setTimeout组合，基本实现很简单，只要理解了节流和防抖是什么就很容易实现了。防抖和节流都是对高频触发的事件来做的一种应对手段，我认为它们最本质的区别是是否需要对最终的结果负责，比如防抖的目的即是为了拿到最终的结果，所以前面不管触发多少次，我们都可以不管，只等到它不再触发了才做最后的处理。而节流是对相同事件的触发频率的控制，它触发的次数不会造成不同的结果。

### 在线预览
[https://codesandbox.io/s/usehooks-vki3p](https://codesandbox.io/s/usehooks-vki3p)

### 核心代码
useThrottle
```js
import { useCallback, useRef } from "react";

export default function useThrottle(fn, delay) {
  const timer = useRef(-1);
  const throttle = useCallback(() => {
    if (timer.current > -1) {
      return;
    }
    timer.current = setTimeout(() => {
      fn();
      timer.current = -1;
      clearTimeout(timer.current);
    }, delay);
  }, [fn, delay]);
  return throttle;
}
```
useDebounce
```js
import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

```

