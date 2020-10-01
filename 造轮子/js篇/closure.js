/**
 * 闭包示例
 */

function a(){
  let aa = 0;

  function b(){
      aa ++;
      console.log(aa);
  }
  return b();
}
//方式一
// a()(); //1
// a()(); //1

//方式二
const fn = a();
fn();//1
fn();//2
// console.log(a())

// let m=0
// function test(){
//   m++
//   console.log(m)
// }

// const fn=test;
// fn();
// fn()