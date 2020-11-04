环境准备
---
先要准备三个依赖包，及其对应的cdn链接分别为
1. react: https://unpkg.com/react@17/umd/react.development.js
2. react-dom: https://unpkg.com/react-dom@17/umd/react-dom.development.js
3. babel: https://unpkg.com/babel-standalone@6.15.0/babel.min.js

然后我们将它们通过cdn的方式引入到我们的html中，

最后完成的是一个最简单的小例子，如下
```html
 <!DOCTYPE html>
 <html lang="en">
     <head>
         <meta charset="utf-8" />
         <title>react</title>
     </head>
     <body>
       <div id='root'></div>
       <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
       <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
       <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

      <script type="text/babel">
        function HelloMessage({ name }) {
          return <div>Hello {name}</div>;
        }

        ReactDOM.render(
          <HelloMessage name="World" />,
          document.getElementById('root')
        );
      </script>
     </body>
 </html>
```
下面我们分析一下以上的这段代码，我们要对react的源码进行阅读，所以我们选择引入没有压缩的react的development版本，引入babel存粹是为了解析jsx，逻辑代码的script要加上type="text/babel"是为了支持jsx语法，不加会报错（具体会报什么错呢？会解析不了<，在HelloMessage函数return的时候会抛出异常）。

步入正题
---


参考
---
- [react官方文档 Hooks](https://reactjs.org/docs/hooks-intro.html)