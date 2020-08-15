
仓库地址：[rax-longlist](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist) 
### 简单介绍一下  
本次示例选择微信消息列表，旨在实现移动端的无限滚动。为了增加趣味性，来恶搞微信消息吧！！！本节来还原一下微信消息的静态页面，下一节实现功能。

### 需求  
- 高度还原微信消息列表页面
- 群组消息、公众号消息、好友消息、微信运动消息、文件传输助手消息展示   
- 本地引静态资源，如图片
- 头部标题和底部导航不动，列表超出范围滚动  

### 解决方案  
图片等静态资源放在src下的public目录中,启动之后要先npm run build构建一下  
顶部和底部固定，中间滚动可使用flex + calc来解决  
没有素材怎么办？没有切图怎么办？没有设计稿怎么办？答案是使用微信截图，既可以查看颜色又可以截取图片。。。


### 关键代码展示  
- 目录结构  

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200812000247295-1836872403.png)  

- LongList/index.jsx
```
import {createElement} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import ScrollView from 'rax-scrollview'
import mock from './mock'
import './index.css'
export default ()=>{

  return <View className='wrapper'>
    <View className='message'>
      <Text className='message-text'>微信</Text>
      <Image className='more' source={{uri:'../../public/images/more.jpg'}}/>
    </View>
    <ScrollView className='list-wrapper'>
        {/* 搜索框 */}
        <View className='search-wrapper'>
          <View className='search'>
            <Image className='search-img' source={{uri:'../../public/images/search.png'}} />
            <Text className='search-text'>搜索</Text>
          </View>
        </View>
        {/* 消息列表 */}
          {mock.list.map(item=>(
            <View className='list-item' key={item.id}>
              <View className='avatar'>
                <Image className='avatar-img' source={{uri:item.image}}/>
              </View>
              <View className='info'>
                <View className='info-msg'>
                  <Text className='info-msg-label'>{item.label}</Text>
                  <Text className='info-msg-value'>{item.value}</Text>
                </View>
                <View className='info-time'>
                  <Text className='info-time-label'>{item.time}</Text>
                </View>
              </View>
            </View>
          ))}
    </ScrollView>

    {/* 底部导航 */}
    <View className='nav-wrapper'>
        {
          mock.nav.map(item=>(
          <View className='nav' key={item.id}>
            <Image className='nav-img' source={{uri:item.image}}></Image>
            <Text className='nav-text' style={{color:item.active?'#56ba6a':'#000000'}}>{item.name}</Text>
          </View>
          ))
        }
    </View>
  </View>
}

``` 

- LongList/index.css  
```
.wrapper{
  display:flex;
  height:100%;
}

.message{
  width:100%;
  height:3rem;
  background-color:#f2f2f2;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index:999;
}
.message-text{
  font-weight: bolder;
}
.more{
  width:1.5rem;
  height:1.5rem;
  position: absolute;
  right:1rem;
}
.search-wrapper{
  width:100%;
  background-color:#f2f2f2;
  display:flex;
  flex-direction: row;
  justify-content: center;
  padding:0.5rem 0.2rem;
}
.search{
  width:96%;
  padding-top:0.3rem;
  padding-bottom:0.3rem;
  background-color:#fff;
  border-radius:1px;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.search-img{
  width:1.2rem;
  height:1.2rem;
}
.search-text{
  color:#ccc;
  margin-left:0.5rem;
}
.list-wrapper{
  flex:1;
  width:100%;
  height:calc(100% - 10rem);
  background-color:#fff;
}
.list-item{
  display:flex;
  flex-direction: row;
  height:5rem;
}

.avatar{
  width:5rem;
  height:5rem;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.avatar-img{
  width:3.5rem;
  height:3.5rem;
  border-radius:0.2rem;
}

.info{
  border-bottom:0.01rem solid #f2f2f2;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:18.5rem;
}
.info-msg{
  height: 3.5rem;
  display: flex;
  justify-content: space-around;
}
.info-msg-label{
  font-size:1.2rem;
}

.info-msg-value{
  width:14rem;
  overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
  font-size:1rem;
  color:#ccc;
}

.info-time{
  height:3.5rem;
  margin-right:1rem;
}

.info-time-label{
  color:#ccc;
  font-size:0.8rem
}

/* 底部导航 */
.nav-wrapper{
  bottom:0rem;
  height:4rem;
  width:100%;
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
}
.nav-img{
  width:2rem;
  height:2rem;
}
.nav-text{
  font-size:0.7rem;
}
```

- Home/index.jsx
```
import { createElement } from 'rax';
import View from 'rax-view';
import LongList from '../LongList';
import './index.css';
export default function Home() {
  return (
    <View className="home">
      <LongList />
    </View> 
  );
}

```

- Home/index.css
```

html{
  width:100%;
  height:100%;
}
.home{
  background-color:#f2f2f2;
  width:100%;
  height:100%;
}
```

### 效果展示  

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200812000700076-2072795273.png)

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200812000716529-1920811745.png) 

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200812000736301-774312810.png)

### 参考  
- [rax官方文档 目录结构](https://rax.js.org/docs/guide/directory-structure)