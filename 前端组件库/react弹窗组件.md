### 实现思路
1. 多个弹窗的管理
2. 关闭弹窗之后，真实dom是否存在
3. 打开弹窗之后，事件穿透问题
4. 弹窗的打开和关闭的转场动画

### 在线预览
[react弹窗](https://codesandbox.io/s/modal-8yvls)

### 核心代码
```js
import { useEffect, useState, useRef } from "react";
import "./Modal.css";

export default function Modal({ visible, onClose, children }) {
  const [show, setShow] = useState(false);
  const modalRef = useRef();
  const open = () => {
    setShow(true);
  };
  const close = () => {
    setShow(false);
    onClose();
  };
  useEffect(() => {
    if (visible !== show) {
      visible ? open() : close();
    } else if (visible) {
      open();
    }
  }, [visible]);
  return (
    <div
      className="modal"
      ref={modalRef}
      style={{
        visibility: show ? "visible" : "hidden",
        height: show ? "auto" : 0
      }}
    >
      <div className="modal-mask" onClick={close}></div>
      <div className="modal-content">{children}</div>
    </div>
  );
}
```
