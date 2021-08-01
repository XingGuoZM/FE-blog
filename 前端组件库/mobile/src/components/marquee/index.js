import {createElement,useEffect,} from 'react';
import './index.css';

function Marquee(props){
  const {data}=props;
  return <div className='marquee-wrap'>
    <div className='marquee-content'>
      <div className='marquee-item' style={{backgroundColor:'#ff2'}}></div>
      <div className='marquee-item' style={{backgroundColor:'#22f'}}></div>
    </div>
  </div>
}
export default Marquee;