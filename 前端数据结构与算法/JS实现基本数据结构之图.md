
### 概述


- addVertex(v):向图中添加新的顶点
- addEdge(a,b):向图中添加a和b两个顶点之间的边

### 图的表示
- 邻接矩阵
- 邻接表
- 关联矩阵

### 图的遍历

### 实现图
```js
  // 创建图
/**
 * 点--点：邻接矩阵、邻接表
 * 点--边：关联矩阵
 */

function Graph() {
  this.vertexList = new Set();
  this.edgeList = new Map();

  this.addVertex = function (v) {
    this.vertexList.add(v);
    this.edgeList.set(v, []);
  }
  this.addEdge = function (a, b) {
    this.vertexList.add(a);
    this.vertexList.add(b);
    this.edgeList.get(a).push(b);
    this.edgeList.get(b).push(a);
  }
  this.getVertexList = function () {
    return this.vertexList;
  }
  this.getEdgeList = function () {
    return this.edgeList;
  }
  this.toString = function () {
    let s = '';
    this.vertexList.forEach(v => {
      s += `${v}->`;
      this.edgeList.get(v).forEach(e => {
        s += `${e}`;
      });
      s += '\n';
    });
    return s;
  }
}

// 测试
let graph = new Graph();
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
myVertices.forEach((v) => {
  graph.addVertex(v);
});
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
```

### 参考
- [JavaScript数据结构——图的实现](https://www.cnblogs.com/jaxu/p/11338294.html)
