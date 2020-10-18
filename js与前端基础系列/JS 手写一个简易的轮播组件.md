
### 功能需求  
自动无限轮播
切换滚动
### 技术方案  
1. 方案一 JS控制：position + left
2. 方案二 
### 使用说明  

### 实现代码  
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>轮播</title>
        <style>
            .carousel-wrap{
              width:100vw;
              height:30vh;
              background-color:#f2f2f2;
              overflow:hidden;
            }
            #carousel{
              display:flex;
            }
            .carousel-item{
              width:100vw;
              height:30vh;
              font-size:50px;
              font-weight: bolder;
              flex-shrink: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              color:red;
            }
        </style>
    </head>
    <body>
        <section class='carousel-wrap'>
          <div id='carousel'>
            <div class="carousel-item">111</div>
            <div class="carousel-item">222</div>
            <div class="carousel-item">333</div>
            <div class="carousel-item">111</div>
          </div>
        </section>
        <script>
          let carousel=document.querySelector('#carousel');
          let percent=0;
          let num=0;
          let len = 4;

          window.setInterval(() => {
            percent=num % len / len * 100;
            if (num % len === len - 1) {
              window.setTimeout(() => {
                carousel.style.transform='translate3d(0, 0, 0)' 
                carousel.style.transition= 'none'
                num+=1
              }, 800);
            }
            num += 1;
            carousel.style.transform=`translate3d(-${percent%len*100}vw,0 ,0)`
            carousel.style.transition='transform .8s ease'
          }, 3000);
        </script>
    </body>
</html>
```
 

### 参考  