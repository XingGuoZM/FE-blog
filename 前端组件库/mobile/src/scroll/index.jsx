import { useEffect } from 'react';
import BetterScroll from 'better-scroll'
import './index.css';
/**
 * better-scroll文档
 * https://better-scroll.github.io/docs/zh-CN/
 */

export default function ScrollList() {

  useEffect(() => {
    let bs = new BetterScroll('.wrapper', {
      probeType: 3,
    });
    bs.on('scroll', (pos) => {
      console.log('scroll', pos.x, pos.y);
    })
  });

  return <section className='wrapper'>
    <div className='content'>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  </section>
}


