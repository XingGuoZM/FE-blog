是什么
---

为什么
---
解耦
逻辑复用

怎么办
---


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

正题
---
1. useState
  - 释义：在函数组件中使用类组件state的能力。接收一个初始状态值，返回一个两个值的数组，第一个为state的当前值，第二个为state的setter方法，调用时会重新渲染组件（rerender），若想获取前一个状态值可传一个函数到state的setter方法中，入参为previous state，返回新的state。
  - 问题汇总
    - 如何获取前一个状态值（previous state）?
    - state为对象时，属性变化时不会自动更新?
2. useEffect
  - 释义：在函数组件中使用类组件的生命周期的能力。componentDidMount,componentDidUpdate和componentWillUnmount三个生命周期的替代品
  - 问题汇总
    - 如何只执行一次useEffect?
    - 如何在组件销毁前需要清除effect里的逻辑？
    - effect与setInterval定时器组合，state不更新？
    - 数据请求如何保证不会无限触发effect?
3. useRef
  - 访问dom节点
  - 保存变量的一个容器
4. useContext和useReducer
5. useCallback和useMemo
6. 自定义hook

参考
---
- [react官方文档 Hooks](https://reactjs.org/docs/hooks-intro.html)
- [react官方文档 Hook API 索引](https://zh-hans.reactjs.org/docs/hooks-reference.html)
- [React Hooks 系列之1 useState](https://gaohaoyang.github.io/2020/03/01/react-hooks1-useState/)
- [React Hooks 系列之2 useEffect](https://gaohaoyang.github.io/2020/05/11/react-hooks2-useEffect/)
- [React Hooks 系列之3 useContext](https://gaohaoyang.github.io/2020/05/12/react-hooks3-useContext/)
- [React Hooks 系列之4 useReducer](https://gaohaoyang.github.io/2020/05/13/react-hooks4-useReducer/)
- [React Hooks 系列之5 useCallback](https://gaohaoyang.github.io/2020/05/18/react-hooks5-useCallback/)
- [React Hooks 系列之6 useMemo](https://gaohaoyang.github.io/2020/05/19/react-hooks6-useMemo/)
- [React Hooks 系列之7 useRef](https://gaohaoyang.github.io/2020/05/26/react-hooks7-useRef/)
- [React Hooks 系列之8 custom Hook](https://gaohaoyang.github.io/2020/05/27/react-hooks8-customHooks/)