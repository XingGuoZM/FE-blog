仓库地址：[rax-helloworld](https://github.com/XingGuoZM/native-module/tree/master/rax-helloworld) 
### 简单介绍一下  
rax系列由易到难完成一些小demo来培养学习的兴趣。后面会讲一些自己对rax框架的认识和理解，学习完成一些示例之后会开始研究源码实现以及rax为什么能兼容多端。todolist是一个简单的小例子，可以算作是学习rax练手的demo。环境和[前一篇](https://www.cnblogs.com/xingguozhiming/p/13466465.html)相同,

### 需求   
1. 输入完成添加一项，并且清除输入框  
2. 点击项加删除线  

### 解决方案  
需求简单，使用react-hooks实现功能。
- 添加可以使用useState()创建一个变量value，记录当前输入的值  
- 删除可以使用onClick事件完成样式更改，修改text-decoration:'line-through'即可  
- 添加完成清除输入框内容稍微麻烦一点，需要使用createRef和TextInput的clear()方法  

### 关键代码  
- 目录结构 

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200810225303219-2022412182.png)  

- 关键代码  
```
import { createElement,createRef,useState, useEffect } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from "rax-textinput";

export default function TodoList() {
  const [value,setValue]=useState([]);
  const inputRef = createRef();
  // 添加项
  function handleChange(e){
    value.push(e.value)
    setValue([...value])
    inputRef.current.clear();
  }
  // 点击画删除线
  function handleClick(e){
    e.target.style.textDecoration='line-through'
  }
  //value变化更新dom
  useEffect(()=>{},[value])
  // list项
  const todolist=value.map((item,index)=>(<Text 
    key={index} 
    style={{height:'40rpx'}} 
    onClick={(e)=>handleClick(e)}> • {item}</Text>))
  return (
    <View>
      <TextInput 
        style={{border:'solid 1px #ccc'}}
        ref={inputRef}
        placeholder='请输入...'
        onChange={(e)=>handleChange(e)}/>
      <View className='todo-list'>{todolist}</View>
    </View>
  );
}

```
### 效果展示  

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200810225618920-852625002.png)

### 参考  
-[rax官方文档 createref](https://rax.js.org/docs/api/createref)

