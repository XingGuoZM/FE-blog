
/**
 * 数字金额化：
 * @param {*} num 
 * 入参： 数字，例如：459087578
 * 出参：字符串并逗号分割，例如：89,459,087,578
 */

/**
 * 方法一
 */
function num2amount1(num){
  
  if(isNaN(num)){
    return num;
  }
  num += '';
  let ans = '';
  const len = num.length;
  for(let i = 0; i < len; i++) {
    (i % 3 === 0 && i !== 0) ? ans = num[len-i-1] + ',' + ans : ans = num[len-i-1] + ans;
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
  let prefix=false;
  let suffix='';
  // 非数字类型, 特别注意NaN情况，使用isNaN判断
  if(typeof num != 'number' || isNaN(num)) {
    return '-';
  }
  // 负数
  if (num < 0) {
    return 0;
  }
  // 判断是否超过JavaScript的最大的安全整数
  if (!Number.isSafeInteger(num)) {

  }
  let numStr=String(num);
  // 小数
  if(numStr.indexOf('.')){
    suffix = '.' + numStr.split('.')[1];
    numStr = numStr.split('.')[0];
  }
  
  return (numStr).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
}
/**
 * 方法四
 * @param {*} num 
 */
function num2amount4(num){
  return (num+'').split('').reduceRight((pre, curr, index) => index % 3 === 1 ? `${curr},${pre}` : curr + pre);
}


// 测试
// let num = 89787667766876;

// let ans1 = num2amount1(num);
// let ans2 = num2amount2(num);
// let ans3 = num2amount3(num);
// let ans4 = num2amount4(num);
// console.log(ans1);// 89,787,667,766,876
// console.log(ans2);// 89,787,667,766,876
// console.log(ans3);// 89,787,667,766,876
// console.log(ans4);// 89,787,667,766,876


// 测试用例
/**
 * 情况一：正常情况，正整数，如8887677677566
 * 情况二：非数值类型，如布尔值（true），字符串（'1233456333'）,对象（{name:123}）等
 * 情况三：负数，如-22221
 * 情况四：小数，如89877768866.098
 * 情况六：大数，如1000000000000000000000000000000
 * 情况七：边界情况，如undefine, null
 */
let ans3 = num2amount3(1000000000000000000000000000000);
console.log(ans3);
 