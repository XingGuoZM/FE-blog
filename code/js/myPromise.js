

/**
 * 三种状态 pending、fulfilled、rejected。fulfilled与rejected互斥
 * 
 */
// new Promise((resolve,reject)=>{
//   resolve(124);
//   // reject();
// }).then(res=>{
//   console.log('then resolve',res)
// },err=>{
//   console.log('then error')
// }).catch(err=>{
//   console.log('catch error')
// }).finally(res=>{
//   console.log('finally',res)
// })
/**
 * 1. 状态互斥不可逆
 * 2. 异步处理
 * 3. then链式调用、值透传
 * 4. promise.all和promise.race
 * @param {*} excutor 
 */

function MyPromise(excutor){
  this.status='pending';
  this.value = null;
  this.reason = null;
  this.onResolveCB=[];
  this.onRejectCB=[]
  const resolve = (value) => {
    if(this.status==='pending'){
      // console.log('fulfilled');
      this.value=value;
      this.status = 'fulfilled';
      this.onResolveCB.forEach(fn=>fn());
    }
  }
  const reject = (reason) => {
    if(this.status === 'pending'){
      // console.log('rejected');
      this.reason=reason;
      this.status='rejected';
      this.onRejectCB.forEach(fn=>fn());
    }
  }
  try{
    excutor(resolve,reject);
  }catch(err){
    reject(err);
  }

  this.then = (success,fail)=>{

    let promise2 = new MyPromise((resolve,reject)=>{

    })

    if(this.status==='fulfilled'){
      resolve(this.value);
    }
    if(this.status === 'rejected'){
      reject(this.reason);
    }
    if(this.status === 'pending'){
      this.onResolveCB.push(()=>resolve(this.value))
      this.onRejectCB.push(()=>reject(this.reason))
    }
  }
}

new MyPromise((resolve,reject)=>{
  setTimeout(resolve,1000)
  // resolve(11111);
  // reject();
}).then(res=>{
  console.log('then resolve',res);
},err=>{
  console.log('then error')
})