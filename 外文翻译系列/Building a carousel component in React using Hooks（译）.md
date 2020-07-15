原文地址：[Building a carousel component in React using Hooks](https://blog.logrocket.com/building-carousel-component-react-hooks/) 

![building-carousel-react-using-only-hook-nocdn.jpg](https://blog.logrocket.com/wp-content/uploads/2019/08/building-carousel-react-using-only-hook-nocdn.jpg)

不同层之间的关联关系是当今web开发的问题之一，我们不仅面临着多个依赖的强耦合，而且还将逻辑代码直接和一些样式或者表现层的代码混杂在一起，结果可能仍然比几年前的类似的代码更易于复用，但是复用肯定比原先的要难的多。

在这篇文章中，我们着眼于实现一个轮播组件，该轮播组件通过使用React Hooks来尽量简化这些关联关系。

### 介绍  
查看React周边可用的轮播实现的情况会让人吓一跳，它们太多了，每个都作了不同的约定，它们有许多很老，而有些非常受欢迎，有些附带了许多依赖。然而，有一个共同点，他们对视图层和样式都持有看法。

对我们来说，我们不想这样。我们脑海里已经有一套自己的样式，我们想要复用同一个轮播不同的样式，而不仅仅去选择，例如：一些箭头的不同的颜色，但事实上我们只能完全选择某个箭头。理想的方式是，组件的整体的使用取决于用户。最后，我们决定使用React Hooks来进行实现  

### 什么是Hooks？
React Hooks已经被介绍说为了简化代码复用，React团队推出Hooks的原因之一是为了避免使用class组件而需要对Javascript有更高的能力要求以及带来更高的出错风险。根本原因是对JavaScript中this的正确理解，对于来自其他语言的人们来说这是所有，但是很直观。

在JavaScript中，this是上下文绑定的而不是实例绑定的。例如，如果一个方法作为回调函数传递，那么他会失去上下文。如果这个方法像函数一样调用，上下文将会变成undefined。因此，为了避免这种情况，必须在方法中this的捕获上下文。可以为方法包一层(()=>fn())的形式来捕获this,使用一个箭头函数(f=()=>{})，或者使用bind(f=f.bind(this))来绑定this。

引入Hooks的另一个原因是它拥有更简单处理组件的状态和生命周期的复用代码的能力。先前，我们可以用React class组件的minxins，但是他们存在很多问题，并且弊大于利。这里的核心问题在于mixins分别在不同的生命周期函数中运行。它们也只是在class组件实例中运行，这就表明不同的mixins相互覆盖(例如变量被覆盖)的概率很高。

通过使用React Hooks，我们可以很容易的将复杂的行为逻辑从它的表现视图中分开。结果，代码可以像这样被读取：
```
const MyCarousel = ({ slideTime }) => {
  const carouselBehavior = useCarousel(slideTime);
  return <div className="my-carousel">...</div>;
};
```
尽管已经有很多核心Hooks了，但最有趣的还是useState(创建或者获取状态单元)和useEffect(在某些情况下给我们提供执行副作用的能力)。一旦状态变得复杂，useReducer可能派上用场。

Hooks的流程(或者说生命周期)被很的的总结如下图：

![Hook Flow Diagram](https://i2.wp.com/blog.logrocket.com/wp-content/uploads/2019/08/hook-flow-e1564426324324.png)

React Hooks是与React调度程序结合使用的简单函数。因此，他们需要在渲染的时候（相应的组件）被调用，并且他们必须同时出现。导致的结果就是React Hooks不能在条件或者循环内，此外，他们只能由函数组件使用。

### 什么是轮播？
轮播是一个UI组件，它可以利用单个可视视图轮流展示多项视图列表。这些项目在视图中轮转展示。有一些轮播可以定时触发轮转；其他的轮播可以允许用户与项目上的交互区域的要点（自由导航）进行交互，或者箭头（向前或向后）。在移动端，一种比较流行的模式是向前或向后滑动。

因此，轮播的基本状态可以写成这样：
```
const [current, setCurrent] = React.useState(0);
```
传入初始值调用useState Hooks的结果是一个元组（即，一个固定长度的数组），这个元组包含当前变量的值和可以改变这个变量值的回调函数。在这里，元组为我们简化了自定义命名。

如果我们想要在固定时间之后（时间，以毫秒为单位）进行自动轮转，我们可以这样做：
```
React.useEffect(() => {
  const next = (current + 1) % slides.length;
  const id = setTimeout(() => setCurrent(next), time);
  return () => clearTimeout(id);
}, [current]);
```
幻灯片（视图项目）的数量取决于给定幻灯片的长度。由于取模运算，我们确定当前的幻灯片总是在0（包含）和幻灯片总数（不包含）之间的。

有趣的是，我们可以使用useEffect的第二个参数来决定何时必要触发副作用。通过设置一个数组来告诉React处理之前的效果（有效的调用clearTimeout），如果有的话，再次运行。

因此，自然地，我们需要在用户交互之后清除计时器（去往任何一张幻灯片，例如，向前），不然的话将会出现类似setInterval的效果，但更易于控制并且更符合React Hooks的核心思想。

### 期望表现  
好的，现在我们已经为轮播提供了两个潜在的构建板块，坦白说，对于一个简单的轮播实现有2个构建板块已经足够了。让我们看看我们想拥有什么样的表现。

明显地，我们的轮播应该能够自动轮转，为此，我们需要像之前介绍的那样的效果。但是除此之外，用户需要能够向前或者向后拖动当前幻灯片。借助css的animation，这个过程应该会非常顺利流畅。当用户开始拖动时，自动轮转需要重置。

为了区分不同的模式，我们引入了一下状态变量，它们在许多情况下是共同设置的：
```
const initialCarouselState = {
  offset: 0,
  desired: 0,
  active: 0
};
```
offset是用来记录用户当前拖拽的偏移量的。同样的，需要定义desired和active两个变量来指示当前展示的幻灯片和实际要转到的幻灯片。过渡期间，两者是不同的。

我们要达到拖拽和平滑滚动的要求，我们需要的并不仅仅只是N张幻灯片（或者图片）轮转，而实际上需要N+2。我们要求的结构应该如下图所示：

![Hook Flow Diagram](https://i1.wp.com/blog.logrocket.com/wp-content/uploads/2019/08/carousel-hooks-1.png)  

当我们通常从第一张幻灯片开始时，我们必须事先插入一张幻灯片(真正的第0张，指的是第N张)。当我们向左滑动或者要向左滑动时，这张伪幻灯片将会派上用场。但是要注意，一旦我们到达这张幻灯片的时候，我们将重置为真实的幻灯片（不用任何过渡）。

一旦我们进入了幻灯片的区域，向前或向后都不会有问题。

![Inside The Slide Deck](https://i2.wp.com/blog.logrocket.com/wp-content/uploads/2019/08/carousel-hooks-2.png)

在第一页幻灯片出现的问题也能够在最后一张幻灯片中看到。在这种情况下，问题不在于前进（向右滑动），而在后退（向左滑动）。我们的解决办法是插入一张伪幻灯片（真实的第N+1张）,这次指的是第一张。

![Ending At The Last Slide](https://i2.wp.com/blog.logrocket.com/wp-content/uploads/2019/08/carousel-hooks-N.png)  

请记住,虽然可见的容器需要设置为overflow: hidden,但是内部容器将会延伸到屏幕之外。因此，相对于可见的容器（轮播），内部容器的实际宽度为 (N+2)*100% 。

不过，内部容器内部的过渡指的是内部容器的宽度。因此，虽然内部容器的宽度可能是例如500%（对于3张幻灯片来说），幻灯片从一张过渡到另外一张的平移量总是会小于100%。由于幻灯片的数量最小为3（一张真实的幻灯片附带2张伪幻灯片--指的是同一张幻灯片），因此最大的平移尺寸为33%。假如有8张真实的幻灯片（即总共有10张幻灯片），我们会在10%的平移量之间进行转变。

### 实现  
由于状态变量是共用的，我们应该使用useReducer Hook。如前文描述的那样，基于轮播状态的一种可能实现方案如下：
```
function carouselReducer(state, action) {
  switch (action.type) {
    case "jump":
      return {
        ...state,
        desired: action.desired
      };
    case "next":
      return {
        ...state,
        desired: next(action.length, state.active)
      };
    case "prev":
      return {
        ...state,
        desired: previous(action.length, state.active)
      };
    case "done":
      return {
        ...state,
        offset: NaN,
        active: state.desired
      };
    case "drag":
      return {
        ...state,
        offset: action.offset
      };
    default:
      return state;
  }
}
```
使用carouseReducer一样很简单：
```
const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
```
可以通过库（react-swipeable）来引入高级的触摸手势（滑动）。该库已经提供了一个Hook
```
const handlers = useSwipeable({
  onSwiping(e) {
    dispatch({
      type: "drag",
      offset: -e.deltaX
    });
  },
  onSwipedLeft(e) {
    const t = threshold(e.event.target);

    if (e.deltaX >= t) {
      dispatch({
        type: "next",
        length
      });
    } else {
      dispatch({
        type: "drag",
        offset: 0
      });
    }
  },
  onSwipedRight(e) {
    const t = threshold(e.event.target);

    if (-e.deltaX >= t) {
      dispatch({
        type: "prev",
        length
      });
    } else {
      dispatch({
        type: "drag",
        offset: 0
      });
    }
  },
  trackMouse: true,
  trackTouch: true
});
```
返回值是一个可以绑定在任何容器上供拖拽操作的处理程序。阈值可以设置成任何值。在这个实现程序中，我们将它设置成container宽度的三分之一（通过e.event.target获取）。

换句话说，在前面的代码中，我们区分以下情况：

- 当前正在进行拖拽操作，我们需要在state中反映当前的进度  
- 一个拖拽操作成功完成了之后，我们需要进行后一个或者前一个幻灯片  
- 一个拖拽操作未3成功的时候，现在我们需要重置offset值  

整个状态更新都由useEffect来协助安排正确的时机。
```
useEffect(() => {
  const id = setTimeout(() => dispatch({ type: "next", length }), interval);
  return () => clearTimeout(id);
}, [state.offset, state.active]);

useEffect(() => {
  const id = setTimeout(() => dispatch({ type: "done" }), transitionTime);
  return () => clearTimeout(id);
}, [state.desired]);
```

正如前文提到的那样，第一个useEffect作出的响应是自动轮转。与前文介绍的代码唯一不同的地方是使用另外的依赖项来触发/处理转动。由于我们的需要，我们还引入offset.因此，如果拖拽操作正在执行，我们将不会触发自动轮转。

需要利用第二个useEffect将活动状态设置成所需状态。我们使用CSS的transition，是因为我们不能通过js来控制transition。因此，需要在同一时间延时来帮助我们。

对于过渡，我们设置以下常量：
```
const transitionTime = 400;
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
const smooth = `transform ${transitionTime}ms ease`;
```

当拖动当前幻灯片不足以向前或向后移动时，弹性过渡用于指示“反弹”,当我们移动到另外一张幻灯片时，偏向于平滑的过渡。

最后，useCarousel Hook的一种用法如下所示：
```
export const Carousel = ({ slides, interval = 5000 }) => {
  const length = slides.length;
  const [active, setActive, handlers, style] = useCarousel(length, interval);

  return (
    length > 0 && (
      <div className="carousel">
        <ol className="carousel-indicators">
          {slides.map((_, index) => (
            <li
              onClick={() => setActive(index)}
              key={index}
              className={`${active === index ? "active" : ""}`}
            />
          ))}
        </ol>
        <div className="carousel-content" {...handlers} style={style}>
          <div className="carousel-item">{slides[slides.length - 1]}</div>
          {slides.map((slide, index) => (
            <div className="carousel-item" key={index}>
              {slide}
            </div>
          ))}
          <div className="carousel-item">{slides[0]}</div>
        </div>
      </div>
    )
  );
};
```
请注意，我们在介绍表现部分时，描述了两个重复项；第一个轮播项（参考最后一张幻灯片）和最后一个轮播项（参考第一张幻灯片）是可以继续拖拽，从而可以产生周期连续不断的体验（就像轮播那样，即有固定周期围绕的物体）。

确切的样式 - 例如指示物需要放在哪里，或者我们是否使用指示物完全取决于我们自己。展示层也与行为逻辑解耦。我们只会收到已经确定过渡展示逻辑的样式。同样的，我们收到附加的处理程序，在该处我们可以看到交互点。

### 结论  
使用React Hooks，我们距离复用软件更进了一步。在给定的示例中，我们构造了一个非常复杂的UI组件，该组件能够以多种形式重用。 完整代码可在[GitHub](https://gist.github.com/FlorianRappl/fee731eea985d983fc48d10c648ecb17)上找到

我不确定，也许useLayoutEffect会更好，但我初次试验表明useEffect已经足够好。你的想法和偏好是什么？你在哪里看到Hooks的闪光点？在评论区，我很想听听你的想法。

### 全面了解生产环境下的React应用  
React应用的调试可能会非常困难，尤其是当用户遇到无法重现的问题时。如果你对监听和跟踪Redux的状态，自动显示JavaScript的错误和跟踪缓慢的网络请求和组件加载时间有兴趣的话，试一试[LogRocket](https://www2.logrocket.com/react-performance-monitoring)。

![LogRocket Dashboard Free Trial Banner](https://i1.wp.com/blog.logrocket.com/wp-content/uploads/2017/03/1d0cd-1s_rmyo6nbrasp-xtvbaxfg.png)

LogRocket就像Web应用程序的DVR，实际上记录了React应用程序上发生的所有事情。 无需猜测为什么会发生问题，您可以汇总并报告问题发生时应用程序所处的状态。 LogRocket还监视您的应用性能，并使用客户端CPU负载，客户端内存使用情况等指标进行报告。

LogRocket Redux中间件软件包在您的用户会话中增加了一层可见性。 LogRocket记录Redux存储中的所有操作和状态。

现代化如何调试React应用程序-免费开始监视。


