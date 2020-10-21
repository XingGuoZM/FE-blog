### 原理
通过transform: skew来实现。宽高缩小一半，用户只看到1px的一半来实现效果

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
               height: 1px;
               transform: scaleY(0.5);
           }
         </style>
     </head>
     <body>
        <div class='line'></div>
     </body>
 </html>
```

### 参考
- [怎么画一条0.5px的边（更新）](https://juejin.im/post/6844903582370643975)
