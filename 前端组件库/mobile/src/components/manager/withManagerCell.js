import { forwardRef, useRef, useImperativeHandle } from "react";

export default function withMangerCell(WrapperComponent, manager) {
  function WidthManger(props, ref) {
    const _ref = useRef();
    const touchstartHandler = () => {
      manager.add(_ref);
    };
    const touchendHandler = () => {
      manager.remove(_ref);
    };
    useImperativeHandle(ref, () => {
      return _ref.current;
    });
    return (
      <div
        ref={_ref}
        onTouchStart={touchstartHandler}
        onTouchEnd={touchendHandler}
      >
        <WrapperComponent {...props} />
      </div>
    );
  }

  return forwardRef(WidthManger);
}
