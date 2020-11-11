/**
 * 方法一
 * @param {*} arr 
 */
const removeRepeat1 = (arr) => {
  const obj={};
  return arr.filter(item=>{
    if(!obj[item.toString()]) {
      obj[item.toString()]=item.toString();
      return item;
    }
  });
}
/**
 * 方法二
 * @param {*} arr 
 */
const removeRepeat2 = (arr) => {
  const obj={};
  arr.forEach(item=>!obj[item.toString()] && (obj[item.toString()]=item));
  return Object.values(obj);
}



// 测试结果
const matrix=[
  [1,2,3,4],
  [3,4,5,6],
  [1,2,3,4]
]

const ans1=removeRepeat1(matrix);//[ [ 1, 2, 3, 4 ], [ 3, 4, 5, 6 ] ]
const ans2=removeRepeat2(matrix);//[ [ 1, 2, 3, 4 ], [ 3, 4, 5, 6 ] ]
console.log(ans1);
console.log(ans2);

//测试用例
/**
 * 二维数组我们暂且称之为矩阵，下面都用这个别名。
 * 
 * 1.边界情况，例如null、undefined、非数组、非矩阵
 * 2.矩阵的每一项都是一个对象类型
 * 3.正常情况即数字数组
 */