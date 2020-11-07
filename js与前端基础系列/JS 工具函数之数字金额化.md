
四种方法
---
```js

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
  return (num+'').split('').reduceRight((pre, curr, index) => index % 3 === 1 ? curr + ',' + pre : curr + pre);
}

// 测试
let num = 89787667766876;

let ans1 = num2amount1(num);
let ans2 = num2amount2(num);
let ans3 = num2amount3(num);
let ans4 = num2amount4(num);
console.log(ans1);// 89,787,667,766,876
console.log(ans2);// 89,787,667,766,876
console.log(ans3);// 89,787,667,766,876
console.log(ans4);// 89,787,667,766,876
```

现在看起来基本没毛病，可是能实现是一回事，能不能来出来溜溜，提供给其他人使用又是另外一回事。真实的情况很复杂多变，很多情况都需要考虑到。下面列出几个测试情况，开发也要学会弄测试用例，用测试的思维做开发，用产品的思维做开发。如果我们对num2amount函数的入参弄些不规则的值，例如如下情况。

 * 情况一：正常情况，正整数，如8887677677566
 * 情况二：非数值类型，如布尔值（true），字符串（'1233456333'）,对象（{name:123}）等
 * 情况三：负数，如-22221
 * 情况四：小数，如89877768866.098
 * 情况五：大数，如1000000000000000000000000000000
 * 情况六：边界情况，如undefine, null

我们针对以上情况对工具函数进行改造，给出的解决方案,以正则为例写出如下代码
```js
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
// 判断是否是任意大的整数
function isBigInt(num){
  return typeof num == 'bigint';
}
// 判断是否为有效的数字字符串
function isNumberString(str){
  return typeof str == 'string' && !isNaN(Number(str));
}


// 测试结果
let ans1 = num2amount('1233456333');//1,233,456
let ans2 = num2amount(true);// -
let ans3 = num2amount(-2); // 0
let ans4 = num2amount(89877768866.098); // 877,768,866.10
let ans5 = num2amount(1000000000000000000000000000000n);//1,000,000,000,000,000,000,000,000,000,000
let ans6 = num2amount(null); // -
let ans7 = num2amount(); // -
```

总结一下，看起来写一个工具函数没什么难度，其实就连简单的功能也不是那么容易的。都要考虑到方方面面，容错处理尤其重要。以上代码依旧不够简洁，以后发现有更好的实现方式再回来修改。




