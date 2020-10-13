// 判断一个变量是否为数组
/**
 * 方法一
 * @param {*} obj 
 */
function isArray1(obj) {
    return obj instanceof Array;
}

/**
 * 方法二
 * @param {*} obj 
 */
function isArray2(obj) {
    return Array.isArray(obj);
}

/**
 * 方法三
 * @param {*} obj 
 */
function isArray3(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

let obj1=null;
let obj2={};
let obj3=[];

console.log(isArray1(obj1));
console.log(isArray2(obj2));
console.log(isArray3(obj3));