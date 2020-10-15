原文地址：[How the useEffect Hook Works (with Examples)](https://daveceddia.com/useeffect-hook-examples/) 

![](https://daveceddia.com/images/useEffect-hook@2x.png)

想象一下：你有一个足够好的函数组件，并且有一天，你需要加一个生命周期函数到里头。

啊。

“也许我可以用某种方式解决它？” 最终变成“糟糕，我要将它转化成一个类组件”。

类组件继承自React.Component,将函数的主体复制黏贴到render方法中，然后将代码格式缩进，最后加上生命周期的方法。

useEffect 给你提供了一个更好的选择。

通过useEffect，你可以在函数组件内部直接操纵生命周期相关的事件。即，它们中的三个：componentDidMount, componentDidUpdate, and componentWillUnmount. 全部包含在一个函数中！让我们来看一个例子：
```
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function LifecycleDemo() {
  // Pass useEffect a function
  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log('render!');

    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => console.log('unmounting...');
  })

  return "I'm a lifecycle demo";
}

function App() {
  // Set up a piece of state, so that we have
  // a way to trigger a re-render.
  const [random, setRandom] = useState(Math.random());

  // Set up another piece of state to keep track of
  // whether the LifecycleDemo is shown or hidden
  const [mounted, setMounted] = useState(true);

  // This function will change the random number,
  // and trigger a re-render (in the console,
  // you'll see a "render!" from LifecycleDemo)
  const reRender = () => setRandom(Math.random());

  // This function will unmount and re-mount the
  // LifecycleDemo, so you can see its cleanup function
  // being called.
  const toggle = () => setMounted(!mounted);

  return (
    <>
      <button onClick={reRender}>Re-render</button>
      <button onClick={toggle}>Show/Hide LifecycleDemo</button>
      {mounted && <LifecycleDemo/>}
    </>
  );
}

ReactDOM.render(<App/>, document.querySelector('#root'));
```

[在CodeSandbox尝试一下](https://codesandbox.io/s/2pjrm60mr0).

单击Show/Hide按钮。 查看控制台。 它在消失之前打印“unmounting”，当它再次出现打印“render！” 。

![Console output of clicking show/hide](https://daveceddia.com/images/useEffect-unmount-remount.gif)

现在，尝试一下Re-render按钮。每一次单击，它都会打印出“render！”和“umounting”，好像很奇怪...

单击重新渲染的控制台输出

为什么每次渲染都输出“unmounting”？

嗯，您可以（可选）从useEffect返回的清理函数不仅会在卸载组件时被调用。 每次效果生效前都会调用它-从上一次运行中清除。 实际上，它比componentWillUnmount生命周期更强大，因为如果需要，它可以让您在每个渲染之前和之后运行副作用。

## 不仅仅是生命周期  
useEffect在每次渲染之后运行（默认情况下），并且可以选择在再次运行之前自行清理。

与其将useEffect当作一个可以完成3个独立生命周期工作的函数，不如将其简单地视为渲染后运行副作用的一种方式（包括您希望在每个操作之前进行的潜在清理）可能会更有帮助。 并在卸载之前。

![](https://img2020.cnblogs.com/blog/1347757/202010/1347757-20201001105924079-182134385.png)

## 每次进行渲染时阻止副作用
如果您想减少副作用的运行频率，可以提供第二个参数-一个数组。 将它们视为实现此效果的依赖项。 如果自上次以来某个依赖项已更改，则效果将再次运行。 （它还将在初始渲染后运行）

```
const [value, setValue] = useState('initial');

useEffect(() => {
  // This effect uses the `value` variable,
  // so it "depends on" `value`.
  console.log(value);
}, [value])  // pass `value` as a dependency
```

考虑该数组的另一种方式：它应该包含effect函数在周围范围中使用的每个变量。 那么，如果使用prop呢？ 那在数组中。 是否使用state？ 那在数组中。

## useEffect不会主动 “监控”
一些框架是响应式的，这意味着它们会自动检测更改并在发生更改时更新UI。

React不会这样做-它只会响应状态更改而重新渲染。

useEffect也不会主动“监视”更改。 您可以将useEffect调用想像为以下伪代码：
```
let previousValues = [];
let hasRun = false;
function useEffect(effectFunc, dependencyArray = undefined) {
  // Let's pretend there's a function somewhere that will queue
  // this to run after the render is finished -- because we don't
  // want to run this effect NOW, we only want to queue it up.
  afterRenderIsDone(() => {
    // Check each dependency against the last time this was called
    for(let i = 0; i < dependencyArray.length; i++) {
      if(dependencyArray[i] !== previousValues[i]) {
        // One of the values has changed! Update them for next time,
        // and run the effect
        previousValues = dependencyArray;
        effectFunc();
        break;
      }
    }
  });
}
```
当您在组件中调用useEffect时，这实际上是在完成渲染后排队或安排可能运行的效果。

渲染完成后，useEffect将查看依赖项值的列表，如果其中任何一个已更改，则调用您的effect函数。

## 在挂载后只运行一次  
您可以通过传递空数组[]的特殊值来表示“仅在挂载时运行，而在卸载时清除”。 因此，如果我们将上面的组件更改为像这样调用useEffect：
```
useEffect(() => {
  console.log('mounted');
  return () => console.log('unmounting...');
}, [])  // <-- add this empty array here
```

然后，它将在初始渲染后打印“mounted”，在整个生命周期中保持沉默，并在退出时打印“unmounting...”。

上面的伪代码不包含对此空数组功能的支持。 可能是这样的：
```
useEffect(() => {
  console.log('mounted');
  return () => console.log('unmounting...');
}, [])  // <-- add this empty array here
```
Then it will print “mounted” after the initial render, remain silent throughout its life, and print “unmounting…” on its way out.

Our pseudocode above didn’t include support for this empty array feature. Here’s what that might look like:
```
let previousValues = [];
let hasRun = false;
function useEffect(effectFunc, dependencyArray = undefined) {
  // Let's pretend there's a function somewhere that will queue
  // this to run after the render is finished -- because we don't
  // want to run this effect NOW, we only want to queue it up.
  afterRenderIsDone(() => {
    // 'undefined' is a special value, meaning "run every time"
    if(!dependencyArray) {
      effectFunc();
      return;
    }

    // empty array '[]' is also a special value: only run once
    if(dependencyArray.length === 0) {
      if(!hasRun) {
        hasRun = true;
        effectFunc();
      }
      return;
    }

    // Check each dependency against the last time this was called
    for(let i = 0; i < dependencyArray.length; i++) {
      if(dependencyArray[i] !== previousValues[i]) {
        // One of the values has changed! Update them for next time,
        // and run the effect
        previousValues = dependencyArray;
        effectFunc();
        break;
      }
    }
  });
}
```

请注意第二个参数：如果添加了一个依赖项，很容易忘记添加一个项目；如果您错过了一个依赖项，那么下次useEffect运行时该值将过时，并且可能会导致一些奇怪的问题。

## useEffect何时运行？  
默认情况下，useEffect在每次调用该组件的渲染之后运行。 通过示例最容易看到此时间。尝试下[CodeSandbox上的交互式示例](https://codesandbox.io/s/useeffect-timing-jvgip),确保你打开了控制台，你能看到这个时间。

在这个示例中，有3个嵌套组件，Top包含Middle，Middle包含Bottom。useEffect的时间取决于每个组件的渲染时间，并且初始将全部渲染3个组件。你会看到控制台打印出3条消息。

但是请注意，React是自下而上渲染的！ 在这种情况下：底部，然后是中间，然后是顶部。 它是递归的-父级直到其所有子级都渲染完毕后才“完成”，并且useEffect仅在组件的渲染完成后才运行。

从那时起，将不会发生任何事情，直到您单击其中一个元素以增加其计数。 完成后，唯一会重新渲染的组件是您单击的组件及其下方的组件。 （请注意，如果您单击“底部”，您将不会看到“顶部”或“中间”的“已渲染”消息）
```
function Top() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Top rendered");
  });

  return (
    <div>
      <div onClick={() => setCount(count + 1)}>Top Level {count}</div>
      <Middle />
    </div>
  );
}

function Middle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Middle rendered");
  });

  return (
    <div>
      <div onClick={() => setCount(count + 1)}>Middle Level {count}</div>
      <Bottom />
    </div>
  );
}

function Bottom() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Bottom rendered");
  });

  return <div onClick={() => setCount(count + 1)}>Bottom Level {count}</div>;
}
```
## 在state变化时会运行useEffect
默认情况下，useEffect在每次渲染后运行，但是对于响应状态更改而运行一些代码也是完美的选择。 您可以通过将第二个参数传递给useEffect来限制效果的运行时间。

将第二个参数想像为“依赖项”数组–如果更改了变量，效果应重新运行。 这些可以是任何类型的变量：prop，state或其他任何变量。

在此示例中，有3个state变量和3个按钮。 该效果仅在count2更改时运行，否则将保持安静。 尝试交互式示例。
```
function ThreeCounts() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    console.log("count2 changed!");
  }, [count2]);

  return (
    <div>
      {count1} {count2} {count3}
      <br />
      <button onClick={() => setCount1(count1 + 1)}>Increment count1</button>
      <button onClick={() => setCount2(count2 + 1)}>Increment count2</button>
      <button onClick={() => setCount3(count3 + 1)}>Increment count3</button>
    </div>
  );
}
```

## 在prop变化时会运行useEffect

正如我们能够将useEffect设置为在状态变量更改时运行一样，使用props也可以做到这一点。 请记住，它们都是常规变量！ useEffect可以在其中任何一个上触发。

在此示例中，PropChangeWatch组件正在接收2个props（a和b），并且其效果仅在更改值时才会运行（因为我们正在传递包含[a]作为第二个参数的数组）。

在[交互式示例](https://codesandbox.io/s/useeffect-run-on-props-change-k3wvz)中尝试一下.:
```
function PropChangeWatch({ a, b }) {
  useEffect(() => {
    console.log("value of 'a' changed to", a);
  }, [a]);

  return (
    <div>
      I've got 2 props: a={a} and b={b}
    </div>
  );
}

function Demo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <PropChangeWatch a={count1} b={count2} />
      <button onClick={() => setCount1(count1 + 1)}>Increment count1</button>
      <button onClick={() => setCount2(count2 + 1)}>Increment count2</button>
    </div>
  );
}
```
## 专注于挂载

有时您只想在挂载时做一件小事，而做一件小事需要将一个函数重写为一个类。

在此示例中，让我们看一下如何结合使用useEffect和useRef钩子将输入控件集中在第一个渲染上。
```
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

function App() {
  // Store a reference to the input's DOM node
  const inputRef = useRef();

	// Store the input's value in state
  const [value, setValue] = useState("");

  useEffect(
    () => {
      // This runs AFTER the first render,
      // so the ref is set by now.
      console.log("render");
      // inputRef.current.focus();
    },
		// The effect "depends on" inputRef
    [inputRef]
  );

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
ReactDOM.render(<App />, document.querySelector("#root"));
```
在顶部，我们使用useRef创建一个空的ref。 将其传递到输入的ref属性后，就需要在渲染DOM后对其进行设置。 而且，重要的是，useRef返回的值在渲染之间将保持稳定–不会更改。

因此，即使我们将[inputRef]作为useEffect的第二个参数传递，它在初始挂载时实际上只会运行一次。 这基本上是“ componentDidMount”（时间原因，我们将在后面讨论）。

为了证明这一点，请[尝试示例]（https://codesandbox.io/s/z6pommq8km）。 请注意它的聚焦方式（使用CodeSandbox编辑器时有点麻烦，但是请尝试单击右侧“浏览器”中的刷新按钮）。 然后尝试在框中输入。 每个字符都会触发重新渲染，但是如果您查看控制台，则会看到“render”仅打印一次。

![](https://img2020.cnblogs.com/blog/1347757/202010/1347757-20201001110355095-1612445186.png)

## 使用useEffect请求数据
让我们看看另一个常见的用例：请求数据并显示它。 在类组件中，您需要将此代码放入componentDidMount方法中。 为此，我们将使用useEffect。 我们还需要useState来存储数据。

值得一提的是，当React新的Suspense功能的数据获取部分准备就绪时，这将是获取数据的首选方式。 从useEffect抓取有一个大难题（我们将继续介绍），而Suspense API的使用将变得更加容易。

这是一个从Reddit获取帖子并显示它们的组件：
```
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Reddit() {
  // Initialize state to hold the posts
  const [posts, setPosts] = useState([]);

  // effect functions can't be async, so declare the
  // async function inside the effect, then call it
  useEffect(() => {
    async function fetchData() {
      // Call fetch as usual
      const res = await fetch(
        "https://www.reddit.com/r/reactjs.json"
      );

      // Pull out the data as usual
      const json = await res.json();

      // Save the posts into state
      // (look at the Network tab to see why the path is like this)
      setPosts(json.data.children.map(c => c.data));
    }

    fetchData();
  }); // <-- we didn't pass a value. what do you think will happen?

  // Render as usual
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

ReactDOM.render(
  <Reddit />,
  document.querySelector("#root")
);
```
您会注意到，我们没有在此处将第二个参数传递给useEffect。 这是不好的。 不要这样

不传递第二个参数将导致useEffect运行每个渲染。 然后，当它运行时，它将获取数据并更新状态。 然后，一旦状态更新，组件将重新渲染，这再次触发useEffect。 您可以看到问题。

为了解决这个问题，我们需要传递一个数组作为第二个参数。 数组应该是什么？

继续思考一下。

…

…

useEffect依赖的唯一变量是setPosts。 因此，我们应该在此处传递数组[setPosts]。 由于setPosts是useState返回的设置器，因此不会在每个渲染器中都重新创建它，因此效果只能运行一次。

有趣的事实：调用useState时，它返回的setter函数仅创建一次！ 每次渲染组件时，它都是完全相同的函数实例，这就是为什么效果可以安全依赖于一个实例的原因。 这个有趣的事实对于useReducer返回的调度函数也是如此。


## 当数据变化时重新发送请求

让我们在示例上进行扩展，以涵盖另一个常见问题：如何在发生某些变化（例如用户ID或本例中为subreddit的名称）时重请求取数据。

首先，我们将Reddit组件更改为接受subreddit作为prop，基于该subreddit请求数据，并仅在prop更改时重新运行效果：

```
// 1. Destructure the `subreddit` from props:
function Reddit({ subreddit }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // 2. Use a template string to set the URL:
      const res = await fetch(
        `https://www.reddit.com/r/${subreddit}.json`
      );

      const json = await res.json();
      setPosts(json.data.children.map(c => c.data));
    }

    fetchData();

    // 3. Re-run this effect when `subreddit` changes:
  }, [subreddit, setPosts]);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// 4. Pass "reactjs" as a prop:
ReactDOM.render(
  <Reddit subreddit='reactjs' />,
  document.querySelector("#root")
);
```

这仍然是硬编码的，但是现在我们可以通过将Reddit组件包装为一个组件来对其进行自定义，以使我们可以更改subreddit。 添加此新的App组件，并在底部进行渲染：

```
function App() {
  // 2 pieces of state: one to hold the input value,
  // another to hold the current subreddit.
  const [inputValue, setValue] = useState("reactjs");
  const [subreddit, setSubreddit] = useState(inputValue);

  // Update the subreddit when the user presses enter
  const handleSubmit = e => {
    e.preventDefault();
    setSubreddit(inputValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={e => setValue(e.target.value)}
        />
      </form>
      <Reddit subreddit={subreddit} />
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

[尝试在CodeSandbox中运行这个示例](https://codesandbox.io/s/234lnl29q0)

该应用程序在此处保持2种状态-当前输入值和当前subreddit。提交输入将“提交”子reddit，这将导致Reddit从新选择中重新获取数据。将输入包装在表格中，允许用户按Enter提交。

顺便说一句：仔细键入。没有错误处理。如果您输入不存在的subreddit，则该应用将崩溃。但是，实现错误处理将是一个很棒的练习！ ;）

我们在这里只可以使用一种状态-存储输入，并将相同的值发送给Reddit-但是Reddit组件将在每次按键时获取数据。

顶部的useState可能看起来有些奇怪，尤其是第二行：
```
const [inputValue，setValue] = useState（“ reactjs”）;
const [subreddit，setSubreddit] = useState（inputValue）;
```

我们正在将“ reactjs”的初始值传递给第一状态，这很有意义。该价值永远不会改变。

但是第二行呢？如果初始状态改变怎么办？ （并且，当您在框中键入内容时，它会显示）

请记住，useState是有状态的（有关useState的更多信息）。它只使用一次，即第一次渲染时的初始状态。之后，它将被忽略。因此，可以传递一个瞬态值（例如可能会更改的prop或其他变量）是安全的。

## 一百种用途
useEffect函数就像瑞士军刀的钩子。 它可以用于很多事情，从设置订阅到创建和清除计时器，再到更改引用的值。

不利的一件事是进行对用户可见的DOM更改。 计时的工作方式是，effect函数仅在浏览器完成布局和绘制后才会启动-如果您想进行视觉更改，为时已晚。

对于这些情况，React提供了useMutationEffect和useLayoutEffect钩子，除了它们被触发时机，它们的作用与useEffect相同。 看看[docs for useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)，尤其是有关[the timing of effects](https://reactjs.org/docs/hooks-reference.html#timing-of-effects)的部分，如果您需要进行可见的DOM更改。

这似乎是一个额外的麻烦。 另一件事要担心。 不幸的是，这有点。 这个（heh）的积极副作用是，由于useEffect在布局和绘制之后运行，因此缓慢的效果不会使UI变得混乱。 不利的一面是，如果要将旧代码从生命周期转移到挂钩，则必须谨慎一点，因为这意味着useEffect在计时方面几乎等同于componentDidUpdate。

## 试用useEffect
您可以在[启用了钩子的CodeSandbox](https://codesandbox.io/s/2px171lkmp)中尝试使用useEffect。 一些想法...

- 渲染输入框并使用useState存储其值。 然后在效果中设置document.title。 （例如[Dan在React Conf上的演示](https://www.youtube.com/watch?v=V-QO-KO90iQ&list=PLPxbbTqCLbGE5AihOSExAa4wUM-P42EIJ&index=2&t=0s)）

- 制作一个自定义挂钩，以从URL提取数据
- 将单击处理程序添加到文档，并在每次用户单击时打印一条消息。 （不要忘记清理处理程序！）

如果您需要灵感，请访问[Nik Graf的React Hooks集合](https://nikgraf.github.io/react-hooks/)-目前star数量为440！ 它们中的大多数很容易自行实现。 （例如useOnMount，我敢打赌，您可以根据您在本文中学到的知识实现该功能！）

![](https://img2020.cnblogs.com/blog/1347757/202010/1347757-20201001111100046-1760311937.png)

学习React可能会很麻烦-太多的库和工具！
我的建议？ 忽略所有人：)
有关循序渐进的方法，请访问我的[Pure React研讨会](https://purereact.com/)。

![](https://img2020.cnblogs.com/blog/1347757/202010/1347757-20201001111208184-8546856.png)
