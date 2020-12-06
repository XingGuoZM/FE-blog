
console.log(this);

function a(){
  console.log(this)
}

const b={
  name:'zhangsan',
  func:function(){
    console.log(this.name)
  }
}

console.log(a())