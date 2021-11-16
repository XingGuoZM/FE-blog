import { useEffect, useState, useRef } from 'react';
import './infinateScroll.css';

const defaultPageSize = 10;
let num = 1;
const queryData = (pageNum = 1, pageSize = defaultPageSize) => {
  const numbers = [];
  if (pageNum < 5) {
    for (let i = pageSize * (pageNum - 1); i < pageSize * pageNum; i++) {
      numbers.push(i);
    }
  }
  return new Promise(resolve => setTimeout(() => resolve(numbers), 1000));
}

function InfinateScroll() {
  const wrapRef = useRef();
  const listRef = useRef();
  const endItemRef = useRef();
  const [list, setList] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const getData = async (pageNum) => {
    const res = await queryData(pageNum);
    if (res.length < defaultPageSize) {
      setIsEnd(true);
    }
    setList((value) => value.concat(res));
  }
  useEffect(() => {
    getData();
    wrapRef.current.addEventListener('scroll', () => {
      const endRect = endItemRef.current.getBoundingClientRect();
      const wrapRect = wrapRef.current.getBoundingClientRect();
      if (endRect.top + endRect.height <= wrapRect.height) {
        getData(++num);
      }
    });
  }, []);

  return <div className='wrap' ref={wrapRef}>
    <div className='list' ref={listRef}>
      {list?.map((item, index) => <div className='item' key={index}>{item}</div>)}
      <div className='endItem' ref={endItemRef}>{isEnd ? '到底了~' : '加载中...'}</div>
    </div>
  </div>
}

export default InfinateScroll;