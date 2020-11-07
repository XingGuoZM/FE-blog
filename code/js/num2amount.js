
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
function num2amount(num){
  let suffix='';
  let numStr='';
  if (isNumber(num) || isNumberString(num) || isBigInt(num)) {
    // 判断是否为负数,大数超过MAX_SAFE_INTEGER,
    if(Number(num) < 0) return 0;
    if(isBigInt(num)) return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    numStr=String(num);
    // 判断小数
    if(String(num).indexOf('.')>0) {
      numStr=Number(num).toFixed(2);
      splitStr=numStr.split('.');
      numStr=splitStr[0];
      suffix=`.${splitStr[1]}`;
    }
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')+suffix;
  }
  return '-';
}
//是否是有效的数字类型
function isNumber(num){
  return typeof num == 'number' && !isNaN(num);
}
// 判断是否是大数
function isBigInt(num){
  return typeof num == 'bigint';
}
// 判断是否为有效的数字字符串
function isNumberString(str){
  return typeof str == 'string' && !isNaN(Number(str));
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
 * 情况一：正常情况，正整数，字符串，如8887677677566, '1233456333'
 * 情况二：非数值类型，如布尔值（true）,对象（{name:123}）等
 * 情况三：负数，如-22221
 * 情况四：小数，如89877768866.098
 * 情况五：大数，如1000000000000000000000000000000
 * 情况六：边界情况，如undefine, null
 */
let ans1 = num2amount('1233456333');//1,233,456
let ans2 = num2amount(true);// -
let ans3 = num2amount(-2); // 0
let ans4 = num2amount(89877768866.098); // 877,768,866.10
let ans5 = num2amount(1000000000000000000000000000000n);//1,000,000,000,000,000,000,000,000,000,000
let ans6 = num2amount(null); // -
let ans7 = num2amount(); // -
console.log(ans1,ans2,ans3,ans4,ans5,ans6,ans7);
 