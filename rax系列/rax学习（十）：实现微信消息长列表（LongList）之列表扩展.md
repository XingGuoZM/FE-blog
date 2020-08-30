仓库地址：[rax-longlist](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist) 
### 介绍一下  
本节来扩展一下列表组件，我们知道和列表相似的组件有很多，我们来挑几个来实现一下。

### 需求  
- 跑马灯  
- 轮播  
- tab瀑布流  

### 解决方案  
- 跑马灯：列表自动向上滚。实现难点在于最后一个和第一个如何无缝切换，我们可以把第一个元素追加到数组最后一项，然后跑马灯滚动到最后一项的时候快速移动位置来完成过渡。
- 轮播：列表手动左右滚，也可以自动滚。
- tab瀑布流：手动左右横滑切换tab，上滚加载更多，吸顶等～  

### 代码展示 
1. [跑马灯组件](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist/src/components/Marquee)
  - index.jsx
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
  - index.css  
  ```
  .marquee-wrap{
    width: 100vw;
    height: 20vw;
    background: #f2f2f2;
    overflow: hidden;
  }

  .marquee-item{
    width: 100vw;
    height: 20vw;
    color: red;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  ```

2. [轮播组件](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist/src/components/Carousel)  
  - index.jsx  
  ```
  import { createElement, createRef, useEffect, useState} from 'rax';
  import View from 'rax-view';
  import Slider from 'rax-slider';
  import Image from 'rax-image';
  import './index.css';

  export default (props) => {
    const {data} = props;
    useEffect(() => {

    }, []);
    return <Slider width="750" height="350" className="carousel-wrap" showsPagination={false}>
      {data && data.map(item => <Slider.Item key={item.name} >
        {/* <Image source={{uri: item.imageUrl}} style={{width: '100%', height: '100%'}} /> */}
        <View style={{width: '100%', height: '100%', backgroundColor: item.backgroundColor}}>{item.name}</View>
      </Slider.Item>)}
    </Slider>;
  };
  ```
  - index.css  
  ```
  .carousel-wrap{
    display:flex;
    flex-direction: row;
  }
  .carousel-item{
    width:100vw;
    height:50vw;
    background-color:#f2f2f2;
  }
  ```

3. [tab瀑布流组件](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist/src/components/TabList)  
  - index.jsx  
  ```
  import { createElement, createRef, useEffect, useState} from 'rax';
  import View from 'rax-view';
  import Slider from 'rax-slider';
  import Recyclerview from 'rax-recyclerview';
  import Image from 'rax-image';
  import './index.css';


  export default (props) => {
    const {data} = props;
    const [index, setIndex] = useState(0);
    const sliderRef = createRef();
    useEffect(() => {

    }, []);
    function changeNav(item, index) {
      sliderRef.current.slideTo(index);
      setIndex(index);
    }
    function changeTab(e) {
      console.log(e.index, data.length);
      if (e.index >= data.length + 2) return;
      setIndex(e.index);
    }
    return <View className="tablist-wrap">
      {/* tab 导航 */}
      <View className="tablist-nav-wrap">
        {data.map((item, i) => <View
          className="tablist-nav"
          style={{color: i === index ? '#ff4747' : '#000'}}
          key={item.name}
          onClick={() => changeNav(item, i)}>
          {item.name}
        </View>)}
      </View>
      {/* tab 列表 */}
      <Slider width="750" height="350" className="carousel-wrap"
        onChange={(e) => changeTab(e)}
        showsPagination={false}
        loop={false}
        ref={sliderRef}>
        {data.map(item => <Slider.Item key={item.name} >
          <Recyclerview style={{width: '100%', height: '100%', backgroundColor: '#f2f2f2'}}>
            {item.list.map(ele => <View key={ele.name}>{ele.name}</View>)}
          </Recyclerview>
        </Slider.Item>)}
      </Slider>
    </View>;
  };
  ```
  - index.css  
  ```
  .tablist-wrap{

  }
  .tablist-nav-wrap{
    display:flex;
    flex-direction: row;

  }
  .tablist-nav{
    width:20vw;
    height:10vw;
  }
  ```

### 参考  
- [react-virtualized](https://github.com/bvaughn/react-virtualized)  
- [rax官方文档 RecyclerView](https://rax.js.org/docs/components/recyclerview)  
- [rax官方文档 Slider](https://rax.js.org/docs/components/slider)  
- [列表优化之虚拟列表](https://www.jianshu.com/p/39404c94dbd0)  