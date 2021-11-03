
/**
 *  函数柯里化
 */
const add = (...args) => {
  const fn = (...rest) => add.apply(null, args.concat(rest));
  fn.toString = () => args.reduce((a, b) => a + b);
  return fn
}

// ========== 测试 ===========

let ans1 = add(1)(2)(3);
let ans2 = add(1, 2)(3);
let ans3 = add(1)(2, 3);
let ans4 = add(1, 2, 3);
// console.log(ans2.toString());
let curry = (...args) => {
  let fn = (...rest) => curry.apply(null, args.concat(rest));
  fn.result = () => args.reduce((a, b) => a + b);

  return fn;
}

let res = curry(1)(2)(3);
console.log(res.result())