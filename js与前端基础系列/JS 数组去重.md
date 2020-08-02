### 数组去重一共有几种方式  
1. es6 Set
```
const arr=[1,2,3,4,5,6,5,4,3,2,1]

function removeDuplicate(arr){
  return [...new Set(arr)]
}

removeDuplicate(arr)
```

2. 利用object key去重  
```
const arr=[1,2,3,4,5,6,5,4,3,2,1]

function removeDuplicate(arr){
  let obj={}
  for(let item of arr){
    if(!obj[item]) obj[item]=item
  }
  return Object.keys(obj)
}
removeDuplicate(arr)
```

### 二维数组去重   

