class MyPromise{
  constructor(fn){
    this.status='pending';
    this.value=''
    this.reason=''
    //成功的回调
    this.onResolveCBs=[]
    //失败的回调
    this.onRejectCBs=[]

    let resolve=(reason)=>{
      if(this.status=='pending'){
        this.status='fulfilled';
        this.reason=reason;
        this.onResolveCBs.forEach(fn=>fn())
      }
    }

    let reject=(value)=>{
      if(this.status=='pending'){
        this.status='rejected'
        this.value=value;
        this.onRejectCBs.forEach(fn=>fn())
      }
    }
    
    try{
      fn(resolve,reject);
    }catch(e){
      reject(e)
    }
  }

  then(onResolve,onReject){
    if(this.status==='fulfilled'){
      onResolve()
    }
    if(this.status==='rejected'){
      onReject();
    }
    if(this.status==='pending'){
      this.onResolveCBs.push(()=>onReject(this.value));
      this.onRejectCBs.push(()=>onReject(this.reason))
    }

  }
}


new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve()
  },2000)
  
  // reject()
}).then(res=>{
  console.log('成功')
},err=>{
  console.log('失败')
})