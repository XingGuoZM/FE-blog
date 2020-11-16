function deepClone(obj) {
  if(!obj) return obj;
  let newObj = Array.isArray(obj) ? [] : {};
  for(let key in obj){
    obj[key] && (newObj[key] = deepClone(obj[key]))
  }
  return newObj;
}

// 测试
let obj=[{name:1}];
let a1 = deepClone(obj);
// let a1=obj;
a1[0].name=2;
console.log(a1,obj)