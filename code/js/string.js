// 字符串首字母转大写，后面字母小写
/**
 * 方法一：js字符串切割
 * @param {*} str 
 */
function firstToUpper1(str) {
    return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}
/**
 * 方法二：js正则
 * @param {*} str 
 */
function firstToUpper2(str){
    return str.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
    });
}
/**
 * 方法三：js正则
 * @param {*} str 
 */
function firstToUpper3(str){
    return str.toLowerCase().replace(/( |^)[a-z]/g,(L)=>L.toUpperCase());
}
/**
 * 方法三：css
 */
// text-transform: capitalize;

let str='hELLO'
console.log(firstToUpper1(str));
console.log(firstToUpper2(str));
console.log(firstToUpper3(str));

