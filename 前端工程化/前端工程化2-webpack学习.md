## 起因
最近遇到系统优化的需求，webpack作为模块打包工具可以帮助我们。作为webpack的小白，该如何系统的学习呢？首先当然是学会webpack的基本使用，能做出些效果。我们先从最简单的构建目标开始，打包一个helloworld应用程序。[源码地址](https://github.com/XingGuoZM/blog/tree/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack-demo-helloworld)

## 使用webpack构建一个helloworld程序
新建一个目录webpack-demo-helloworld,切至该目录下
```
npm init -y
npm install --save webpack webpack-cli webpack-dev-server
```
再安装一个html的插件 html-webpack-plugin
```
npm install --save html-webpack-plugin
```

webpack项目基本的结构
- src
  - index.js
- .gitignore
- package.json
- webpack.config.js

index.js里的代码逻辑为，创建一个div，div的innerHTML设置为"hello world"，然后将这个div添加至body下。.gitignore文件是设置需要忽略提交的目录或文件。package.json是项目的清单，其中罗列了项目的名称、版本、依赖包以及一些命令等等。webpack.config.js是webpack应用的配置文件，该文件不是必须的，简单的配置可以直接写到命令当中。如果项目复杂度较高，那么webpack.config.js可以帮助开发者梳理webpack的各项配置，同时也能灵活的进行修改。webpack.config.js文件主要包含入口配置，输出配置，loader和插件配置等等。

最终展现出的效果，通过“npm run start”命令可以启动项目，在浏览器页面中会打印出"hello world"。

## webpack的组成部分
webpack作为一个打包工具，它的职责聚焦在js模块打包，对外开放loader和plugin来丰富其生态圈。webpack提供了命令行工具webpack-cli和本地web服务器webpack-dev-server,这两个工具可以提升我们的开发体验和提高调试效率。
