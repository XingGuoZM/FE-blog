### 是什么？
react架构改动，整体的数据结构从树改为链表

react新的生命周期增加了static getDerivedStateFromProps()以及getSnapshotBeforeUpdate()，废弃了原有的componentWillMount()、componentWillUpdate()以及componentWillReceiveProps()，

被废弃的三个函数都是在render之前，因为fiber的出现，很可能因为高优先级任务的出现而打断现有任务导致它们会被执行多次

### 为什么？
大量同步计算任务阻塞浏览器的ui渲染

### 怎么办？


### 小示例


## 参考
- [What is React Fiber ?](https://giamir.com/what-is-react-fiber)
- [React Fiber性能优化（内部试讲）](https://zhuanlan.zhihu.com/p/35578843)
- [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://indepth.dev/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react)
- [详谈 React Fiber 架构(1)](https://github.com/crazylxr/deep-in-react/blob/master/analysis/%E8%AF%A6%E8%B0%88%20React%20Fiber%20%E6%9E%B6%E6%9E%84(1).md)
- [为什么废弃react生命周期函数](https://www.html.cn/qa/react/14367.html)