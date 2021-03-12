import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import './index.css';
BScroll.use(Slide);

function Tab(props) {

  useEffect(() => {
    let bs = new BScroll('.tab-wrap', {
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
    <div className='tab-content'>
      <section className='tab'>1</section>
      <section className='tab'>2</section>
      <section className='tab'>3</section>
      <section className='tab'>4</section>
    </div>
  </div>
}

export default Tab;