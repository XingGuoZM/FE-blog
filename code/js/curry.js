
/**
 *  函数柯里化
 */
function add() {
    let _args = [...arguments];
    const adder =  function() {
        const _adder = (...rest) => {
          _args.push(...rest);
          return _adder.push(...rest);
        };
        _adder.result = () => _args.reduce((a, b) =>a + b);
        return _adder;
  }
  return adder(..._args);
}

// ========== 测试 ===========

let ans1=add(1)(2)(3);
let ans2=add(1,2)(3);
let ans3=add(1)(2,3);
let ans4=add(1,2,3);
console.log(ans1.result());