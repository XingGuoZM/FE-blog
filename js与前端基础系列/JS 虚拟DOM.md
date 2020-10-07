### js 对象模拟DOM  

- HTML描述（真实dom） 
```
<div class="wrap">
  <img />
  <p>我是p标签</p>
  <div id='div'></div>
</div>
```

- 对象描述（虚拟dom）
```
{
  name:'div',
  classname:'wrap',
  children:[
    {name:'img'},
    {name:'p',innerHtml:'我是p标签'},
    {name:'div',id:'div'}
  ]
}
```

### 给定真实dom字符串形式，自动读取出并构建出虚拟dom?
```
let str='<div class="wrap"><img /><p>我是p标签</p><div id='div'></div></div>'

```
### 给定虚拟dom，自动构建出真实dom?
```
let obj={
  name:'div',
  classname:'wrap',
  children:[
    {name:'img'},
    {name:'p',innerHtml:'我是p标签'},
    {name:'div',id:'div'}
  ]
}
```