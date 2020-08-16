const splice=function(){

  
}

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

//原始类型测试，即数字，字符串，布尔值，
const arr=[1,2,3,4,5]
//map测试
const mapTest=map(arr,item=>item*2)

// forEach 测试
const forEachTest=forEach(arr,item=>item+2)

//filter测试
const filterTest=filter(arr,item=>item%2)

//some测试
const someTest=some(arr,item=>item===100)

// every测试
const everyTest=every(arr,item=>item<100)

console.log(arr)
console.log(mapTest)
console.log(forEachTest)
console.log(filterTest)
console.log(someTest)
console.log(everyTest)


//应用类型测试，即对象数组


// map,foreach,filter,some,every都不会改变原始数组