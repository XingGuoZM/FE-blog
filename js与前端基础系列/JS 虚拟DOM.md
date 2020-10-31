
## 什么是虚拟DOM
Virture Dom即真实dom的对象表示形式，例如
- HTML描述（真实dom） 
```html
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

## 虚拟dom的作用


## vue和react中的虚拟dom

## 实现一个简易的createElement

## 给定真实dom字符串形式，自动读取出并构建出虚拟dom?
```js
let str='<div class="wrap"><img /><p>我是p标签</p><div id='div'></div></div>'

```
### 给定虚拟dom，自动构建出真实dom?
```js
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

## 参考
- [vue核心之虚拟DOM(vdom)](https://www.jianshu.com/p/af0b398602bc)