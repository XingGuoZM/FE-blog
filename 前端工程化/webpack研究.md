### webpack是什么？
webpack是应用程序构建器,将我们的项目中的模块合成一个js文件，供页面调用。模块打包器，在webpack的世界里，万物皆模块。

### 工作原理与构建流程
webpack打包过程大致分为三个阶段
1. 初始化阶段
2. 编译阶段
3. 输出阶段

webpack.config.js打包配置，

entry定义需要被打包的源文件
output配置打包后的目标文件，定义一个对象，可自定义文件名和路径
module配置打包的loader，loader让webpack能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。
plugins配置

常用webpack插件汇总
1. html-webpack-plugin
2. clean-webpack-plugin

### webpack作用
1. 按需加载（懒加载）
2. 热替换（热加载）
3. 代码分离（公共依赖包提取）
4. tree shaking（未引用代码移除）
5. loader（文件转换）和plugin（打包插件）
6. import中绝对路径及webpack配置

### 打包提速
1. 约束入口
2. uglifyjs-webpack-plugin开启多线程打包
3. happypack加速多线程loader
4. 使用dll拆分代码
5. 约束hash

### 打包优化

### 问题汇总(FAQ)
- loader和plugin有什么不同?
```
loader: 它是一个转换器，只专注于转换文件这一个领域，完成压缩、打包、语言编译，它仅仅是为了打包，并且运行在打包之前。
plugin是一个扩展器，它丰富了 webpack 本身，为其进行了一些其他功能的扩展，它不局限于打包，资源的加载，还包括其他的功能，所以它是在整个编译周期都起作用。
```
- webpack能做哪些优化？

## 参考
- [webpack中文网](https://www.webpackjs.com/)
- [脑阔疼的webpack按需加载](https://juejin.cn/post/6844903718387875847)
- [webpack增量打包多页应用](https://juejin.cn/post/6844903553127940110)
- [import绝对路径及webpack中配置](https://www.geekjc.com/post/5b6a767ab840f24124d6ffc7)
- [Webpack打包流程构建原理](https://github.com/impeiran/Blog/issues/6)