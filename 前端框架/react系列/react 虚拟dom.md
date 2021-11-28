### 解释
使用javascript对象对真实dom的描述

对比更新前后两个虚拟dom的异同，动态的批量修改视图

直接操作dom的性能并不会低于虚拟dom和diff算法，甚至会更优

### jsx语法
js与html夹杂在一起

### react两种组件数据props和state

react组件可以比做一个家庭，props主外，state主内，可以没有state，但是props都会有。试想一下一个没有props和state的组件，是没有存在的意义的。

### 状态管理
单向数据流

唯一数据源

状态只读

数据改变只能通过纯函数完成

### react生命周期函数

装载过程  
- constructor
- getInitialState
- getDefaultProps
- componentWillMount
- render
- componentDidMount

更新过程  
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

### 性能优化
虚拟dom提高了渲染性能
key


### 问题汇总（FAQ）
- react把类似html的标记语言和javascript混在一起，jsx是进步还是倒退？
高内聚：把逻辑紧密相关的内容放在一个组件中
低耦合：不同组件之间的依赖关系尽量弱化，每个组件要尽量独立。

- react解决了什么问题？

- 虚拟dom的好处与不足？

- 为什么要做状态管理或者说react组件state和props的局限是什么？

- react性能优化




### 参考
- [从 React 历史的长河里聊虚拟DOM及其价值](https://mp.weixin.qq.com/s/zCGQEpEGJYQWMMvZfyUYHg)