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

 console.log(A.__proto__);
 console.log(A.prototype);
 console.log(A.constructor);