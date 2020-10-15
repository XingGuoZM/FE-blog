仓库地址：[rax-longlist](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist) 
### 简单介绍一下  
上一节实现了列表的无限滚动，这一节我们来对组件进行一下封装，包装成可复用的的公共组件，达到拿来即用的效果。另外本节还弄了下消息未读小红点，

### 需求  
我们先来分析一下，封装一个无限滚动组件需要透出什么属性？什么方法？首先我们的长列表复用组件是一个架子，我们可以往里填数据也可以往里塞模块，填数据的话就用默认的样式，塞模块的话就要替换默认的层级结构，例如现在我们在微信列表里面使用的是一行一列的架子，要是换成电商的商品流有一列2行，一列3行的我们也可以让用户传入定义模块实现。然后我们需要有加载更多的loadmore方法和滚动到多少高度进行请求数据的loadheight属性。
- 组件：自定义节点  
- 属性：data和loadheight  
- 方法：loadmore  

### 解决方案  
长列表组件的封装有3个要点，组件内容必须从外面传进去，即要传一个组件当作参数，可以使用一个函数用来渲染列表项，然后把这个函数当作参数传入组件。data是数据源,将请求回来的数据传进去即可，loadheight是页面底部距离屏幕底部的高度多少时开始请求数据，目前支持vh单位,表示距离屏幕顶部多少比例开始loadmore，因为组件里面需要对高度进行计算，没办法自定义单位。loadmore是一个方法，对外透出，请求分页数据。组件内部非常简单，一个scrollView和一个到底了View，从外部不断传进内容进行渲染，检测到底了进行追加。

### 代码展示  
- 现在已经修改了目录结构，和之前相比，现在将组件longlist放入了components目录下  

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200815225755538-2116041385.png)  

- components/LongList/index.jsx
```
import { createElement, createRef, useEffect} from 'rax';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import './index.css';

const scrollRef = createRef();
const lastRef = createRef();
export default (props) => {
  const {renderContent, data, loadHeight, loadmore} = props;

  useEffect(() => {
    scrollRef.current._nativeNode.addEventListener('scroll', () => {
      let y = lastRef.current.getBoundingClientRect().bottom;
      // 最底部item的底部到屏幕最上方的距离比上屏幕的距离，我们已知底部导航的高度占屏幕高度的10%
      let distance = y / document.documentElement.clientHeight;
      // 计算比率，检测是否到底了
      if (distance < loadHeight || 0.91 && data.length > 0) {
        loadmore();
      }
    });
  }, []);
  return <ScrollView className="list-wrapper" ref={scrollRef}>
    {renderContent()}
    <View className="bottom" ref={lastRef}>到底了～</View>
  </ScrollView>;
};
```

- components/LongList/index.css
```
.list-wrapper{
  flex:1;
  width:100%;
  background-color:#fff;
}
.bottom{
  width:100%;
  height:10vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

```

- pages/Home/index.jsx
```
import {createElement, useEffect, useState, Fragment} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import LongList from '../../components/LongList';
import {getList, getNav} from './mock';
import './index.css';

let page = 0;
export default () => {
  const [list, setList] = useState([]);
  const [nav, setNav] = useState();
  // 记录消息总条数
  const [sum, setSum] = useState(0);

  useEffect(() => {
    getMsgList();
    getNavList();
  }, []);
  // 获取消息分页数据
  const getMsgList = () => {
    page++;
    console.log(page);
    let currPage = getList(page) && getList(page).list;
    if (currPage) {
      list.push(...currPage);
      setList([...list]);
      getSum();
    } else {
      console.log('到底了');
    }
  };
  // 获取底部导航数据
  const getNavList = () => {
    let navs = getNav();
    setNav(navs);
  };
  // 计算未读消息总条数
  const getSum = () => {
    let allNotRead = 0;
    list.forEach(item => {
      if (item.notRead) allNotRead += parseInt(item.notRead);
    });
    setSum(allNotRead);
  };
  {/* 渲染搜索框 */}
  const renderSearch = () => {
    return (<View className="search-wrapper" >
      <View className="search" >
        <Image className="search-img" source={{uri: '../public/images/search.png'}} />
        <Text className="search-text">搜索</Text>
      </View>
    </View>);
  };
  // 渲染消息列表
  const renderList = () => {
    const listDom = list && list.map(item => (
      <View className="list-item" key={item.id} >
        <View className="avatar">
          <Image className="avatar-img" source={{uri: item.image}} />
          {item.notRead && <Text className="msg-count">{item.notRead}</Text>}
        </View>
        <View className="info">
          <View className="info-msg">
            <Text className="info-msg-label">{item.label}</Text>
            <Text className="info-msg-value">{item.value}</Text>
          </View>
          <View className="info-time">
            <Text className="info-time-label">{item.time}</Text>
          </View>
        </View>
      </View>
    ));
    return <Fragment>
      {/* 搜索框 */}
      {renderSearch()}
      {/* 消息列表 */}
      {listDom}
    </Fragment>;
  };
  // 渲染底部导航
  const renderNav = () => {
    return (<View className="nav-wrapper">
      {
        nav && nav.map(item => (
          <View className="nav" key={item.id}>
            <Image className="nav-img" source={{uri: item.image}} />
            {item.id == 1 && sum !== 0 && <Text className="msg-count-sum">{sum}</Text>}
            <Text className="nav-text" style={{color: item.active ? '#56ba6a' : '#000000'}}>{item.name}</Text>
          </View>
        ))
      }
    </View>);
  };
  return <View className="wrapper">
    <View className="message">
      <Text className="message-text">{sum === 0 ? '微信' : `微信(${sum})`}</Text>
      <Image className="more" source={{uri: '../../public/images/more.jpg'}} />
    </View>

    <LongList renderContent={() => renderList()} data={list} loadmore={() => getMsgList(page)} />
    {/* 底部导航 */}
    {renderNav()}
  </View>;
};
```

- pages/Home/index.css
```
html,body{
  width:100vw;
  height:100vh;
}
.wrapper{
  display:flex;
  height:100vh;
}

.message{
  width:100vw;
  height:15vw;
  background-color:#ebebeb;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index:999;
}
.message-text{
  font-weight: bolder;
}
.more{
  width:7vw;
  height:6.8vw;
  position: absolute;
  right:5vw;
  top:5vw;
}
.search-wrapper{
  width:100%;
  background-color:#ebebeb;
  display:flex;
  flex-direction: row;
  justify-content: center;
  padding:3vw 1vw;
}
.search{
  width:96%;
  padding-top:1vw;
  padding-bottom:1vw;
  background-color:#fff;
  border-radius:1px;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.search-img{
  width:5vw;
  height:5vw;
}
.search-text{
  color:#ccc;
  margin-left:1vw;
}

.list-item{
  display:flex;
  flex-direction: row;
  height:20vw;
}

.avatar{
  width:20vw;
  height:20vw;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}

.avatar-img{
  width:15vw;
  height:15vw;
  border-radius:2vw;
}
.msg-count{
  position: absolute;
  background-color: #f25664;
  border-radius: 3vw;
  height: 5vw;
  top: 1vw;
  right: 1vw;
  font-size: 3.5vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left:1.5vw;
  padding-right:1.5vw;
}
.info{
  border-bottom:0.1vw solid #f2f2f2;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:80vw;
  height:20vw;
}
.info-msg{
  width:60vw;
  height: 15vw;
  display: flex;
  justify-content: space-around;
}
.info-msg-label{
  font-size:4.5vw;
}

.info-msg-value{
  width:60vw;
  overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
  font-size:3.5vw;
  color:#ccc;
}

.info-time{
  height:15vw;
  margin-right:5vw;
}

.info-time-label{
  color:#ccc;
  font-size:3.5vw;
}

/* 底部导航 */
.nav-wrapper{
  bottom:0vw;
  height:10vh;
  width:100vw;
  background-color:#f8f8f8;
  color:#111;
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.nav{
  display:flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.nav-img{
  width:8vw;
  height:8vw;
}
.msg-count-sum{
  position: absolute;
  background-color: #f25664;
  border-radius: 3vw;
  height: 5vw;
  top: -2vw;
  right: -6vw;
  font-size: 4vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
}
.nav-text{
  font-size:3vw;
}


```
- pages/Home/mock.js
```

import mock from '../../mock.json';

export const getList = (page) => {
  if (page < 1) return [];
  return mock.data[page - 1];
};

export const getNav = () => {
  return mock.nav;
};
```

- mock.json
```
{
  "data":[
    {
      "page":"1",
      "code":"200",
      "msg":"请求成功",
      "list":[
        {
          "id":1,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838293&di=e4e3d667821f4048f45b0dd063344d51&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201507%2F22%2F20150722123545_N5h3L.jpeg",
          "label": "懂得",
          "value":"睡了吗？",
          "notRead":"10",
          "time":"下午 11:39"
        },{
          "id":2,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838293&di=c8d1c3aaafbf22db8d720f072ff230d1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F09%2F20190109072726_aNNZd.thumb.700_0.jpeg",
          "label": "菲儿",
          "value":"晚安，么么哒！",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":3,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838293&di=01787cf6edfbc7eea3ae5f47caae2b3b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F13%2F20141213220212_rLVdL.jpeg",
          "label": "果果",
          "value":"想你",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":4,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838292&di=c6f341911e2e7a947a4ef24f72fd9b3c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D09b795cc9e2f07085f052a08d925b865%2F75dffbf2b21193133e1f783365380cd790238d75.jpg",
          "label": "红姐",
          "value":"还在找对象吗？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":5,
          "image":"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1028479771,2944343576&fm=26&gp=0.jpg",
          "label": "露露",
          "value":"在吗？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":6,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838289&di=530b6fafd92549328bb4e37f5bb96b1f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F20%2F20150820003153_UwJfV.thumb.700_0.jpeg",
          "label": "美丽的小美",
          "value":"你好",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":7,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838287&di=3f1779892c56305f340453e7308eefaa&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F18%2F20150418H0936_x2WeV.jpeg",
          "label": "娜娜",
          "value":"明天去爬山吗？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":8,
          "image":"../../public/images/group.jpg",
          "label": "杭州相亲群",
          "notRead":"9",
          "value":"[999条]熊猫:[链接]入群可分配帅哥美女",
          "time":"下午 11:39"
        },{
          "id":9,
          "image":"../../public/images/sports.jpg",
          "label": "微信运动",
          "notRead":"1",
          "value":"[应用消息]",
          "time":"昨天"
        },{
          "id":10,
          "image":"../../public/images/article.jpg",
          "label": "订阅号消息",
          "value":"[9条]高级前端: 史上最强vue教程整理，最终版",
          "time":"下午 11:39"
        }
      ]
    },{
      "page":"2",
      "code":"200",
      "msg":"请求成功",
      "list":[
        {
          "id":11,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838296&di=5e9e0a2c6e9a7e0c60bdfc1b117fdfd0&imgtype=0&src=http%3A%2F%2Fbbsimg.res.flyme.cn%2Fforum%2F201512%2F17%2F014758mlw1j471jvh47ng7.png",
          "label": "倩倩",
          "value":"买茶叶吗？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":12,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838296&di=3e0d130b0b3d9b2cb2d707c666f63cdc&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F30%2F20180530083702_HyrTS.thumb.700_0.jpeg",
          "label": "小面包",
          "value":"小哥哥～",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":13,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838295&di=ebca4a0ae9468834b738764ced999f84&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201410%2F09%2F20141009224754_AswrQ.jpeg",
          "label": "静璇",
          "value":"一支穿云箭，千里来相见",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":14,
          "image":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1027245443,3552957153&fm=26&gp=0.jpg",
          "label": "小赵",
          "value":"租房子吗？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":15,
          "image":"../public/images/ting.jpg",
          "label": "小亚亚",
          "value":"明天哪里见面？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":16,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838295&di=993b06db431923a1db659b7c9cb27201&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F18%2F20181018164757_okcuo.thumb.700_0.jpeg",
          "label": "艳玲",
          "value":"你多大了？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":17,
          "image":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1077287175,1506372161&fm=26&gp=0.jpg",
          "label": "蓉蓉",
          "value":"在干嘛呢？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":18,
          "image":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2558693067,2868064481&fm=26&gp=0.jpg",
          "label": "婷婷～",
          "value":"睡了吗？",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":19,
          "image":"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2141623099,2896788564&fm=26&gp=0.jpg",
          "label": "张姐",
          "value":"小伙子，交下房租",
          "notRead":"1",
          "time":"下午 11:39"
        },{
          "id":20,
          "image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597505838293&di=01a7a9714375439e93d53e4dc91acb11&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117230425_eofqv.thumb.700_0.jpg",
          "label": "婷婷～",
          "value":"睡你麻痹，起来嗨～",
          "notRead":"1",
          "time":"下午 11:39"
        }
      ]
    }
  ],

  "nav": [
    {
      "id": 1,
      "name": "微信",
      "image": "../../public/images/message.jpg",
      "active": true
    }, {
      "id": 2,
      "name": "通讯录",
      "image": "../../public/images/friends.jpg"
    }, {
      "id": 3,
      "name": "发现",
      "image": "../../public/images/find.jpg"
    }, {
      "id": 4,
      "name": "我",
      "image": "../../public/images/mine.jpg"
    }
  ]
}
```

### 效果展示  

![example1](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200815232303037-909403480.png)


![example2](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200815232440777-464316658.png)

