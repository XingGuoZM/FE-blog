class Base {
    static instance(){
      // TODO:返回绑定类的实例对象
      return new this();
    }
    name1(){
      // TODO:返回调用对象的类名
      return this.constructor.name;
    }

    static name2(){
      //返回绑定类的类名
        return this.name;
    }
}

  class A extends Base{}
  class B extends Base{}

  //========== 测试 =========
  
  // console.log(A.instance().name1()) // 'A'
  // console.log(B.instance().name1()) // 'B'
  // console.log(A.name2()) //'A'
  // console.log(B.name2()) //'B'



function Person (){

}

const p = new Person();
// console.log(p.constructor,Person.prototype);


function AA(){

}
const BB = {}

console.log(AA.prototype);
console.log()
