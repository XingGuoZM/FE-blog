import { useEffect, useState, useRef } from 'react';
import './infinateScroll.css';
/**
 * 构造一个滑动窗口，
 * 该窗口包含两页数据dom节点，
 * 每次滑动到第二页最底部的时候，
 * 使用transform:translateY来瞬间移动列表至第一页的底部，
 * 同时数据必须同步更新，来达到列表在更新滚动的效果
 */
const defaultPageSize = 10;
let num = 1;
const queryData = (pageNum = 1, pageSize = defaultPageSize) => {
  const numbers = [];
  if (pageNum < 5) {
    for (let i = pageSize * (pageNum - 1); i < pageSize * pageNum; i++) {
      numbers.push(i);
    }
  }
  return new Promise(resolve => setTimeout(() => resolve(numbers), 5000));
}
const casheData=[
  [1,2,3,4,5,6,7,8,9,10],
  [6,7,8,9,10,11,12,13,14,15],
  [11,12,13,14,15, 16,17,18,19,20],
];
function InfinateScroll() {
  const wrapRef = useRef();
  const listRef = useRef();
  const endItemRef = useRef();
  const [list, setList] = useState([1,2,3,4,5,6,7,8,9]);
  const [isEnd, setIsEnd] = useState(false);
  const[y,setY]=useState(0);
  const getData = async (pageNum) => {
    const res = await queryData(pageNum);
    if (res.length < defaultPageSize) {
      setIsEnd(true);
    }
    setList((value) => value.concat(res));
  }
  useEffect(() => {
    // getData();
    const itemHeight = listRef.current?.children[0].offsetHeight;
    wrapRef.current.addEventListener('scroll', (e) => {
      const endRect = endItemRef.current.getBoundingClientRect();
      const wrapRect = wrapRef.current.getBoundingClientRect();
      if (endRect.top + endRect.height <= wrapRect.height) {
        // getData(++num);
        ++num;
        setY((value)=>value+itemHeight*5);
      }
    });
  }, [listRef.current]);

  return <div className='wrap' ref={wrapRef}>
    <div className='list' ref={listRef} style={{transform:`translateY(${y}px)`}}>
      {list.map((item, index) => <div className='item' key={index}>{casheData[num-1][item-1]}</div>)}
      <div className='endItem' ref={endItemRef}>{isEnd ? '到底了~' : '加载中...'}</div>
    </div>

  </div>
}

export default InfinateScroll;