let obj=Object.create(null)

Object.defineProperties(obj,{
  name:{
    set:(value)=>{
      console.log('set',value);
      this.value=value
    },
    get:()=>{
      console.log('get',this.value);
      return this.value
    }
  }
})

obj.name=1
let b=obj.name
