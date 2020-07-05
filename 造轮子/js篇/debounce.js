// 防抖函数  

// 闭包保存时间
function debounce(fn,delay){
  let timer = null
  return ()=> {
    clearTimeout(timer)
    timer = setTimeout(()=>fn(), delay)
  }
}

let i=0
function log(){
  i++
  console.log(i)
}
setInterval(debounce(log,500),1000)