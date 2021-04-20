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

// console.log(graph.toString());


/**
 * 图的遍历
 *
 */

function BFS(graph, startV, cb) {
  let vertexList = graph.getVertexList();
  let edgeList = graph.getEdgeList();
  let tagList = new Map();
  vertexList.forEach(item => {
    tagList.set(item, -1);
  });
  let queue = [];
  queue.push(startV);
  while (queue.length > 0) {
    let u = queue.shift();
    edgeList.get(u).forEach(e => {
      if (tagList.get(e) === -1) {
        tagList.set(e, 0);
        queue.push(e);
      }
    });
    tagList.set(u, 1);
    if (cb) cb(u);
  }
}

BFS(graph, 'A', value => console.log(`visited vertex: ${value}`));