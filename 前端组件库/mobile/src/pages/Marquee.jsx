import { useEffect, useRef } from "react";
import useMarquee from "../hooks/useMarquee";
import "./Marquee.css";
const list = [0, 1, 2];

function Marquee({ data }) {
  const listRef = useRef();
  const wrapRef = useRef();
  const { start, index, transform, transition } = useMarquee({
    data,
    listRef,
    wrapRef
  });

  useEffect(() => {
    start(1000, 500);
  }, []);

  return (
    <div className="list-wrap" ref={wrapRef}>
      <div
        ref={listRef}
        style={{
          transform,
          transition
        }}
      >
        {list.map((item) => (
          <div className="item" key={item}>
            <div className="item-content">{data[index + item]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
