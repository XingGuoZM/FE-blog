//节流函数 
// 闭包保存时间
function throttle (fn, delay) {
  let prev = Date.now()
  // console.log('prev',prev)
  return  ()=> {
    let now = Date.now()
    if (now - prev >= delay) {
        fn()
        prev = Date.now()
    }  
  }
}


let i=0
function log(){
  i++
  console.log(i)
}
setInterval(throttle(log,2000),200)