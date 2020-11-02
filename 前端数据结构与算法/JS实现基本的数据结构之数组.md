
### push、pop、shift、unshift（都会改变原数组）  
- push向数组后面推入一项
- pop去除数组最后一项
- shift去除数组第一项
- unshift向数组前面推入一项


### reverse、sort  
这两个方法会改变原有数组
- reverse反转数组
```js
const reverse = function (arr) {
  let len = arr.length
  let tmp;
  for(let i = 0; i < len/2; i++) {
    tmp = arr[i];
    arr[i] = arr[len-i-1];
    arr[len-i-1] = tmp;
  }
  return arr;
}
```
- sort数组排序


### map、forEach、every、filter、some  
所有的这些方法都不会改变原有数组
- 手动实现
```js
const map=function(arr,fn){
  let res=new Array(arr.length)
  for(let i=0;i<arr.length;i++){
    res[i]=fn(arr[i],i,arr)
  }
  return res
}
const forEach=function(arr,fn){
  for(let i=0;i<arr.length;i++){
    fn(arr[i],i,arr)
  }
}
const filter = function(arr,fn){
  let res=[]
  for(let i=0;i<arr.length;i++){
    if(fn(arr[i],i,arr)) res.push(arr[i])
  }
  return res
}
const some=function(arr,fn){
  for(let i=0;i<arr.length;i++){
    if(fn(arr[i],i,arr)) return true
  }
  return false
}
const every = function(arr,fn){
  for(let i=0;i<arr.length;i++){
    if(!fn(arr[i],i,arr)) return false
  }
  return true
}
```

### indexOf、lastIndexOf  
查找制定值第一次出现的位置（indexOf）和最后一次出现的位置（lastIndexOf）
```js
const indexOf = function (arr, value) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      index = i;
      break;
    }
  }
  return index;
}

const lastIndexOf = function (arr, value) {
  let index = -1;
  for (let i = arr.length - 1; i >=0; i--) {
    if (value === arr[i]) {
      index = i;
      break;
    }
  }
  return index;
}
```

### reduce、reduceRight  

### slice、splice  

### 手写splice方法  