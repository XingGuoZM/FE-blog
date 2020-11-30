
// 如何让(a===1&&a===2&&a===3)的值为true?

/**
 * 方法一
 */
// let value = 1
// Object.defineProperty(global,'a',{
//   get:function(){
//     return value++;
//   }
// });

var aﾠ = 1;
var a = 2;
var ﾠa = 3;
if (aﾠ == 1 && a == 2 && ﾠa == 3) {
  console.log("Hi a~");
}
// console.log(a==1&&a==2&&a==3);