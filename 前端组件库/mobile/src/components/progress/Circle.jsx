import { useState, useEffect, useRef } from "react";
// x,y圆弧起始点，在3点钟方向，r圆弧的半径，clockwise顺时针
const defaultConfig = {
  strokeWidth: 10,
  x: 110,
  y: 60,
  r: 50,
  clockwise: 1
};

export default function CircleProgress (props) {
  const { maxTimes, times } = props;

  const { strokeWidth, x, y, r, clockwise } = Object.assign({}, defaultConfig);

  const [percent, setPercent] = useState(0.01);
  const tempPercent = useRef(0.01);

  const drawArcByRadiusDeg = (startX, startY, dr, deg, clockwiseType) => {
    const cw = typeof clockwiseType !== "undefined" ? clockwiseType : 1;
    const dx = startX - dr + dr * Math.cos((deg * Math.PI) / 180);
    const dy =
      startY + (cw === 1 ? 1 : -1) * dr * Math.sin((deg * Math.PI) / 180);
    const bigOrSmall = deg > 180 ? 1 : 0;
    return {
      x: dx,
      y: dy,
      path: `M ${startX} ${startY} A ${dr} ${dr} 0 ${bigOrSmall} ${cw} ${dx} ${dy}`
    };
  };

  useEffect(() => {
    tempPercent.current = percent;
  }, [percent]);

  useEffect(() => {
    const result = Math.round((times / maxTimes) * 100) / 100 || 0.01;
    const step = () => {
      if (tempPercent.current < result) {
        tempPercent.current += 0.01;
        setPercent(tempPercent.current);
        requestAnimationFrame(step);
      } else {
        setPercent(result);
      }
    };
    requestAnimationFrame(step);
  }, [times]);

  return (
      <svg  xmlns="http://www.w3.org/2000/svg" width='120px' height="120px">
        <defs>
          <linearGradient id="bgLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="progressLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="blue" />
            <stop offset="1" stopColor="red" />
          </linearGradient>
        </defs>
        <path
          d={drawArcByRadiusDeg(x, y, r, 359.9999, clockwise).path}
          stroke="#ccc"
          fill="transparent"
          fillOpacity="1"
          strokeWidth={strokeWidth}
        />
        <path
          d={drawArcByRadiusDeg(x, y, r, percent * 359.9999, clockwise).path}
          stroke="blue"
          fill="none"
          fillOpacity="0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
  );
};
