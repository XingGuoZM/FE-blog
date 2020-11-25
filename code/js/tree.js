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

function traverse(root,res,count){
  if(!root) return ;
  if(!res[count]) res[count] = [];
  res[count].push(root.data);
  traverse(root.left,res,count+1);
  traverse(root.right,res,count+1);
}

let res = {};
let root = buildTree();
traverse(root,res,0);
console.log(res);
