/**
 * 冒泡排序
 */
const bubbleSort = function(arr){
  for(let i=0;i<arr.length;i++){
    for(let j=i+1;j<arr.length;j++){
      if(arr[i]>arr[j]){
        let tpm=arr[i];
        arr[i]=arr[j];
        arr[j]=tpm;
      }
    }
  }
  return arr;
}
 /**
 * 快速排序
 */
const quickSort = function(arr){
  let left=[],right=[]

  if(arr.length<=1) return arr
  let flag=arr.splice(0,1)[0]
  for(let i=0;i<arr.length;i++){
    if(arr[i]>flag){
      right.push(arr[i])
    }else{
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(flag,quickSort(right))
}


console.log(quickSort([9,8,7,6,5,4,3,2,1]))