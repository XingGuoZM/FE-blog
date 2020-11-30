### webpack是什么？
webpack是应用程序构建器


### 工作原理
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

## 参考
- [webpack中文网](https://www.webpackjs.com/)
- [脑阔疼的webpack按需加载](https://juejin.cn/post/6844903718387875847)