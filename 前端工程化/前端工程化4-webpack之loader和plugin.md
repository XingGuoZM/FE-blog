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
我们说loader就是一个js函数，可以操作js字符串形式的函数，那么plugin就是一个类，一个可以[webpack-demo-plugin](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-plugin)。plugin会深入到代码编译和构建的各个阶段，

**plugin执行原理**
plugin对外提供了两个主要的钩子，一个是[compiler](https://webpack.docschina.org/api/compiler-hooks/)，,另一个是[compilation](https://webpack.docschina.org/api/compilation-hooks/)。

**VueLoaderPlugin研究**
VueLoaderPlugin是有两个plugin分别兼容webpack的4、5两个版本。
[plugin-webpack4.js](https://github.com/vuejs/vue-loader/blob/master/lib/plugin-webpack4.js)
[plugin-webpack5.js](https://github.com/vuejs/vue-loader/blob/master/lib/plugin-webpack5.js)

```js
const qs = require('querystring')
const id = 'vue-loader-plugin'
const NS = 'vue-loader'
const BasicEffectRulePlugin = require('webpack/lib/rules/BasicEffectRulePlugin')
const BasicMatcherRulePlugin = require('webpack/lib/rules/BasicMatcherRulePlugin')
const RuleSetCompiler = require('webpack/lib/rules/RuleSetCompiler')
const UseEffectRulePlugin = require('webpack/lib/rules/UseEffectRulePlugin')

const objectMatcherRulePlugins = []
try {
  const ObjectMatcherRulePlugin = require('webpack/lib/rules/ObjectMatcherRulePlugin')
  objectMatcherRulePlugins.push(
    new ObjectMatcherRulePlugin('assert', 'assertions'),
    new ObjectMatcherRulePlugin('descriptionData')
  )
} catch (e) {
  const DescriptionDataMatcherRulePlugin = require('webpack/lib/rules/DescriptionDataMatcherRulePlugin')
  objectMatcherRulePlugins.push(new DescriptionDataMatcherRulePlugin())
}

const ruleSetCompiler = new RuleSetCompiler([
  new BasicMatcherRulePlugin('test', 'resource'),
  new BasicMatcherRulePlugin('mimetype'),
  new BasicMatcherRulePlugin('dependency'),
  new BasicMatcherRulePlugin('include', 'resource'),
  new BasicMatcherRulePlugin('exclude', 'resource', true),
  new BasicMatcherRulePlugin('conditions'),
  new BasicMatcherRulePlugin('resource'),
  new BasicMatcherRulePlugin('resourceQuery'),
  new BasicMatcherRulePlugin('resourceFragment'),
  new BasicMatcherRulePlugin('realResource'),
  new BasicMatcherRulePlugin('issuer'),
  new BasicMatcherRulePlugin('compiler'),
  ...objectMatcherRulePlugins,
  new BasicEffectRulePlugin('type'),
  new BasicEffectRulePlugin('sideEffects'),
  new BasicEffectRulePlugin('parser'),
  new BasicEffectRulePlugin('resolve'),
  new BasicEffectRulePlugin('generator'),
  new UseEffectRulePlugin()
])

class VueLoaderPlugin {
  apply (compiler) {
    const normalModule = compiler.webpack
      ? compiler.webpack.NormalModule
      : require('webpack/lib/NormalModule')
    // add NS marker so that the loader can detect and report missing plugin
    compiler.hooks.compilation.tap(id, compilation => {
      const normalModuleLoader = normalModule.getCompilationHooks(compilation).loader
      normalModuleLoader.tap(id, loaderContext => {
        loaderContext[NS] = true
      })
    })

    const rules = compiler.options.module.rules
    let rawVueRules
    let vueRules = []

    for (const rawRule of rules) {
      // skip rules with 'enforce'. eg. rule for eslint-loader
      if (rawRule.enforce) {
        continue
      }
      // skip the `include` check when locating the vue rule
      const clonedRawRule = Object.assign({}, rawRule)
      delete clonedRawRule.include

      const ruleSet = ruleSetCompiler.compile([{
        rules: [clonedRawRule]
      }])
      vueRules = ruleSet.exec({
        resource: 'foo.vue'
      })

      if (!vueRules.length) {
        vueRules = ruleSet.exec({
          resource: 'foo.vue.html'
        })
      }
      if (vueRules.length > 0) {
        if (rawRule.oneOf) {
          throw new Error(
            `[VueLoaderPlugin Error] vue-loader 15 currently does not support vue rules with oneOf.`
          )
        }
        rawVueRules = rawRule
        break
      }
    }
    if (!vueRules.length) {
      throw new Error(
        `[VueLoaderPlugin Error] No matching rule for .vue files found.\n` +
        `Make sure there is at least one root-level rule that matches .vue or .vue.html files.`
      )
    }

    // get the normalized "use" for vue files
    const vueUse = vueRules.filter(rule => rule.type === 'use').map(rule => rule.value)

    // get vue-loader options
    const vueLoaderUseIndex = vueUse.findIndex(u => {
      return /^vue-loader|(\/|\\|@)vue-loader/.test(u.loader)
    })

    if (vueLoaderUseIndex < 0) {
      throw new Error(
        `[VueLoaderPlugin Error] No matching use for vue-loader is found.\n` +
        `Make sure the rule matching .vue files include vue-loader in its use.`
      )
    }

    // make sure vue-loader options has a known ident so that we can share
    // options by reference in the template-loader by using a ref query like
    // template-loader??vue-loader-options
    const vueLoaderUse = vueUse[vueLoaderUseIndex]
    vueLoaderUse.ident = 'vue-loader-options'
    vueLoaderUse.options = vueLoaderUse.options || {}

    // for each user rule (expect the vue rule), create a cloned rule
    // that targets the corresponding language blocks in *.vue files.
    const refs = new Map()
    const clonedRules = rules
      .filter(r => r !== rawVueRules)
      .map((rawRule) => cloneRule(rawRule, refs))

    // fix conflict with config.loader and config.options when using config.use
    delete rawVueRules.loader
    delete rawVueRules.options
    rawVueRules.use = vueUse

    // global pitcher (responsible for injecting template compiler loader & CSS
    // post loader)
    const pitcher = {
      loader: require.resolve('./loaders/pitcher'),
      resourceQuery: query => {
        if (!query) { return false }
        const parsed = qs.parse(query.slice(1))
        return parsed.vue != null
      },
      options: {
        cacheDirectory: vueLoaderUse.options.cacheDirectory,
        cacheIdentifier: vueLoaderUse.options.cacheIdentifier
      }
    }

    // replace original rules
    compiler.options.module.rules = [
      pitcher,
      ...clonedRules,
      ...rules
    ]
  }
}

let uid = 0
function cloneRule (rawRule, refs) {
  const rules = ruleSetCompiler.compileRules(`clonedRuleSet-${++uid}`, [{
    rules: [rawRule]
  }], refs)
  let currentResource

  const conditions = rules[0].rules
    .map(rule => rule.conditions)
    // shallow flat
    .reduce((prev, next) => prev.concat(next), [])

  // do not process rule with enforce
  if (!rawRule.enforce) {
    const ruleUse = rules[0].rules
      .map(rule => rule.effects
        .filter(effect => effect.type === 'use')
        .map(effect => effect.value)
      )
      // shallow flat
      .reduce((prev, next) => prev.concat(next), [])

    // fix conflict with config.loader and config.options when using config.use
    delete rawRule.loader
    delete rawRule.options
    rawRule.use = ruleUse
  }

  const res = Object.assign({}, rawRule, {
    resource: resources => {
      currentResource = resources
      return true
    },
    resourceQuery: query => {
      if (!query) { return false }
      const parsed = qs.parse(query.slice(1))
      if (parsed.vue == null) {
        return false
      }
      if (!conditions) {
        return false
      }
      const fakeResourcePath = `${currentResource}.${parsed.lang}`
      for (const condition of conditions) {
        // add support for resourceQuery
        const request = condition.property === 'resourceQuery' ? query : fakeResourcePath
        if (condition && !condition.fn(request)) {
          return false
        }
      }
      return true
    }
  })

  delete res.test

  if (rawRule.rules) {
    res.rules = rawRule.rules.map(rule => cloneRule(rule, refs))
  }

  if (rawRule.oneOf) {
    res.oneOf = rawRule.oneOf.map(rule => cloneRule(rule, refs))
  }

  return res
}

VueLoaderPlugin.NS = NS
module.exports = VueLoaderPlugin
```


## 参考
- [webpack之loader执行顺序及原理](https://www.jianshu.com/p/eb268cb0f913)
- [webpack loader](https://webpack.docschina.org/concepts/loaders/#inline)
- [webpack Loader Interface](https://webpack.docschina.org/api/loaders/)
- [webpack loader 源码、原理、实践](https://juejin.cn/post/6998416819497205774)

