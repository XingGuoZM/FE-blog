
/**
 * 循环法
 * @param {*} count 
 */
function add1(count) {
  let ans = 0;
  for (let i = 0; i <= count; i++) {
    ans += i;
  }
  return ans;
}

/**
 * 递归法
 * @param {*} count 
 */
function add2(count) {
  if (count === 0) return 0;
  count--;
  return add2(count) + count + 1
}


// 测试
let ans = add2(2);
console.log(ans);