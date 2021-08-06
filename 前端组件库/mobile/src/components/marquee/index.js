import { createElement, useEffect, useState, useRef } from 'react';
import './index.css';

let num = 0;
function Marquee(props) {
  const { data } = props;
  const [percent, setPercent] = useState(0);
  const [cashe, setCashe] = useState([]);
  const timerRef = useRef();

  useEffect(() => {
    start();
  }, []);
  function start() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (num % data.length === data.length - 1) {
      setTimeout(() => {
        setPercent(0);
        // console.log(num % data.length)
        console.log(data.length)
        // setCashe([data[data.length - 1], data[data.length], data[data.length + 2]])
        start();
        num++;
      }, 500);
    } else {
      window.setTimeout(() => {
        setPercent(num % data.length / data.length);
        start();
        num++;
      }, 1000)
    }
  }
  return <div className='marquee-wrap'>
    <div className='marquee-content'
      style={{
        transform: `translateY(${-percent * 100}%)`,
        transition: num % 3 === 0 ? 'none' : 'transform 0.5s ease'
      }}>
      <div className='marquee-item' style={{ backgroundColor: '#ff2', fontSize: '0.1rem' }}></div>
      <div className='marquee-item' style={{ backgroundColor: '#22f', fontSize: '0.1rem' }}></div>
      <div className='marquee-item' style={{ backgroundColor: '#ff2', fontSize: '0.1rem' }}></div>
    </div>
  </div>
}
export default Marquee;