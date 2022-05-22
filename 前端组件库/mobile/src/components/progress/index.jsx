import {useEffect,useState} from 'react';
import CircleProgress from './Circle';
import './index.css';

const data ={
  stageList: [{stage:10},{stage:20},{stage:50},{stage:100},{stage:200}],
  amount: 10,
}
const request = ()=>{
  return new Promise(resolve=>setTimeout(()=>resolve(data),1000))
}
export default function Progress(){
  const [stage,setStage] = useState([]);
  const [curr,setCurr] = useState(0);
  const [levels,setLevels] = useState(1);
  const [times,setTimes] = useState(0);
  useEffect(()=>{
    request().then(res=>{
      const {stageList,amount}=res;
      let prev=0;
      const list = stageList.map(item=>{
        const arr =  [prev,item.stage]
        prev=item.stage;
        return arr;
      })
      setStage(list);
      setCurr(amount);
      if(res.stageList.length>0) setLevels(res.stageList.length);
    });
  },[]);
  useEffect(()=>{
    setInterval(()=>{
      setTimes(val=>{
        if(val===100){
          return 0;
        }else{
          return val+2;
        }
        });
    },300)
    
  },[]);
  return <><div className="progress">
    {stage.map((item)=>{
      if(curr>=item[1]){
        return <div className="bar" style={{width:`${(7.5/levels)}rem`}}/>
      }else if(curr>item[0] && curr<item[1]){
        const hasGone=curr-item[0];
        const levelStage = item[1] - item[0];
          return <div 
          key={item.stage} 
          className="bar" 
          style={{width:`${(7.5/levels) * hasGone/levelStage}rem`}}
      >
      </div>
      }
    })}
      </div>
    <CircleProgress maxTimes={100} times={times} />
</>
}