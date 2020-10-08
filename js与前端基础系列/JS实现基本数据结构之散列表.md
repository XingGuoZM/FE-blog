
### 概述

散列表 又叫 哈希表 (hash table)。通过访问key而直接访问存储的value值。它的key - value之间存在一个映射函数，我们可以通过key值和“看不到”的映射函数（散列函数）访问对应的value值。这加快了查找的速度！存放记录的数组称做散列表

- insert(node): 向二叉树插入一个节点
- search(node): 在二叉树中查找一个节点
- inOrderTraverse(node,callback): 中序遍历二叉树 
- preOrderTraverse(node,callback): 先序遍历二叉树
- postOrderTraverse(node,callback): 后序遍历二叉树
- min(): 返回二叉树中最小的节点
- max(): 返回二叉树中最大的节点
- remove(node): 移除二叉树中指定节点

### 实现散列表
```
  // 定义节点
  function Node(element){
    this.element = element;
    this.prev = null;
    this.next = null;
  }

  function BinarySearchTree() {
 
  }
```

### 参考

- [js实现数据结构及算法之散列表(Hashtable)](https://juejin.im/post/6844903667934429197)
- [JavaScript数据结构——字典和散列表的实现](https://www.cnblogs.com/jaxu/p/11302315.html)