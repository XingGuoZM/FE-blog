let obj = {
  get name(){
    console.log('get name:'+name);
    return name;
  },
  set name(value){
    name = value;
    console.log('set name:' + name);
  }
}

obj.name=2;
obj.name;
// console.log(obj.name);