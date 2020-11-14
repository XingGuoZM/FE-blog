
/**
 * 贪心算法
 * 分饼干问题
 * @param {*} children 
 * @param {*} cookies 
 */
function greedyCookie(children, cookies) {
  children.sort((a,b)=>a-b);
  cookies.sort((a,b)=>a-b);

  let count = 0;
  let child = 0;

  for(let i=0;i<children.length && child<cookies.length;i++){
    if(children[child]<=cookies[i]){
      count++;
      child++
    }
  }
  return count;
}

const ans = greedyCookie([2,1,3],[1,1]);
console.log(arr);