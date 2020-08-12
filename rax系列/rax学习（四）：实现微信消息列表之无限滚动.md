

仓库地址：[rax-longlist](https://github.com/XingGuoZM/native-module/tree/master/rax-longlist) 
### 简单介绍一下  
本节接着上一节，实现微信消息的无限滚动。

### 需求  
- 修改单位，统一使用vw vh
- 无限加载滚动列表  
- 滚动到底加载下一页的值  

### 解决方案  
消息提示使用定位，无限滚动加载,主要是如何检测到某个item是否到底了,可以转化成某个div距离屏幕上下左右的距离的问题，即可以使用getBoundingClientRect来实现它，除了这个还需要获取屏幕的高度，浏览器中可以使用document.documentElement.clientHeight来获取可视高度。关于getBoundingClientRect我们可以写个小例子来熟悉一下,代码如下：
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>getBoundingClientRect</title>
        <style>
            .list{
                width:100%;
                height:300px;
                border:solid 1px #ff4747;
                overflow:auto;
            }
            .item{
              background-color:#f2f2f2;
              height:50px;
              width:100%;
              margin-top:50px;
            }
            
        </style>
    </head>
    <body>
        <section id='list' class='list'>
            <div class='item' >1</div>
            <div class='item'>2</div>
            <div class='item'>3</div>
            <div class='item'>4</div>
            <div class='item'>5</div>
            <div class='item'>6</div>
            <div class='item'>7</div>
            <div class='item'>8</div>
            <div class='item'>9</div>
            <div class='item' id='lastItem'>10</div>
        </section>
        <script>
            const list = document.getElementById('list');
            const last=document.getElementById('lastItem');
            list.addEventListener('scroll',()=>{
              const target = last.getBoundingClientRect()
              console.log('top:',target.top,'bottom:',target.bottom,'left:',target.left,'right:',target.right);
            })
        </script>
    </body>
</html>
```
由上面的例子可以看到getBoundingClientRect()的top和bottom之差等于当前div的高度，这就代表top表示div顶部到屏幕顶端的距离，bottom表示div底部到屏幕顶端的距离。同理left和right也是一样的。有了上面的热身，我们可以开始继续我们的开发，长列表的无限滚动其实很简单：只需要在列表的父盒子里监听滚动，在最后一项加上ref这样我们就可以知道最后一项什么时候在屏幕的底部了。

### 关键代码展示  
- 目录结构  

- ![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200812235421331-1597039136.png)


- LongList/index.jsx
```
import {createElement,createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import ScrollView from 'rax-scrollview'
import mock from './mock'
import './index.css'

const scrollRef = createRef();
const lastRef = createRef();
export default ()=>{
  const [list,setList]=useState(mock.list(0))
  let page=0
  useEffect(()=>{
    scrollRef.current._nativeNode.addEventListener('scroll',()=>{
      let y=lastRef.current.getBoundingClientRect().bottom
      // 最底部item的底部到屏幕最上方的距离比上屏幕的距离，我们已知底部导航的高度占屏幕高度的10%
      const distance=y/document.documentElement.clientHeight
      // 计算比率，检测是否到底了
      if(distance<0.91 ){
        page++
        list.push(...mock.list(page))
        setList([...list])
      }
    })
  },[])


  return <View className='wrapper'>
    <View className='message'>
      <Text className='message-text'>微信</Text>
      <Image className='more' source={{uri:'../../public/images/more.jpg'}}/>
    </View>
    <ScrollView className='list-wrapper'  ref={scrollRef}>
        {/* 搜索框 */}
        <View className='search-wrapper' >
          <View className='search' >
            <Image className='search-img' source={{uri:'../../public/images/search.png'}} />
            <Text className='search-text'>搜索</Text>
          </View>
        </View>
        {/* 消息列表 */}
        {list&&list.map(item=>(
          <View className='list-item' key={item.id} >
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
      <View className='bottom' ref={lastRef}>到底了～</View>
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
  height:7vw;
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
.list-wrapper{
  flex:1;
  width:100%;
  background-color:#fff;
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
}

.avatar-img{
  width:15vw;
  height:15vw;
  border-radius:2vw;
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
}
.nav-img{
  width:8vw;
  height:8vw;
}
.nav-text{
  font-size:3vw;
}

.bottom{
  width:100%;
  height:10vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 效果展示  

- ![example1](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200812235948008-1477979425.png)

- ![example2](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200813000040087-355921933.png)

### 参考  
- [MDN getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)  
- [关于js获取屏幕高度和宽度（ window.document.body，window.screen）(PC端和移动端)](https://blog.csdn.net/weixin_43278947/article/details/90376807)


