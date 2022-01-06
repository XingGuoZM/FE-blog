### 实现思路
1. 通过touchstart、touchmove、touchend组合

### 在线预览
[https://codesandbox.io/s/9gz0k](https://codesandbox.io/s/9gz0k)

### 核心代码
```js
import { useEffect, useState, useRef } from "react";
import "./styles.css";
/***
 * 请在移动端查看
 */
const docWidth = document.documentElement.clientWidth;
const docHeight = document.documentElement.clientHeight;

function TouchFloater() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const touchstartX = useRef(0);
  const touchstartY = useRef(0);
  const floaterRef = useRef();

  useEffect(() => {
    const target = floaterRef.current;
    if (!target) return;
    const { width, height } = target.getBoundingClientRect();

    const touchmove = (e) => {
      const { clientX, clientY } = e.targetTouches[0];
      // 计算横向边界
      if (clientX - touchstartX.current >= docWidth - width) {
        setX(docWidth - width);
      } else if (clientX - touchstartX.current <= 0) {
        setX(0);
      } else {
        setX(clientX - touchstartX.current);
      }
      // 计算纵向边界
      if (clientY - touchstartY.current >= docHeight - height) {
        setY(docHeight - height);
      } else if (clientY - touchstartY.current <= 0) {
        setY(0);
      } else {
        setY(clientY - touchstartY.current);
      }
    };
    const touchend = () => {
      // 移除监听事件
      window.removeEventListener("touchmove", touchmove);
      window.removeEventListener("touchend", touchend);
    };

    const touchstart = (e) => {
      // 阻止冒泡，不影响其他节点
      // 阻止默认事件，移动端ios有默认下拉功能
      e.stopPropagation();
      e.preventDefault();
      const { top, left } = target?.getBoundingClientRect();
      const { clientX, clientY } = e.targetTouches[0];
      // 计算触碰位置在目标节点上的位置
      touchstartX.current = clientX - left;
      touchstartY.current = clientY - top;
      // 触碰之后开始监听移动事件和离开事件
      window.addEventListener("touchmove", touchmove);
      window.addEventListener("touchend", touchend);
    };
    // 监听目标节点刚触碰事件
    target.addEventListener("touchstart", touchstart);
    return () => {
      target.removeEventListener("touchstart", touchstart);
    };
  }, []);
  return (
    <div className="wrap">
      <div
        className="floater"
        ref={floaterRef}
        style={{
          transform: `translate(${x}px,${y}px)`
        }}
      />
    </div>
  );
}

export default TouchFloater;

```