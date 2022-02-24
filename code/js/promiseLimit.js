

const urls = [
  1,2,3,4,5,6,7,8,9
]
const pool = [];
const max = 3;
const request = (key)=>new Promise((resolve)=>setTimeout(()=>resolve(key),1000))

const addTask=(task)=>{
  const t = request(task);
  pool.push(t);
  t.then(res=>{ 
    pool.splice(pool.indexOf(t),1);
    console.log(res)
    const next = urls.unshift();
    if(next){
      addTask(next);

    }
  });
}

while(pool.length<max){
  const task = urls.shift();
  addTask(task);
}
