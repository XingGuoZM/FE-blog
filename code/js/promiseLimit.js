function promiseLimit(limit,arr){
  let ret = [];
  while(arr.length>limit){
    Promise.all(arr.splice(0,limit)).then(res=>{
      ret.push(...res)
    })
  }
  return ret;
}


const promises = [
  setTimeout(res=>console.log(1),1000),
  setTimeout(res=>console.log(2),2000),
  setTimeout(res=>console.log(3),5000),
  setTimeout(res=>console.log(4),4000),
  setTimeout(res=>console.log(5),3000)
]
let ans = promiseLimit(2,promises);

// console.log(ans);