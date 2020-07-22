### 节流和防抖是什么意思  
```
相同点：这两个函数都是处理高频事件，例如在1s内某事件先后触发10次
节流：在一定时间内连续触发某事件，在这段时间段内只执行首次触发的那一次。1s内执行第一次
防抖：在一定时间内连续触发某事件，在这段时间内只执行最后一次触发的那一次。最后一次延时1s后执行 

不同点：假如某事件1s内频繁触发，节流是在这1s内触发一次。防抖是在1s内无继续触发的话延时1s执行，若在1s内仍有触发的话，则取消之前所有的触发，以当前触发为准延时1s后再执行，依次类推，在规定时间内如果不停触发，防抖则会无限延长，节流只会触发1次。
```

### 手写节流函数（详见本仓库：造轮子->js篇->throttle.js）  
```
//方法一：利用闭包保存时间
const throttle = function(fn,delay){
  let prev = Date.now()
  return  ()=> {
    let now = Date.now()
    if (now - prev >= delay) {
        fn()
        prev = Date.now()
    }  
  }
}
```

### 手写防抖函数  
```
//方法一：利用闭包保存延时器
const debounce = function(fn,delay){
  let timer = null
  return ()=> {
    clearTimeout(timer)
    timer = setTimeout(()=>fn(), delay)
  }
}
```

### 应用  
* 防抖应用：输入框 change ，延时响应输入。例如货币输入框自动加小数点  
* 节流应用：响应滚动事件。例如瀑布流无限滚动  