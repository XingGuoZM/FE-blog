### canvas是什么，有什么作用？


### 使用

### 封装一个可交互的canvas组件

### 示例
```html
 <!DOCTYPE html>
 <html lang="en">
     <head>
         <meta charset="utf-8" />
         <title>canvas示例</title>
         <style>
           *{
             margin:0;
             padding:0;
           }
         </style>
     </head>
     <body>
        <canvas id="myCanvas" width='600' height='600'></canvas>

        <script>
          let rectx=100;
          let recty=50;
          const canvas=document.querySelector('#myCanvas');
          const ctx=canvas.getContext('2d');
          // 初始化
          function clear(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          // 绘制
          function draw(){
            clear();
            ctx.fillStyle = '#0099b0';
            ctx.fillRect(rectx, recty, 200, 100);
            ctx.stroke();
          }
          // 更新
          function update(){
            rectx+=1
            recty+=1
          }
          //
          window.requestAnimationFrame(gameLoop);
          function gameLoop() {
              update();
              draw();
              window.requestAnimationFrame(gameLoop);
          }
        </script>
     </body>
 </html>
```



### 参考