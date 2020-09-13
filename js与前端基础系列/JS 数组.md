
### push、pop、shift、unshift（都会改变原数组）  
- push向数组后面推入一项
- pop去除数组最后一项
- shift去除数组第一项
- unshift向数组前面推入一项


### reverse、sort  
- reverse反转数组
- sort数组排序

### map、forEach、every、filter、some  
- 手动实现
```

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

### reduce、reduceRight  

### slice、splice  

### 手写splice方法  