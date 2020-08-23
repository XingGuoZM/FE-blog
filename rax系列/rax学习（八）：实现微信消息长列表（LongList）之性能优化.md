仓库地址：[rax-longlist](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist) 
### 介绍一下  
前一节我们可以看到，数据量一上来就出现了很多问题。本节我们就来讲讲这些bug的解决办法。首先我们要知道为什么会出现这个问题，我们的长列表在大量数据（上千条，这个量级并不多）的情况下会出现拖动卡顿甚至拖不动，控制台也报错了。我们可以分析一下出现问题的原因，控制台报的错误如下

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200818233701126-388781468.png)

- 第一个问题分析  
  控制台报错说有重复的key，为什么会有重复的key值呢，我们的mock.js中不是已经传了page了吗，每次返回的数据的id应该都是不一样的才对呀。出现id重复的情况只有一种，那就是传入的page值是一样的，也就是说我们的监听滚动的事件跟新太频繁了，导致page来不及变化，这就是我们本地mock的第一个问题，当然请求接口也会出问题的，频繁请求接口很容易就把服务器给弄宕机了。根据我们的直觉可能会觉得是这个问题，但实际上却不是这个问题导致的，请求到数据会重新渲染dom，那么geBoundingRect计算出的距离顶部高度值会立即变化导致不会继续进行loadmore，所以和请求次数太频繁没有什么关系。会有重复的key值一定是数据出现了问题，有相同的id，我们在mock.js里找问题，发现对象数组是直接赋值的，我们知道每条数据都是不一样的，如果直接赋值那么只会复制它的引用，所以我们的每页数据本质上都是一样的，数据并没有变化，每加载一页数据和前一页的数据是一样的。

- 第二问题分析  
  这个问题相对比较棘手一点，数据量多到一定程度，列表会非常卡顿甚至拖不动。这个问题的原因也非常简单，因为我们每次请求到下一页的数据之后都是直接push到当前数组中的，然后又对这个数组进行map成dom节点，最后进行更新页面。这就会导致一个问题，数据越来越多，每次循环所要花费的时间也越来越多。比如我们第一页有10条数据，我们只需遍历10条数据，然后map也是10条数据，但是当请求到第100页的时候，数据达到了1000条，遍历1000条数据这是非常耗时的，同时它也非常耗内存的，1000个div节点，能流畅拖动才怪呢！pc浏览器中测试都拖不动，更别说在手机app上了。弄清楚了卡顿的原因，我们可以来想想解决方案了。其实我们并不需要这么多节点，小小的手机屏幕可视区域非常小，我们只需要保证屏幕可视区域能够正常展示即可，因此我们可以把dom节点简化20个（我们的数据是一页10条），然后滚动的时候不断的进行替换，只要我们保证上下滚动的时候需要展示的数据能与当前页对应上就行。


### 需求  
- 流畅拖动数据，万条数据不报错不卡顿

### 解决方案  
- 深克隆mock每页数据
- 性能优化
  1. 使用官网提供的RecyclerView试了下，在web端感觉并没有提升性能呀，1w条数据滚动起来还是非常卡的。本方案不考虑
  2. 使用虚拟列表的方式实现，dom结构和数据分开，提高dom的利用率。由于最近经常加班，所以先写了个例子，后面会补充完整的。 

### 代码展示  
- 目录结构  
  我们看到在components下有三个目录，LongList（不做任何处理，使用ScrollView），RecyclerList（使用官网提供的长列表解决方案，写了个小示例），VirtureList（自己想到的解决方案，也是一个小示例）

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200823211752134-1548308267.png)

- VirtureList代码展示，我们的长列表整体上只有3页的dom结构，通过滚动来动态定位dom位置并且偷偷把数据替换掉。
```
import {createElement, createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import './index.css';
/**
 * 虚拟列表例子
 */
const scrollRef = createRef();

const bottomRef = createRef();
const topRef = createRef();

const firstRef = createRef();
const secondRef = createRef();
const thirdRef = createRef();

let page = 1;
let prevDis = 2;
let currDis = 0;
export default () => {
  let [page1, setPage1] = useState(1);
  let [page2, setPage2] = useState(2);
  let [page3, setPage3] = useState(3);
  function handleScroll() {
    scrollRef.current._nativeNode.addEventListener('scroll', (e) => {
      let y = bottomRef.current.getBoundingClientRect().bottom;
      // 最底部item的底部到屏幕最上方的距离比上屏幕的距离，我们已知底部导航的高度占屏幕高度的10%
      currDis = y / document.documentElement.clientHeight;
      // 计算比率，检测是否到底了
      let distance = 0.91;
      // 向上滑动
      if (currDis < distance && currDis < prevDis) {
        // console.log('向上滑动', page);
        bottomRef.current.style.bottom = `-${100 * page}vh`;
        if (page % 3 === 1) {
          thirdRef.current.style.top = `${100 * page + 100}vh`;
          setPage3(page + 2);
        } else if (page % 3 === 2) {
          firstRef.current.style.top = `${100 * page + 100}vh`;
          setPage1(page + 2);
        } else if (page % 3 === 0) {
          secondRef.current.style.top = `${100 * page + 100}vh`;
          setPage2(page + 2);
        }
        page++;
      // 向下滑动
      } else if (currDis > distance && currDis > prevDis) {
        // console.log('向下滑动', page);
        bottomRef.current.style.bottom = `-${100 * page}vh`;
        if (page % 3 === 1) {
          thirdRef.current.style.top = `${100 * page - 200}vh`;
          setPage3(page - 1 );
        } else if (page % 3 === 2) {
          firstRef.current.style.top = `${100 * page - 200}vh`;
          setPage1(page - 1);
        } else if (page % 3 === 0) {
          secondRef.current.style.top = `${100 * page - 200}vh`;
          setPage2(page - 1);
        }
        page--;
      }
    });
  }
  useEffect(() => {
    handleScroll();
  }, [page]);
  return <ScrollView className="list-wrapper" ref={scrollRef}>
    <View className="page-wrap">
      <View className="top" ref={topRef}>到顶了～</View>
      <View className="first page" ref={firstRef} >{page1}</View>
      <View className="second page" ref={secondRef} >{page2}</View>
      <View className="third page" ref={thirdRef} >{page3}</View>
      <View className="bottom" ref={bottomRef}>到底了～</View>
    </View>
  </ScrollView>;
};
```

### 效果展示  
我们通过浏览器滚动帧率的工具来查看效果，操作如下：

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200823212608526-1151238185.png)

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200823212918548-795126173.png)


通过上面设置我们可以轻松的查看到滚动帧率的变化，帧率越大代表动画越流畅。使用virturelist的话，滚动到3000条左右的时候，每一页能存放10条，也就是数字300左右的时候，帧率值依旧非常大

![virturelist](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200823213242488-610051779.png)

我们再来看看RecyclerList 3000条左右数据的时候的表现

![recyclerlist](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200823213519771-1310359167.png)

最后我们看看，不做任何处理的时候，使用ScrollView 3000条数据时候的表现 

![scrollview](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200823214357606-2002414882.png)  

以上对比可能有些偏差，后续有时间会改进的。


### 参考  

- [使用react 实现一个无限滚动列表](https://www.jianshu.com/p/d54d65d20b1c)  
- [rax官方文档 RecyclerView](https://rax.js.org/docs/components/recyclerview)