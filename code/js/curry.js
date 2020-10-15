
/**
 *  函数柯里化
 */
function add() {
  let _args = [...arguments];
  const adder =  function() {
      const _adder = (...rest) => {
          _args.push(...rest);
          // console.log('_args',_args)
          // if(!rest) return _adder.toString();
          return _adder;
      };
      this.result = () => {
          return _args.reduce((a, b) =>a + b);
      }
      return _adder;
  }
  return adder(..._args).toString();
}


let ans1=add(1)(2)(3);
let ans2=add(1,2)(3);
let ans3=add(1)(2,3);
let ans4=add(1,2,3);
console.log(ans1);