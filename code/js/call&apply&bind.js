const str = 'hello';
const single = Symbol();

/**
 * call应用：类型判断
 */
console.log(Object.prototype.toString.call(str));
console.log(Object.prototype.toString.call(single));

/**
 * apply应用：求最大/最小值
 */
const arr = [1, 2, 3, 4];
console.log(Math.max.apply(Math, arr));
console.log(Math.min.apply(Math, arr));

/**
 * bind应用：回调函数this丢失
 * this指向最后一次调用的函数的上下文
 * this 永远指向最后调用它的那个对象
 */
class A {
  constructor(cb) {
    this.name = 'a';
    this.handle = cb;
    this.handle();
  }
}
class B {
  constructor() {
    this.name = 'b';
    this.age = 1;
    this.classA = new A(this.handleB);
  }
  handleB = () => {
    console.log(this.age);
  }
}
new B();

//========================================
const obj = {
  name: 'jack',
  fn() { console.log(this.name) }
}
const fn = obj.fn;
fn();


(function () {

  // 实现一个call、bind、apply
  Function.prototype.myCall = function (context, ...args) {
    if (context === null || context === undefined) {
      context = window;
    } else {
      context = Object(context);
    }
    const key = Symbol('call key')
    context[key] = this;
    const res = context[key](...args);
    delete context[key];
    return res;
  }
  // 测试代码
  const callObj = {
    name: 'tom'
  }
  function func() { console.log(this.name) }
  func.myCall(callObj)

}());

(function () {
  //实现bind
  /**
   * 克隆函数
   */
  Function.prototype.myBind = function (context, ...args) {
    return () => this.call(context, ...args);
  }
  // 测试代码
  const bindObj = {
    name: 'any'
  }
  function func() { console.log(this.name) }
  func.myBind(bindObj)()
}())
