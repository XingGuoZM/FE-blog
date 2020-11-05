
/**
 * 数字金额化：
 * @param {*} num 
 * 入参： 数字，例如：459087578
 * 出参：字符串并逗号分割，例如：89,459,087,578
 */


/**
 * 
 * 方法一
 */
function num2amount1(num){
  num += '';
  let ans = '';
  const len = num.length;
  for(let i = 0; i < len; i++) {
    i % 3 === 1 ? ans = num[len-i-1] + ',' + ans : ans = num[len-i-1] + ans;
  }
  return ans;
}
/**
 * 方法二
 * @param {*} num 
 */
function num2amount2(num){
  return (num).toLocaleString('en-US');
}

/**
 * 方法三
 * @param {*} num 
 */
function num2amount3(num){
  return (num+'').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/**
 * 方法四
 * @param {*} num 
 */
function num2amount4(num){
  return (num+'').split('').reduceRight((pre, curr, index) => index % 3 === 1 ? `${curr},${pre}` : curr + pre);
}

let num = 89787667766876;

let ans = num2amount4(num);
console.log(ans);