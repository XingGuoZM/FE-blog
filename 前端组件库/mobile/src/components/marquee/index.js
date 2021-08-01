import {createElement,useEffect,useState,useRef} from 'react';
import './index.css';

let num =0;
function Marquee(props){
  const {data}=props;
  const [percent,setPercent] = useState(0);
  const timerRef = useRef();

  useEffect(()=>{
    start();
  },[]);
  function start(){
    if(timerRef.current) window.clearTimeout(timerRef.current);
    if(num%3===2){
      setTimeout(()=>{
        setPercent(0);
        start();
        num++;
      },500);
    }else{
      window.setTimeout(()=>{
        setPercent(num%3/3);
        start();
        num++;
      },1000)
    }
  }
  return <div className='marquee-wrap'>
    <div className='marquee-content' 
    style={{
      transform:`translateY(${-percent*100}%)`,
      transition:num%3===0?'none':'transform 0.5s ease'
    }}>
      <div className='marquee-item' style={{backgroundColor:'#ff2'}}></div>
      <div className='marquee-item' style={{backgroundColor:'#22f'}}></div>
      <div className='marquee-item' style={{backgroundColor:'#ff2'}}></div>
    </div>
  </div>
}
export default Marquee;