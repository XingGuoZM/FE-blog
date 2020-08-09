
class Promise{
  constructor(fn){
    this.status='pending'
    fn(this.resolve.bind(this),this.reject.bind(this))
  }
  resolve(){
    this.status='fulfilled'
    // console.log('success')
  }
  reject(){
    this.status='rejected'
    console.log('failed')
  }
  then(onFulfilled,onRejected){
    let promise2=new Promise((res,rej)=>{
        if(this.status==='pending'){
          if(typeof res === 'function'){}
          if(typeof rej === 'function'){}
        }else if(this.status==='fulfilled'){
          setTimeout(()=>{})
        }else{
          setTimeout(()=>{})
        }
    })
    return promise2;
  }
  catch(){

  }
}

new Promise(function(resolve,reject){
  resolve()
  console.log(2,this)
}).then(res=>{

},err=>{

})
