//手写一个useState函数

let state;
function useState(initialState){
  state = initialState;
  let arr=[]
  arr[0]=state;
  arr[1] = function(val){
    state=val
  }
  return arr;
}

// console.log(useState(0));
const [count,setCount] = useState(0);
setCount(1);
console.log(count);