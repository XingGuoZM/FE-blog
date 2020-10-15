原文地址：[What is React Fiber ?](https://giamir.com/what-is-react-fiber) 

在过去的几个月中，社区对最新版本的React的兴趣迅速增长，尤其是在2017年的Conf中, [ConfLin Clark](https://twitter.com/linclark)所做的出色工作解释了React Fiber如何与[cartoons](https://www.youtube.com/watch?list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0&v=ZCuYPiUIONs)一起使用之后 。

那么，简而言之，React Fiber是什么？

#### React Fiber是React reconciler的重新实现。

这是对React 15和旧版本reconciliation算法的彻底重写，该算法现在被追称为React Stack，因为它基于递归.

声明：以下是探索新的React Fiber reconciler代码库后的个人注释和推论。 某些内容可能是错误的或不是最新的，如果您发现任何错误,请开一个[pull request](https://github.com/giamir/giamir.github.io/edit/master/_posts/2017-04-23-what-is-react-fiber.md)。🙏

## 什么是reconciler？
当React首次问世时，最具革命性的功能是Virtual DOM，因为它使编写应用程序变得更加容易。 您无需告诉浏览器确切的操作来更新您的UI，而是告诉React应用程序的下一个状态应该是什么样，并且它将处理介于两者之间的所有事务。

#### reconciler是React的一部分，其中包含用于将一棵树与另一棵树进行比较以确定哪些部分需要更改的算法。

在过去的几年中，React被重构，因此对比和渲染是相互独立的阶段。 、reconciler负责计算树的哪些部分已更改； 然后，渲染器使用该信息来实际更新渲染的应用程序。 react-dom和react-native只是可插入React的[众多渲染器](https://github.com/chentsulin/awesome-react-renderer)中的两个。


您可以在[Reac官方文档](https://facebook.github.io/react/docs/reconciliation.html)中找到有关对比过程的更多信息。

## 为什么要改写reconciler？
可能的主要原因之一是我们在浏览器中遇到的历史问题：

#### 主线程与UI线程是相同的

渲染页面，响应用户操作，计算JS，管理网络活动以及操纵DOM都由浏览器主线程处理。 尽管今天可以使用Workers轻松安全地将其中的某些内容移动到另一个线程，但是只有主线程才能更改DOM。

在React应用程序中，当state更改或props更新时，render()函数创建一个新的React Elements树，然后React运行reconciliation算法以弄清楚如何有效地更新UI以匹配新树。

React Stack协调器始终在单个过程中同步处理组件树。 这样就会在主线程在递归过程完成之前无法进行潜在的紧急工作。 如果在用户碰巧输入文本时运行此计算，则您的应用可能会变得无响应，从而导致帧速率不稳定和输入不畅。

新的Fiber reconciler的主要目标是将可中断工作分成多个块，并能够为不同类型的更新分配优先级，以便主线程可以决定暂停diff算法，来做一些更紧急的工作，在之后又可以从其离开的地方继续。

如[React设计原则文档](https://facebook.github.io/react/contributing/design-principles.html#scheduling)的调度部分所述，Fiber将启用以下功能：

#### 如果任务不在屏幕可视范围之内，我们可以延迟与此相关的任何逻辑。 如果数据到达速度快于帧速率，我们可以合并和批量更新。 我们可以将用户交互（例如，由按钮单击引起的动画）的工作优先于次要的后台工作（例如，渲染刚从网络加载的新内容），以避免掉帧。

## 三角形demo
为了更好地理解React Fiber给我们的React应用程序提供的好处，被认为是React Core Team的“技术负责人”的SebastianMarkbåge建立了一个有用的分形的示例。 观看以下视频：

Fiber三角演示现在允许您打开和关闭时间切片。 可以使查看效果更容易。 感谢[@giamir](https://twitter.com/giamir)的PR！ 🎉[pic.twitter.com/qhsWUIyXPf](https://t.co/qhsWUIyXPf)


-安德鲁·克拉克（@acdlite）[2017年3月27日](https://twitter.com/acdlite/status/846456239693344769)
可以在[React 官方github仓库](https://github.com/facebook/react/blob/master/fixtures/fiber-triangle/index.html)中找到Triangles Demo的源代码。

从视频中可以看到，此演示中进行了2种不同的更新。

一种使三角形变窄和变宽，必须每16毫秒（60 FPS）发生一次，动画才能看起来平滑，而另一种则使每个点中包含的数字更新，大约每1000毫秒发生一次。

该示例非常适合分析分配不同优先级的情况，我们希望能够为不同类型的更新分配不同的优先级。 使三角形变宽和变窄的动画更新比数字的更新更重要。 如果数字更新有些延迟，用户可能甚至不会注意到它。 另一方面，如果动画开始丢帧，我们很快就能发现它。

让我们使用此示例检查Fiber reconciler的工作原理以及如何将工作拆分为多个部分。

## 体验React Fiber架构
安德鲁·克拉克（Andrew Clark）的React Fiber Architecture文档很好地解释了Fiber实现背后的想法，我在这里引用一下：

#### Fiber是堆栈的重新实现，专门用于React组件。 您可以将单根光纤视为虚拟堆栈框架。

重新实现堆栈的优点是，您可以将堆栈帧保留在内存中，并根据需要（以及在任何时候）执行它们。 这对于实现我们计划的目标至关重要。

以及更多详细信息：

#### fiber是一个JavaScript对象，其中包含有关组件及其输入和输出的信息。 在任何时候，一个组件实例最多具有两个与其相对应的fiber：当前的fiber，缓存中的fiber和在进行中的fiber。

这是一个非常简化的fiber（虚拟堆栈框架）版本：

```
{
  stateNode,
  child,
  siblings,
  return,
  alternate,
  type,
  key
}
```

挖掘fiber的性能超出了本文的主旨。

如果您有兴趣了解它们，我强烈建议您阅读由[Andrew Clark](https://twitter.com/acdlite)撰写的[文档](https://github.com/acdlite/react-fiber-architecture)。 您也可以玩由[Dan Abramov](https://twitter.com/dan_abramov)开发的[Fiber Debugger](https://github.com/facebook/react/tree/master/fixtures/fiber-debugger) ）以可视化方式呈现Fiber内部是怎么工作的。

![Animation Update Timeline](https://s3.eu-west-2.amazonaws.com/websitegiamir/triangles-demo-animation-update.png)
三角演示中的动画更新时间轴。

React Fiber在reconciliation算法中的各个阶段介绍。

在第一个渲染/对比阶段，Fiber将构建一个进行中的树，并找出为更新UI而需要进行更改的列表。 但是，在此阶段，它不会进行任何实际更改。

这个第一阶段是可中断的，我们将在示例的后面看到如何使这种特殊性成为关键，以允许高优先级的更新先于低优先级的更新。

然后是一个提交阶段，在此阶段，Fiber实际上将对DOM进行上一阶段中指出的所有更改。

第二阶段是不间断的，因为我们不想以不一致的UI结束。 部分更新可能会使用户感到不适，而Fiber会避免这样做。

在提交阶段，fiber还将调用生命周期挂钩并处理错误及边界情况。

## 没有时间切片的三角形演示（不稳定的动画）
让我们尝试从下面的时间轴中找出导致不稳定动画的原因。

![Triangles Demo without Time Slicing](https://s3.eu-west-2.amazonaws.com/websitegiamir/triangles-demo-without-time-slicing.png)

动画和数字可从Triangles演示中更新时间线，而无需进行时间分割。

从上图中可以看到，当触发数字更新时，Fiber将遍历整个树以寻找更改，同时构建进行中的树。 这使主线程保持繁忙状态约350ms。

阻止主线程管理动画更新会导致帧过长，因此，用户看到的效果将是一个不稳定的动作。

发生这种情况是因为我们在React模式的兼容模式下使用React Fiber。 没有考虑更新的优先级，它们被同步处理了。

## 带时间切片的三角形演示（平滑动画）
现在，让我们分析Fiber如何推迟更新以避免丢失帧。 Fiber的此功能也称为时间分片或异步setState。

![Triangles Demo with Time Slicing](https://s3.eu-west-2.amazonaws.com/websitegiamir/triangles-demo-with-time-slicing.png)

动画和数字通过时间切片从Triangles演示中更新时间轴。

这次，我们使用新的invalid_deferredUpdates API更新数字：

```
ReactDOM.unstable_deferredUpdates(() => {
  this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
});
```

要记住的一件事是，我们将传递一个更新程序函数给setState而不是普通对象。 为了推迟更新，这是必需的。 有关功能setState的更多信息，请参见[这篇文章](https://medium.freecodecamp.com/functional-setstate-is-the-future-of-react-374f30401b6b)。

触发数字更新时（如您从图片中看到的那样），React只是调用requestIdleCallBack函数，它甚至没有开始寻找新树中的更改。

现在认为Numbers更新的优先级较低，因此推迟了更新。

我猜您想知道这是什么[requestIdleCallback函数]（https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback）。
```
requestIdleCallback(callback);
```

#### requestIdleCallback是window的一个方法，它提供了一种与浏览器的整体工作计划进行协作的方法。

一旦给requestIdleCallback传递了回调函数确定了空闲时间，主线程就会对其进行评估。 各个绘制帧之间的空闲时间可能是几毫秒。

因此，requestIdleCallback为Fiber提供了一种有效的方式来了解主线程何时有“空闲时间”来完成某些工作。

再次关注三角演示，我们可以在图片上看到大量的更新对比阶段。 当空闲的回调事件被触发时，大部分工作开始：浏览器告诉Fiber它有一些“空闲时间”来工作。

浏览器还为Fibre提供了一个剩余时间值，该值提供了对当前空闲时间段剩余的毫秒数的估计。 这段时间结束后，Fiber知道它必须停止工作并将控制权交还给主线程，而这有更重要的事情要做。 在我们的例子中是动画更新。

在将控制权传递给主线程之前，Fiber确保再次调用requestIdleCallback，因为它只是暂停了对比阶段，并且仍然有剩余工作。 一旦标识了新的空闲周期，它就需要主线程返回它。

![Numbers Update Chunk](https://s3.eu-west-2.amazonaws.com/websitegiamir/triangles-demo-numbers-update.png)

数字通过时间切片从Triangles demo中更新块时间轴。

上图显示了数字更新对比阶段的一部分。 在这一特定工作中，fiber设法更新了729个中的18个点。 这表明该工作已被拆分为约40小块，从而使主线程可以处理动画更新和重新绘制40次。

这种与主线程“协作”以完成工作的方式在名为[合作调度](https://w3c.github.io/requestidlecallback)中是众所周知的，它从操作系统的世界获得[灵感](https://en.wikipedia.org/wiki/Cooperative_multitasking)。

因此，由于有了协作式调度，当主线程需要处理更紧急的事情时，Fiber可以中断工作，而对于三角形演示，这可以反映出更流畅的动画而不会丢帧。

## 我今天可以使用React Fiber吗？
是的，React 16是在fiber架构之上构建的React的第一个版本，已于去年9月正式发布。

Facebook的人们非常关心[稳定性](https://facebook.github.io/react/contributing/design-principles.html#stability); 因此，尽管对协调器进行了完全重写，但React 16仍保持与旧版本React相同的公共API。

#### 默认情况下，React 16中启用了Fiber协调器。

您只需安装最新的React稳定版本即可立即开始使用Fiber。 如果您需要从旧版本的库进行升级，React核心团队将整理一个非常有用的[升级指南](https://reactjs.org/blog/2017/09/26/react-v16.0.html＃upgrading)。

## React Fiber引入了哪些新功能？

React Fiber为许多新功能打开了大门。 其中一些现在已经稳定可用：
- 错误边界：从渲染方法中引发的错误中恢复
- 门户：将子树渲染到DOM节点容器中
- 新的渲染返回类型：片段和字符串
- 服务器渲染器的流模式
考虑到React 16发行版主要侧重于向后兼容性，由于协调器重写，我们已经可以使用的大量新的稳定功能令人印象深刻。您可以在[Official React 16新闻稿](https://reactjs.org/blog/2017/09/26/react-v16.0.html)中对此新功能进行更深入的概述。

在撰写本文时，异步渲染功能仍然不稳定，但是它们是React核心团队正在研究的主要领域。上面说明的Triangles演示属于此开发领域。能够确定优先级并安排更新被认为是React的未来，在接下来的几个发行版中，我们可以预期会有更多的异步渲染功能变得稳定。

您可以在[这个线程](https://github.com/facebook/react/issues/8830)中了解有关异步渲染功能状态的更多信息。

## 总结
因此，简而言之，您为什么应该对React Reconciler算法的这个闪亮的新版本感到兴奋？

- 它使应用程序更流畅，更负责任，允许高优先级更新跳到低优先级更新之前。 它通过将工作分解为可以暂停的小工作单元来实现。
- 将来，通过拆分树的分支并进行并行分析，它可以有效地并行处理多个工作人员之间的工作。
- 从长远来看，它将缩短启动时间渲染组件，因为它们可用于浏览器，而无需等待整个软件包被下载。

#### React的前途一片光明，充满了新的可能性

## 参考文献
- [A cartoon intro to Fiber](https://www.youtube.com/watch?list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0&v=ZCuYPiUIONs)
- [Unofficial React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
- [W3C: Cooperative Scheduling of Background Tasks](https://www.w3.org/TR/requestidlecallback)
- [Fiber Principles: Contributing To Fiber](https://github.com/facebook/react/issues/7942)
- [Is Fiber Ready Yet?](http://isfiberreadyyet.com/)