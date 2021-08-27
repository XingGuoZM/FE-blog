import { useEffect, ustate, useRef } from 'react';
import './virtualList.css';
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function VirtualList() {

  useEffect(() => {
    document.querySelector('.wrap').addEventListener('scroll', () => {
      console.log(11)
    })
  }, [])
  return <div className='wrap'>
    <div className='list'>
      {numbers.map(item => <div className='item' key={item}>{item}</div>)}
      <div className='endItem'>加载中...</div>
    </div>
  </div>
}

export default VirtualList;