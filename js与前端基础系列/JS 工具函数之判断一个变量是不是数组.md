
```
//法一
const isArray1=function(value){
    return Object.prototype.toString.apply(value)==='[object Array]'
}
//法二
const isArray2=function(value){
    return Array.isArray(value)
}
```