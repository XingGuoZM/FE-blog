## 起因
最近遇到系统优化的需求，webpack作为模块打包工具可以帮助我们。作为webpack的小白，该如何系统的学习呢？首先当然是学会webpack的基本使用，能做出些效果。我们先从最简单的构建目标开始，打包一个helloworld应用程序。[源码地址]()

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
