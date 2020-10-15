const splice = function () {

}

const map = function (arr, fn) {
  let res = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    res[i] = fn(arr[i], i, arr)
  }
  return res
}
const forEach = function (arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr)
  }
}
const filter = function (arr, fn) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) res.push(arr[i])
  }
  return res
}
const some = function (arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) return true
  }
  return false
}
const every = function (arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i], i, arr)) return false
  }
  return true
}

// //原始类型测试，即数字，字符串，布尔值，
// const arr=[1,2,3,4,5]
// //map测试
// const mapTest=map(arr,item=>item*2)

// // forEach 测试
// const forEachTest=forEach(arr,item=>item+2)

// //filter测试
// const filterTest=filter(arr,item=>item%2)

// //some测试
// const someTest=some(arr,item=>item===100)

// // every测试
// const everyTest=every(arr,item=>item<100)

// console.log(arr)
// console.log(mapTest)
// console.log(forEachTest)
// console.log(filterTest)
// console.log(someTest)
// console.log(everyTest)


//应用类型测试，即对象数组


// map,foreach,filter,some,every都不会改变原始数组

/**
 * 第一次出现的位置：indexOf
 * 最后一次出现的位置：lastIndexOf 
 */

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

// let ans = [1, 2, 3, 2, 4, 5];
// console.log(ans);

/**
 * reverse 反转数组
 * sort 数组排序
 */
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


const sort = function(arr,fn){
  for(let i=0;i<arr.length;i++){
    for(let j=i+1;j<arr.length;j++){
      if((arr[i]>arr[j] && !fn) ||
        (arr[i]>arr[j] && fn(arr[i],arr[j])) ){
        let tpm=arr[i];
        arr[i]=arr[j];
        arr[j]=tpm;
      }
    }
  }
  return arr;
}
const arr = [1,4,3,20,5]
sort(arr);
console.log(arr)