## 写在前面
弄清楚了tapable，我们基本上对webpack的plugin没有什么问题了，下面我们将webpack的plugin和loader组合起来看一下。我们主要从以下几个方面来深入研究。照着网上的资料写几个例子（模仿），然后大致了解loader是什么（作用），它是怎么执行的（原理）以及找一个比较有代表性的loader来看看它的代码（源码），最后我们可以自己写一个自定义的loader（学以致用）。plugin也可以套用这样的模式来进行学习。参考了官网给出的一些例子之后[plugin](https://webpack.docschina.org/plugins/)和[loader](https://webpack.docschina.org/loaders/)之后
，我开了两个工程[webpack-demo-loader](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-loader)和[webpack-demo-plugin](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-plugin)来写一些示例来深入研究下webpack的loader和plugin

## loader
loader即加载器，由于webpack只能打包js模块，如果要打包其他文件，如jsx、vue、css等文件，必须要将其转化成js模块形式。而这个转化的中间工具就是loader，我们可以理解为loader即文件的预处理。例如我们要打包css文件，我们就要使用css-loader和style-loader，要打包图片文件我们要使用file-loader或者url-loader。我们常用的loader有如下几个：
style-loader、css-loader、vue-loader、babel-loader、ts-loader、file-loader、url-loader等

**loader执行原理**
为了研究loader的执行原理，我们建了一个webpack应用实例来专门探索loader。[webpack-demo-loader](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-loader)，通过上述的例子我们可以了解到如何在项目中配置使用loader。通过使用上述几个常用的loader我们可以大致窥探出webpack执行loader的执行原理，

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

**webpack是如何管理loaders的？它们的执行顺序如何？**
在看webpack如何管理loaders之前，我们还要解决一个问题，如何阅读webpack的源码，webpack是一个庞大的工程，怎么找到管理loaders的逻辑代码呢？可以看一下[webpack](https://github.com/webpack/webpack)目录。在众多目录下，我们该从何看起，源码一般存在于lib下，但是我们点开lib发现文件太多了，这么看也根本无从下手。之后我们又想到了一个办法，我们先看看如何使用loader，仓库也给出了很多example，我们先从examples目录下手，然后再一步一步往回推。在loader目录下我们可以看到如下文件


lib/config/normalization文件专门解析webpack配置，

## plugin
上一节我们知道了webpack的plugin是tapable，本质上是一个订阅-发布模式,先把插件写好注册到webpack.config.js文件中，在编译源代码的时候再调用它。我们呢常用的plugin有如下几个：
webpack-bundle-analyzer、CommonsChunkPlugin、DllPlugin、ExtractTextWebpackPlugin、HtmlWebpackPlugin、HotModuleReplacementPlugin等

[webpack-demo-plugin](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-plugin)

**代码分割和按需加载**



## 参考
- [webpack之loader执行顺序及原理](https://www.jianshu.com/p/eb268cb0f913)
- [webpack loader](https://webpack.docschina.org/concepts/loaders/#inline)
- [webpack loader 源码、原理、实践](https://juejin.cn/post/6998416819497205774)
