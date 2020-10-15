仓库地址：[rax-longlist](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist)  
### 简单介绍一下  
上一节实现了组件的复用封装，本节要学习一下埋点，前端埋点已经成为app应用开发中的很重要的一环，用户行为的监控，属于前端监控的部分。当然前端监控包括数据监控和性能监控。学习埋点之前先来接触几个名词pv、uv和ip。
- PV(page view): 访问量，页面的浏览量或者点击量
- UV(Unique Visitor): 独立访客，统计一段时间内访问某站点的用户数(以cookie为依据);访问网站的一台电脑客户端为一个访客
- IP(Internet Protocol): 独立ip数，是指一段时间内多少个独立的IP浏览了页面，即统计不同的IP浏览用户数量

埋点主要分为点击埋点和曝光埋点，如何上报数据呢，我们可以先来看几个例子？

- 网易云音乐首页打点
![网易云mobile音乐](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200816202239536-90226358.png)

- 美团首页打点
![美团mobile首页](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200816202431424-270400925.png)

- 有赞首页打点
![有赞mobile首页](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200816202522948-2061365743.png)

- 百度搜索首页打点
![百度搜索mobile首页打点](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200816202037574-648472434.png)

- 腾讯视频首页打点
![腾讯视频mobile首页](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200816202857633-1518123333.png)

- 亚马逊官网打点
![亚马逊mobile首页](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200816204000380-1371269724.png)  

- 天猫官网打点，像天猫这种dom结构里样式一大坨的就是使用rax写的了！！！
![天猫mobile首页](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200816204304032-1050196218.png)

一般来说数据放在dom属性里面的都是前端全包做打点，后台可以很快的反映打点数据变化。根据业务需要可以选择不同的方式打点。


说白了业务埋点就是打日志，记录用户行为。
### 需求  
 模拟实现监控数据上报，跟踪用户行为，模拟完成数据打点。

### 解决方案  
首先要找出一种方法来唯一标识要打点的dom，我们可以使用a、b、c、d位来唯一表示需要打点的dom的最小单元。就拿微信消息列表举例，a位是系统级别的，即微信；b位是模块级别的，即首页模块；c位是组件级别的，比如我们首页的底部导航，中间的消息列表和搜索栏，我们可以称之为楼层，d位是最小级别的cell，d位可以自定义，比如我们要把用户头像和发消息时间也打上点，这时我们可以将用户头像命个名，消息时间另外命个名，它们两个都是d位。一般来说我们之打到cell级别的d位即我们的列表项，用id表示d位，注意：d位在任何条件下都是不一样的。

我们可以在项目中新建一个Log目录，一个record文件专门用来打点，接收5个参数，a、b、d、c位和type（点击或者曝光）。页面中曝光可以使用appear和disAppear,注意rax在web端使用appear和disappear需要安装一个插件[appear-polyfill](https://www.npmjs.com/package/appear-polyfill)，还要再安装一个[universal-env](https://www.npmjs.com/package/universal-env)，用于判断是否web环境。点击使用onClick。

```
npm install appear-polyfill --save
npm install universal-env --save
```

还有一个问题，a、b、c、d位数据哪里来，这个数据是一个约定数据，约定好了即可。一般来说是放在后端返回数据里面的，例如我们这个微信消息列表里面，我们约定
- a位：'weixin'
- b位：'home'
- c位：'list'
- d位：id
因此我们要在mock数据里面加上一个字段名叫trackInfo，只需要包含abc位即可，所以在list数据中每一项的trackInfo都是一样的。示例如下：
```
"trackInfo":"weixin,home,list"
```

当然除了上传页面数据我们也可以上传系统客户端的数据，例如当前主机的ip（通过第三方插件可以获取），机型(使用window.navigator.userAgent获取)等等。

### 代码展示  
- log/recorder.js
```
/**
 * 模拟实现前端打点
 * @param {*} type exposure 或者 click
 * @param {*} A
 * @param {*} B
 * @param {*} C
 * @param {*} D
 */
export default function Recorder( type, A, B, C, D) {
  if (type === 'click') {

  } else if (type === 'exposure') {

  }
  console.log(type, A, B, C, D);
}
```
- home/index.jsx
```
import {createElement, useEffect, useState, Fragment} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import LongList from '../../components/LongList';
import Recorder from '../../Log/recorder';
import { isWeb } from 'universal-env';
import { setupAppear } from 'appear-polyfill';
import {getList, getNav} from './mock';
import './index.css';

let page = 0;
if (isWeb) {
  setupAppear();
}
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
    // console.log(page);
    let currPage = getList(page) && getList(page).list;
    if (currPage) {
      list.push(...currPage);
      setList([...list]);
      getSum();
    } else {
      // console.log('到底了');
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
    const listDom = list && list.map(item => {
      // console.log(item.trackInfo);
      const trackParams = item.trackInfo.split(',');
      return <View className="list-item" key={item.id}
        onAppear={() => Recorder('appear', trackParams[0], trackParams[1], trackParams[2], item.id)}
        onClick={() => Recorder('click', trackParams[0], trackParams[1], trackParams[2], item.id)}>
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
      </View>;
    });
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
- mock.json里的list中加了一个字段"trackInfo":"weixin,home,list"

### 效果展示  

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200816214943788-2012272972.png)


### 参考  
- [前端监控和前端埋点方案概述](https://www.jianshu.com/p/a1c7a8c3f07a)  
- [PV UV IP 与埋点技术实现](https://juejin.im/post/6844903955642728456)  

