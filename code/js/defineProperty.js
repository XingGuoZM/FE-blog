
function proxyObj(obj,prop){
  Object.defineProperties(obj,{
    [prop]:{
      set:(value)=>{
        console.log('set',value);
        this.value=value
      },
      get:()=>{
        console.log('get',this.value);
        return this.value
      }
    }
  });
}


// 测试
// let obj=Object.create(null)
let obj={name:{p:'123'}}
proxyObj(obj,'name');
obj.name={p:'09'}
console.log(obj.name)
// let b=obj.name
