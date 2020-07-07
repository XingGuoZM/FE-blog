
async function sum(arr,index){
  if(index===arr.length-1) return arr[arr.length-1]
  // console.log(index)
  return sum(arr,index+1)+arr[index]

}

console.log(sum([1,2,3,4],0))

