### 先看一个例子
```html
 <!DOCTYPE html>
 <html lang="en">
     <head>
         <meta charset="utf-8" />
         <title>获取元素样式</title>
         <style>
            .wrap{
                width:100px;
                height:100px;
                background-color: aquamarine;
            }
         </style>
     </head>
     <body>
         <div class="wrap" style="border-radius: 4px;"></div>
         <script>
             const wrap = document.querySelector('.wrap');
             console.log(wrap.style.width);
             console.log(wrap.style.borderRadius);

             // 非IE浏览器
             console.log(getComputedStyle(wrap,null).width);
             console.log(getComputedStyle(wrap,null).borderRadius);

            // IE浏览器
            console.log(wrap.currentStyle && wrap.currentStyle.width); 
            console.log(wrap.currentStyle && wrap.currentStyle.borderRadius);
         </script>
     </body>
 </html>
```
由上述例子可以看到直接使用style获取只能获取到内联样式，要获取到head中的内部嵌入的样式则需要借助全局函数getComputedStyle来获取，在IE浏览器中提供了currentStyle。

getComputedStyle是只读的。

IE中不存在getComputedStyle,可以使用currentStyle替代
其他浏览器中使用getComputedStyle获取样式，css和style都能获取到

### 参考
- [原生js获取css样式](https://www.jianshu.com/p/bdd5038b1ccd)
- [获取元素CSS值之getComputedStyle方法熟悉](https://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/)