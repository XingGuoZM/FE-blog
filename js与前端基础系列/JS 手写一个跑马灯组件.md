
### 功能需求  


### 技术方案  

### 使用说明  

### 实现代码  
- react(pc端)  

- rax(mobile端)     

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>marquee</title>
        <style>
            .marquee-wrap{
              width:100%;
              height:100px;
              background-color:#f2f2f2;
              display:flex;
              flex-direction: column;
              overflow:hidden;
            }
            .marquee-item{
              width:100%;
              height:100px;
              color:red;
            }
        </style>
    </head>
    <body>
        <section class='marquee-wrap'>
          <div id='marquee'>
            <div class="marquee-item">111</div>
            <div class="marquee-item">222</div>
            <div class="marquee-item">333</div>
            <div class="marquee-item">111</div>
          </div>
        </section>
        <script>
          let marquee=document.querySelector('#marquee');
          let percent=0;
          let num=0;
          let len = 4;

          window.setInterval(() => {
            percent=num % len / len * 100;
            if (num % len === len - 1) {
              window.setTimeout(() => {
                marquee.style.transform='translate3d(0, 0, 0)' 
                marquee.style.transition= 'none'
                num+=1
              }, 800);
            }
            num += 1;
            marquee.style.transform=`translate3d(0, -${percent}%,0)`
            marquee.style.transition='transform .8s ease'
          }, 1000);
        </script>
    </body>
</html>
```

- rax手写
```
import { createElement, createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import './index.css';

let num = 0;
export default (props) => {
  const {data} = props;
  const [percent, setPercent] = useState(0);
  let [list, setList] = useState(data);
  useEffect(() => {
    setList(list.push(data[0]));

    window.setInterval(() => {
      let len = list.length;
      let n = num % len / len * 100;
      setPercent(n);
      if (num % len === len - 1) {
        window.setTimeout(() => {
          setPercent(0);
          num += 1;
        }, 800);
      }
      num += 1;
    }, 1000);
  }, []);
  function renderDefaultCell(item, index) {
    return <View key={index} className="marquee-item">{item.name}</View>;
  }
  return <View className="marquee-wrap">
    <View style={{
      transform: `translate3d(0,-${percent}%,0)`,
      transition: `${percent === 0 ? 'none' : 'transform .8s ease'}`
    }}>
      {data.map((item, index) => renderDefaultCell(item, index))}
    </View>
  </View>;
};
```

- vue(web端)   

### 参考  