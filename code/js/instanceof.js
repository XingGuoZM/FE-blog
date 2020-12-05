// 构造函数A
function A(){}

// 构造函数B
function B(){}

// 实例a
const a = new A();

// console.log(a instanceof A);
// console.log(a instanceof Object);
// console.log(null instanceof Object);
/**
 * 原型、原型链、构造函数、实例
 * prototype、__proto__、constructor
 */

const b = {};

//  console.log(A.__proto__);
//  console.log(A.prototype);
//  console.log(A.constructor);
//  console.log(a);

function myInstanceof(instance,type){
  while(instance){
    instance=instance.__proto__;
    if(instance===type.prototype) return true;
  }
  return false
}
console.log(myInstanceof(a,A))