
### 功能需求  
- 复用组件需求概括  
  1. 提示信息，即需要提示的字符串  
  2. 消失间隔，即几秒之后消失  
- 复用组件详细描述  

### 技术方案  
组件组成
- 倒计时
- body下插入div，确保层级顶级
### 使用说明  
函数调用方式弹出碳层

### 实现源码  
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>toast提示</title>
        <style>
            *{
                margin:0;
                padding:0;
            }
        </style>
    </head>
    <body>
        
        <script>
           const toast = document.createElement('div');
           toast.style.width='20vw';
           toast.style.height = '10vw';
           toast.style.background = 'rgba(0,0,0,.5)'; 

           setTimeout(()=>{
            document.body.removeChild(toast);
           },3000);
           document.body.appendChild(toast);
        </script>
    </body>
</html>
```

### 参考  
