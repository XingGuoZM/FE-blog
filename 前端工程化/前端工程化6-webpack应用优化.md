
## 总体优化思路
速度更快，打包速度更快、渲染速度更快
体积更小，打包体积更小、
提前，首屏提前渲染，首屏静态资源预加载、
滞后，非首屏资源按需加载
转移，静态资源转移cdn

webpack应用的优化方向

开发体验上，一个是追求构建速度，另一个是响应速度
线上体验，一个是包体积大小，加载速度，首屏响应速度等

1. 构建速度、多线程构建
使用happyPack插件开启多线程来加速构建

2. 代码压缩
使用uglifyjs来压缩代码，一般使用minify方法来进行压缩，如果不满足要求，uglifyjs还提供了其他api

3. 提取公共代码
如果a模块引用了c模块，b模块也引用了c模块，这时候如果不提取出公共模块c的话，就会有重复的c模块一起打包至bundle，导致体积增大。提取公共模块的方法使用webapck内置的CommonsChunkPlugin插件来进行配置。在webpack.config.js中配置optimization.splitChunks，common、vender完成之后，webpack会将公共代码打包至一个单独的bundle文件里。

4. 代码按需加载、代码分割
大型单页应用打包后的bundle体积过大，因此我们需要对代码进行分割成多个bundle，通过类似于懒加载的方式来加载当前用户所需要的页面内容。代码分割的实现方式一般有3种：
- webpack.config.js配置多个入口（entry）来手动的分离代码
- 通过import()或者require.ensure()函数来异步加载模块，一般会和路由协同使用
- 通过插件来手动分离代码

5. 去除没有使用到的代码，tree-shaking
tree-shaking一句话概括就是摇掉没有使用到的代码，不将无用代码构建打包。webpack可以通过静态分析依赖关系来找出工程中没有使用到的代码，以此来删除这部分代码。

6. 自动刷新和热替换
webpack-server-dev给开发者提供了一个页面自动刷新的选项，我们只需要在配置文件（webpack.config.js）里开启文件监听，即watch：true，这样我们的文件只要有改动，页面就会自动刷新了，当然可以选择性的监听某些文件，比如我们可以忽视掉node_modules包里的文件的监听，这会大大降低内存和cpu的消耗。除了页面的自动刷新之外，devserver还提供了模块热替换（Hot Module Replacement）的技术，在不刷新整个网页的情况下，替换修改了的个别模块，使用起来特别简单，在webpack.config.js文件里的devServer配置hot:true.
