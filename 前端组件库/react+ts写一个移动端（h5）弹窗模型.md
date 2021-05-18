### 写在前面
有人会说，弹窗有什么好封装的，直接用用框架自带的不就行了，要是没有用框架的话直接自己写一个也不是什么难事。写一个组件基本就以下几个步骤：
1. 构建出基本结构，还原ui。例如半黑蒙层+白色内容等
2. 逐步抽离需要配置的项。例如visible等
3. 再做一些优化。例如动画

这样我们就可以随手写一个简易的弹层组件了(react，下同)。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>React Modal</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .wrap {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mask {
      width: 100vw;
      height: 100vh;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .content {
      width: 50vw;
      height: 25vh;
      background-color: #fff;
      position:absolute;
    }
  </style>
</head>

<body>
  <div id='root'></div>
  <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function Modal(props) {
      if (props.visible) {
        return <div className='wrap'>
          <div className='mask' onClick={props.close}></div>
          <div className='content'>Content</div>
        </div>
      }
      return null;
    }
    function Button(props) {
      return <button onClick={() => props.cb(true)}>打开弹层</button>
    }

    function App() {
      const [visible, setVisible] = useState(false);
      return <div>
        <Button cb={setVisible} />
        <Modal visible={visible} close={() => setVisible(false)} />
      </div>
    }
    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>

</html>
```

现在我们实现了一个最简单的react弹窗组件。接下来我们要一步一步完善它，毕竟现在只是一个弹窗的雏形，并不能拿来即用。拿来即用最好的方式是能够像函数那样直接调用，第二个要解决的问题是弹窗一旦多起来就需要进行统一管理，我们基于弹窗的特点，维护一个栈，每次需要弹窗的时候都往栈中加入一个弹窗实例，每次要关闭弹窗的时候即出栈。再一个就是我们业务上需要在关闭弹窗和打开弹窗的时候做一些事，所以我们要把打开和关闭的事件透出给业务，这里我们可以考虑使用promise。

基于数据结构--栈封装一个函数式调用的弹窗模型

- [仓库源码modal](https://github.com/XingGuoZM/modal)

### 快速开始

### 使用文档
