import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import Panel from './Panel';
import Nav from './Nav';
import './index.css';
BScroll.use(Slide);

function Tab(props) {

  useEffect(() => {
    let bs = new BScroll('.tab-panel', {
      scrollX: true,
      scrollY: false,
      slide: {
        autoplay: false,
        loop: false
      },
      momentum: false,
      bounce: false,
      probeType: 3
    });
    bs.on('slideWillChange', (page) => {
      // 即将要切换的页面
      console.log(page.pageX, page.pageY)
    })
  });
  return <div className='tab-wrap'>
    <Nav />
    <div className='tab-panel'>
      <div className='tab-panel-content'>
        {[1, 2, 3, 4].map(item => <Panel index={item} key={item} />)}
      </div>
    </div>
  </div>
}

export default Tab;