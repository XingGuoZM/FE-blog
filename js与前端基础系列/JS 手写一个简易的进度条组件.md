
### 功能需求  


### 技术方案  

- vw
- progress标签

### 实现代码  
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>轮播</title>
        <style>
          *{
            margin:0;
            padding:0;
          }
            .percentage-wrap{
              width:100vw;
              height:20vh;
              border-radius:10vw;
              background-color:#ccc;
              overflow:hidden;
            }
            .percentage{
              height:20vh;
              background-color: coral;
            }
        </style>
    </head>
    <body>
        <section class='percentage-wrap'>
          <div id='percentage' class="percentage"></div>
        </section>
        <script>
          document.querySelector('#percentage').style.width=20+'vw';
        </script>
    </body>
</html>
``` 

### 参考  