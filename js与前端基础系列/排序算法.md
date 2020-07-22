

### 冒泡排序  
代码实现
```
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
```
### 快速排序(时间复杂度)  
```
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
```
### 选择排序  
### 直接插入排序  
### 希尔排序  

### 简单选择排序  
### 堆排序  
### 归并排序  
### 计数排序  
### 桶排序  
### 基数排序  