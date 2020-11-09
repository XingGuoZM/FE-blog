const obj = {name:'111'};
const p = new Proxy(obj,{
  get:(target, key, value)=>{
    if(key==='age') return '18';
  },
  set:(target, key, value)=>{
    if(key==='id') target[key]='id';
    else target[key] = value;
  }
});

console.log(p.age);

p.id='1234';
console.log(obj,p);