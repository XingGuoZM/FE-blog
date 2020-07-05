## Promise解析  
```
3个状态：pending、fullfilled、rejected。如果状态为fulltilled则走then，如果状态为rejected则走catch

new Promise((resolve,reject)=>{
  resolve()
}).then(res=>{

}).catch(err=>{

})
```