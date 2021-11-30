
### 什么是diff算法
计算一棵树形结构转换成另一棵树形结构的最少操作的算法

### diff算法的作用
用于比较两个树形结构的异同，通过循环递归对节点进行依次对比，效率低下，算法复杂度达到 O(n^3)

### react diff算法
react 16改动了react架构，从之前的树改为现在的链表。老diff比较算法的基本原理如下
1. web UI中DOM节点跨层级的移动操作特别少，可以忽略不计
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件会生成不同的树形结构
3. 对于同一层级的一组子节点，它们可以通过唯一的id来区分

**注：**如果出现了 DOM 节点跨层级的移动操作，会先创建节点再删除原有的节点，React 官方建议不要进行 DOM 节点跨层级的操作，所以在开发组件时，保持稳定的 DOM 结构会有助于性能的提升可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点

tree diff、component diff、element diff
处于同一层级的节点对比时，react diff提供插入、移动、删除三种方法。


### 对于key值
同层级节点的优化比较方法
1. 同级节点key值必须不一样
2. 尽量不要使用index作为key (如果使用index作为key,会有什么问题,怎么解决？当前并没有唯一标识字段自己怎么生成，可以用symbol吗，为什么？)

如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题

### react diff 和vue diff对比
1. 对比次序
  - react diff 从左往右依次对比
  - vue diff 从两边向中间对比
2. 更新真实dom的时机
  - react 遍历时收集所有需要更新的节点，形成一个list，最后统一更新，即批量更新
  - vue 遍历时就对比需要更新的节点，更新真实dom，即实时更新
3. 更新真实dom的方式
  - react 批量更新时先删除需要更新的节点，然后更新或者移动，最后插入
  - vue 在遍历时检测到更新节点，先用insertBefore插入新节点，修改真实dom，最后做删除操作。

参考
---
- [react官方文档 Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
- [一篇文章告诉你React里为什么不能用index作为key](https://juejin.im/post/6844903527836286989)
- [vue中使用v-for时为什么不能用index作为key？](https://segmentfault.com/a/1190000019961419)
- [详解 Diff 过程](https://github.com/crazylxr/deep-in-react/blob/master/analysis/%E8%AF%A6%E8%A7%A3%20Diff%20%E8%BF%87%E7%A8%8B.md)
- [React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)