
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
```
  // 定义节点
  function Node(element){
    this.element = element;
    this.prev = null;
    this.next = null;
  }

  function BinarySearchTree() {
    this.root = null;

    // 向树中插入一个节点
    BinarySearchTree.prototype.insert = (key) => {
      let newNode = new Node(key);
      if (this.root === null) this.root = newNode;
      else insertNode(this.root, newNode);
    }
    function insertNode(node,newNode) {
      if (newNode.element < node.element) {
        if (node.prev === null) node.prev = newNode;
        else insertNode(node.prev, newNode);
      } else {
        if (node.next === null) node.next = newNode;
        else insertNode(node.next, newNode);
      }
    }
    // 在树中查找一个节点
    BinarySearchTree.prototype.search = (node, key) => {
      if (node === null) return null;

      if (key < node.element) return searchNode(node.prev, key);
      else if (key > node.element) return searchNode(node.next, key);
      else return node;
    }

    // 通过中序遍历方式遍历树中的所有节点
    BinarySearchTree.prototype..inOrderTraverse = () => {
      if (node !== null) {
        preOrderTraverseNode(node.prev, callback);
        callback(node.element);
        preOrderTraverseNode(node.next, callback);
      }
    }

    // 通过先序遍历方式遍历树中的所有节点
    BinarySearchTree.prototype.preOrderTraverse = () => {
      if (node !== null) {
        callback(node.element);
        preOrderTraverseNode(node.prev, callback);
        preOrderTraverseNode(node.next, callback);
      }
    }

    // 通过后序遍历方式遍历树中的所有节点
    BinarySearchTree.prototype.postOrderTraverse = () => {
      if (node !== null) {
        preOrderTraverseNode(node.prev, callback);
        preOrderTraverseNode(node.next, callback);
        callback(node.element);
      }
    }

    // 返回树中的最小节点
    BinarySearchTree.prototype.min = (node) => {
      if (node === null) return null;

      while (node && node.prev !== null) {
          node = node.prev;
      }
      return node;
    }

    // 返回树中的最大节点
    BinarySearchTree.prototype.max = (node) => {
      if (node === null) return null;

      while (node && node.next !== null) {
          node = node.next;
      }
      return node;
    }

    // 从树中移除一个节点
    BinarySearchTree.prototype.remove = (node, key) => {
      if (node === null) return null;

      if (key < node.element) {
          node.prev = removeNode(node.prev, key);
          return node;
      } else if (key > node.element) {
          node.next = removeNode(node.next, key);
          return node;
      } else {
        // 第一种情况：一个叶子节点（没有子节点）
        if (node.prev === null && node.next === null) {
            node = null;
            return node;
        }
        // 第二种情况：只包含一个子节点
        if (node.prev === null) {
            node = node.next;
            return node;
        } else if (node.next === null) {
            node = node.prev;
            return node;
        }
        // 第三种情况：有两个子节点
        let aux = minNode(node.next);
        node.element = aux.element;
        node.next = removeNode(node.next, aux.element);
        return node;
      }
    }
}
```

### 参考
- [JavaScript数据结构——树的实现](https://www.cnblogs.com/jaxu/p/11309385.html)
