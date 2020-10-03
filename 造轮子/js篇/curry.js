
/**
 *  法一：es5
 */
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = [].slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var adder = function () {
      var _adder = function() {
          // [].push.apply(_args, [].slice.call(arguments));
          _args.push(...arguments);
          return _adder;
      };

      // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
      _adder.toString = function () {
          return _args.reduce(function (a, b) {
              return a + b;
          });
      }

      return _adder;
  }
  // return adder.apply(null, _args);
  return adder(..._args);
}
//法二： es6
function add1(...rest){
  let _args=[...rest];
  return ()=>{
    let _adder=(...r)=>{
      _args.push(...r);
      return _adder;
    }
    _adder.toString = ()=>_args.reduce((a,b)=>a+b);
    return _adder;
  }
}


let ans1=add1(1)(2)(3)
// let ans2=add(1,2)(3)
// let ans3=add(1)(2,3)
// let ans4=add(1,2,3)
console.log(ans1.toString());