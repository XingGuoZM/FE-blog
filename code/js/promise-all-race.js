/**
 * 
 * @param {*} promises 
 * 接收一个promise数组
 * 顺序返回所有promise执行结果数据
 */
const all = (promises)=>{
  return new Promise((resolve,reject)=>{
    const result=[];
    let count = 0;
    for(let i=0;i<promises.length;i++){
      (function(){
        Promise.resolve(promises[i]).then(res=>{
        count++;
        result[i] = res;
        if(count === promises.length){
          resolve(result);
        }
      },err=>{
        reject(err);
        console.log(err)
      })
    }(i));
    }
  });
}

const race = (promises)=>{

}

const arr=[
  new Promise(resolve=>setTimeout(()=>resolve(1),1000)),
  Promise.reject(2),
  new Promise(resolve=>setTimeout(()=>resolve(3),2000)),
]
const ans = all(arr);
ans.then(res=>{
  console.log(res)
})