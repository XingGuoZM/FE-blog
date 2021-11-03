// 输入:1,2,3,5,7,8,10
// 输出:1~3,5,7~8,10

const simplifyNumbers = (numberList) => {
  const result = [];
  let curr = numberList[0];
  for (let i = 0; i < numberList.length; i++) {
    if (numberList[i] + 1 !== numberList[i + 1]) {
      if (curr !== numberList[i]) {
        result.push(`${curr}~${numberList[i]}`);
      } else {
        result.push(numberList[i]);
      }
      curr = numberList[i + 1];
    }
  }
  return result;
}

const res = simplifyNumbers([1, 2, 3, 5, 7, 8, 10]);
console.log(res);