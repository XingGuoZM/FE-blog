function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

//   1
// 2    3
//   4 5 6
function buildTree() {
  let root = new Node(1);
  root.left = new Node(2);
  root.right = new Node(3);

  root.left.right = new Node(4);
  root.right.left = new Node(5);
  root.right.right = new Node(6);
  return root;
}

function traverse(root, res, count) {
  if (!root) return;
  if (!res[count]) res[count] = [];
  res[count].push(root.data);
  traverse(root.left, res, count + 1);
  traverse(root.right, res, count + 1);
}

// 层序遍历(递归)
function levelTraverse1(root) {
  const res = [];
  function levelOrder(node, level) {
    if (!node) return;
    res[level] = res[level] || [];
    res[level].push(node.data);
    levelOrder(node.left, level + 1);
    levelOrder(node.right, level + 1);
  }
  levelOrder(root, 0);
  return res;
}
// 层序遍历(队列)
function levelTraverse2(root) {
  if (!root) return;
  const res = [];
  let level = 0;
  const queue = [root];
  while (queue.length > 0) {
    res.push([]);
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      res[level].push(node.data);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    ++level;
  }
  return res;
}

let res = {};
let root = buildTree();
const ans = levelTraverse2(root);
console.log(ans);
// traverse(root,res,0);
// console.log(res);
