
### 功能需求  
- 复用组件需求概括  

- 复用组件详细描述  

### 技术方案  
- 方案一：通过js创建元素，动态构建
- 方案二：通过html预先构建好，利用js操作css来控制div显隐

### 实现源码  
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>简易的弹窗</title>
        <style>
            *{
                margin:0;
                padding:0;
            }
            .modal-wrap{

            }
            .modal{

            }
        </style>
    </head>
    <body>
        <section class='modal-wrap'>

        </section>

        <script>
            let modal = document.createElement('div');
            let modalContent = document.createElement('div');
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.backgroundColor = 'rgba(0,0,0,.5)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';

            modalContent.style.width = '50vw';
            modalContent.style.height = '50vh';
            modalContent.style.background = '#fff';

            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        </script>
    </body>
</html>
```

### 参考  
