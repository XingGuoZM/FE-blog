### 原理
通过transform: skew来实现。倾斜一定角度用户只看到1px的一半来实现效果

### 代码实现
```html
 <!DOCTYPE html>
 <html lang="en">
     <head>
         <meta charset="utf-8" />
         <title>0.5px直线</title>
         <style>
           *{
             margin:0;
             padding:0;
           }
           .line{
               width:100%;
               border-top:solid 1px #000;
               transform:skew(45deg);
           }
         </style>
     </head>
     <body>
        <div class='line'></div>
     </body>
 </html>
```
