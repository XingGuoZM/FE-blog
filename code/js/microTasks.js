new Promise((resolve,reject)=>{
  reject();
  console.log(1)
}).then(res=>{
  console.log(2)
},error=>{
  console.log(3)
}).then(res=>{
  console.log(4)
})