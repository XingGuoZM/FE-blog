
### 概述

二叉树中的节点最多只能有两个子节点，一个是左子节点，一个是右子节点。左右子节点的顺序不能颠倒

- insert(node): 向二叉树插入一个节点
- search(node): 在二叉树中查找一个节点
- inOrderTraverse(node,callback): 中序遍历二叉树 
- preOrderTraverse(node,callback): 先序遍历二叉树
- postOrderTraverse(node,callback): 后序遍历二叉树
- min(): 返回二叉树中最小的节点
- max(): 返回二叉树中最大的节点
- remove(node): 移除二叉树中指定节点

### 实现二叉树
```js
  function Graph {
    this.vertices = []; // 用来存放图中的顶点
    this.adjList = new Dictionary(); // 用来存放图中的边

    // 向图中添加一个新顶点
    Graph.prototype.addVertex = (v) => {

    }

    // 向图中添加a和b两个顶点之间的边
    Graph.prototype.addEdge = (a, b) => {
        
    }
}
```

### 参考
- [JavaScript数据结构——图的实现](https://www.cnblogs.com/jaxu/p/11338294.html)
