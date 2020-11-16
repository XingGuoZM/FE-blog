### 深克隆（深复制）与浅克隆（浅复制）  
克隆或者说复制即是变量的赋值操作，在非引用类型的变量之中是没有差异的。深克隆和浅克隆的表现差异只在对象中会有所反映


### 深克隆实现  
```js
let obj={a:{b:'hello'}}
//方法一
JSON.parse(JSON.stringify(obj))  
//方法二
function deepClone(obj) {
  if(!obj) return obj;
  let newObj = Array.isArray(obj) ? [] : {};
  for(let key in obj){
    obj[key] && (newObj[key] = deepClone(obj[key]))
  }
  return newObj;
}
```
### 浅克隆实现  
```js
let obj={a:{b:'hello'}}
//方法一
Object.assign(obj)
//方法二,直接赋值
let copyObj=obj
```