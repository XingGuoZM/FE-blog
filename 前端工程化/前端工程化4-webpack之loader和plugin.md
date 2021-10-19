## 写在前面
弄清楚了tapable，我们基本上对webpack的plugin没有什么问题了，下面我们将webpack的plugin和loader组合起来看一下。我们主要从以下几个方面来深入研究。照着网上的资料写几个例子（模仿），然后大致了解loader是什么（作用），它是怎么执行的（原理）以及找一个比较有代表性的loader来看看它的代码（源码），最后我们可以自己写一个自定义的loader（学以致用）。plugin也可以套用这样的模式来进行学习。参考了官网给出的一些例子之后[plugin](https://webpack.docschina.org/plugins/)和[loader](https://webpack.docschina.org/loaders/)之后
，我开了两个工程[webpack-demo-loader](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-loader)和[webpack-demo-plugin](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-plugin)来写一些示例来深入研究下webpack的loader和plugin

## loader
loader即加载器，由于webpack只能打包js模块，如果要打包其他文件，如jsx、vue、css等文件，必须要将其转化成js模块形式。而这个转化的中间工具就是loader，我们可以理解为loader即文件的预处理。例如我们要打包css文件，我们就要使用css-loader和style-loader，要打包图片文件我们要使用file-loader或者url-loader。我们常用的loader有如下几个：
style-loader、css-loader、vue-loader、babel-loader、ts-loader、file-loader、url-loader等

**loader使用**

loader的使用方法大概就是在webpack.config.js配置文件中的module的rules中添加项。具体的使用方法在官网的文档[loader](https://webpack.docschina.org/api/loaders/)以及[Loader Interface](https://webpack.docschina.org/api/loaders/)写的非常清楚，照着写几遍大概就能熟练使用了。我们主要看下Loader Interface这节，这里解释了loader的原理，对我们理解loader以及后面写自定义loader有很重大的意义。loader 本质上是导出为函数的 JavaScript 模块。loader runner 会调用此函数，然后将上一个 loader 产生的结果或者资源文件传入进去。loader也给出了很多钩子，都存在上下文对象this上的，这个上下文对外开放了很多方法，我们能很轻松的操作源码字符串。

**loader执行原理**

为了研究loader的执行原理，我们建了一个webpack应用实例来专门探索loader。[webpack-demo-loader](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-loader)，通过上述的例子我们可以了解到如何在项目中配置使用loader。通过使用上述几个常用的loader我们可以大致窥探出webpack执行loader的工作的过程，大概的过程就是先注册，可以理解成数据结构--栈。

**vue-loader研究**

vue-loader是一个比较有代表性的loader，我们找到其源码来研究一下vue的模版语法。基本上就是基于webpack从0开始创建一个vue脚手架项目[webpack-demo-vueloader](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-vueloader)
创建该工程也比较简单，按照如下步骤即可
- 创建目录并初始化
```
mkdir webpack-demo-vueloader && cd webpack-demo-vueloader

npm init -y 
```
- 安装vue vue-loader vue-template-compiler
- 安装 webpack webpack-cli webpack-dev-server(**这三个包版本会相互影响，所以固定版本了**)
```
npm install --save vue vue-loader vue-template-compiler

npm install --save webpack webpack-cli webpack-dev-server@3.11.0
```
根目录新建webpack.config.js
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/dist',
    host: '127.0.0.1',
    port: 8000
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}
```
- 新建src目录，创建index.js和app.vue
```js
import Vue from 'vue';
import App from './app.vue';

new Vue({
  el: '#root',
  render: h => h(App)
});

```
```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello world!",
    };
  },
  created: function () {
    console.log("create");
  },
  mounted: function () {
    console.log("mounted");
  },
};
</script>
```
- 最后在package.json的script下添加执行命令就完成了一个最基本的vue脚手架
```
  "start": "webpack serve",
  "build": "webpack",
```
测试项目可以完全跑起来了，我们下一步来研究一下vue-loader是如何工作的，从上面创建的工程中package.json中依赖的包我们可以看到，要让vue项目完整的在webpack中跑起来，最少要依赖三个包，分别是vue、vue-loader和vue-template-compiler。我们知道[vue-loader](https://github.com/vuejs/vue-loader)和[vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#readme)是webpack和vue的中间连接接工具，查看源码我们得知，vue-template-compiler主要的作用是将vue的模版代码的字符串编译成ast和渲染函数的形式。vue-loader的作用在[官网](https://vue-loader.vuejs.org/zh/#vue-loader-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)解释的很清楚,总结起来就是一句话，vue-loader的作用就是能将.vue文件转化成渲染函数的形式，可以让webpack完成打包。webpack只能打包js模块，在单页应用中，一个js文件可以理解为一个js模块，vue-loader的作用就是能将.vue文件编译成webpack能够识别的模块形式.

**写一个自定义的loader**

我们知道，loader能对js模块字符串的形式进行操作,那我们就写一个能够帮助我们清除console.log的loader。源码地址在[webpack-demo-vueloader](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-vueloader)里的loaders/removeLog.js


## plugin
上一节我们知道了webpack的plugin的核心是tapable，本质上是一个订阅-发布模式,先把插件写好注册到webpack.config.js文件中，在编译源代码的时候再调用它。我们呢常用的plugin有如下几个：
webpack-bundle-analyzer、CommonsChunkPlugin、DllPlugin、ExtractTextWebpackPlugin、HtmlWebpackPlugin、HotModuleReplacementPlugin等

**plugin使用**

我们说loader就是一个js函数，可以操作js字符串形式的函数，那么plugin就是一个类。plugin使用非常简单，如果是引用第三方插件，也就是别人写好的npm包，只需在webpack.config.js配置一下即可，首先require进来，然后在plugins中new一个实例，如果有参数，直接传进去即可。示例（html-webpack-plugin）如下
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin()
  ]
  ...
}
```
自定义的plugin，首先需要你先开发好plugin（参考[tapable demo](https://www.cnblogs.com/xingguozhiming/p/15188414.html)、[compiler](https://webpack.docschina.org/api/compiler-hooks/)和[compilation](https://webpack.docschina.org/api/compilation-hooks/)），然后用同样的方式引入即可。
plugin会深入到代码编译和构建的各个阶段，学习plugin可以帮助我们窥探代码编译的全过程。plugin对外提供了两个主要的钩子，一个是[compiler](https://webpack.docschina.org/api/compiler-hooks/),另一个是[compilation](https://webpack.docschina.org/api/compilation-hooks/)。

- Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。

**VueLoaderPlugin研究**

VueLoaderPlugin是有两个plugin分别兼容webpack的<=4、5两个版本。为什么会有兼容问题，查看文档发现webpack<=4 normalModuleLoader已经废弃，也就是说webpack<=4可以使用normalModuleLoader钩子来访问loader，webpack5就要使用NormalModule.getCompilationHooks(compilation).loader来访问loader。
[plugin-webpack4.js](https://github.com/vuejs/vue-loader/blob/master/lib/plugin-webpack4.js)
[plugin-webpack5.js](https://github.com/vuejs/vue-loader/blob/master/lib/plugin-webpack5.js)

两个plugin的代码量都不多，我们就来读一下plugin-webpack5.js的代码，看下这个plugin究竟做了什么事。[官网](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)上也说了很清楚，vueLoaderPlugin的职责是将你定义过的其它规则复制并应用到.vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到.vue 文件里的\<script\>块。一个vue文件包含template模版，script和style等3个部分，编译的时候需要将他们区分开，并且把loader应用到各个部分，因此需要这个plugin来做这件事。

**写一个自定义plugin**

在写自定义plugin之前，我们要了解webpack打包过程，大概有如下几个步骤
- 读取配置
- 生成compiler(编译器)对象
- 初始化
- run/watch
- 生成compilation(构建包)
- emit:文件内容准备完成，准备生成文件
- afterEmit：文件已经写入磁盘完成
- done: 完成编译
在compilation生成之后，emit阶段之前我们都可以操作源码模块，compilation也提供了很多对外的钩子，以便开发者能更好的操作模块。  
弄清楚大概的打包过程之后，我们就知道怎么使用webpack plugin compiler钩子和compilation钩子的使用时机了。

[webpack-demo-plugin](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-plugin)

上面的demo我先把构建之后的包输出到一个json文件中，以便我们查看构建之后的模块是什么结构还有里面有什么内容。通过构建完成之后的包可以发现我们的js代码已经完全转化成ast的形式，我们可以在[astexplorer](https://astexplorer.net/)网站上测试我们的js代码。

## 参考
- [webpack之loader执行顺序及原理](https://www.jianshu.com/p/eb268cb0f913)
- [webpack loader](https://webpack.docschina.org/concepts/loaders/#inline)
- [webpack Loader Interface](https://webpack.docschina.org/api/loaders/)
- [webpack loader 源码、原理、实践](https://juejin.cn/post/6998416819497205774)
