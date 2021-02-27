import {useEffect} from 'react';
import BetterScroll from 'better-scroll'
import './index.css';


export default function ScrollList() {

  useEffect(()=>{
    
    let bs = new BetterScroll('.wrapper', {
      movable: true,
      zoom: true
    });
    bs.on('scroll',()=>{
      console.log('scroll');
    })
  })

  return <section className='wrapper'>
    <ul className='content'>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </ul>
  </section>
}


