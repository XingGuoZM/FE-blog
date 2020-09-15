### js 对象模拟DOM  

- HTML描述  
```
<div class="wrap">
  <img />
  <p>我是p标签</p>
  <div id='div'></div>
</div>
```

- 对象描述
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