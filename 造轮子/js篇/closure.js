/**
 * 闭包示例
 */

function a(){
  var aa = 0;
  function b(){
      aa ++;
      console.log(aa);
  }
  return b;
}
var ab = a();
ab(); //1
ab(); //2