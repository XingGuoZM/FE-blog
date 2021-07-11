### 什么是webpack的loader
loader即加载器，由于webpack只能打包js模块，如果要打包其他文件，如jsx、vue、css等文件，必须要将其转化成js模块形式。而这个转化的工具就是loader。例如我们要打包css文件，我们就要使用css-loader和style-loader，要打包图片文件我们要使用file-loader或者url-loader。


### 写一个webpack loader
