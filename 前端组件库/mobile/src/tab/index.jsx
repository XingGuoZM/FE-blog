import { useEffect, useState } from 'react';
import BetterScroll from 'better-scroll'
import './index.css';

function Tab() {
  useEffect(() => {
    let bs = new BetterScroll('.tab-wrap', {
      probeType: 3,
      scrollX: true
    });
    bs.on('scroll', (e) => {
      console.log('scroll')
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