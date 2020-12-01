
### 功能需求  
- 支持毫秒/秒
- 支持样式修改
- 

### 技术方案  
- 方案一：时间操作
  - 时间格式转时间戳： +new Date()
  - 时间戳转时间 


### 实现代码  
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>倒计时</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  </style>
</head>

<body>
  <section class='countdown-wrap'>
    <div id="countdown"></div>
  </section>
  <script>

    function getCountdown() {
      const remainTime = +new Date('2020/10/19 00:00:00') - +new Date();
      // 获取天数
      const d = parseInt(remainTime / 24 / 60 / 60 / 1000);
      // 获取小时数
      const h = parseInt(remainTime / 60 / 60 / 1000);
      // 获取分钟
      const m = parseInt(remainTime / 60 / 1000 - h * 60);
      // 获取秒
      const s = parseInt(remainTime / 1000 - h * 60 * 60 - m * 60);
      return `${h}:${m}:${s}`
    }

    setInterval(() => {
      document.querySelector('#countdown').innerHTML = getCountdown();
    }, 1000)
  </script>
</body>

</html>
```

### 问题汇总(FAQ)
1. 倒计时由外界控制，例如每当页面滚动的时候才出发倒计时
2. 

### 参考  
