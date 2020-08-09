
仓库地址：[rax-helloworld](https://github.com/XingGuoZM/native-module/tree/master/rax-helloworld) 
# 简单介绍一下rax

rax即是一个开发兼容多端（包括web，mobile web，小程序以及android或ios等app页面）的前端应用框架。

# 第一个rax应用程序：rax-helloworld  
## 环境
- macOS 10.15.1  
- node 12.10.0   

其他环境基本下面操作相同。
## 创建  
```
npm init rax rax-helloworld
```
## 脚手架目录结构及解释   

![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200809212224316-1187943022.png)

由package.json可以看到构建脚本插件名叫@alib/build-scripts，rax基本上依赖于这个脚本来启动和构建打包。

pages和components目录下存放各个模块页面

document目录下存放的主要是单页应用的html结构  

app.js和app.json主要是负责页面启动项配置，包含路由等  

build.json主要构建相关的配置，可以配置一些第三方插件辅助构建应用程序  

## 启动  
```
cd rax-helloworld

npm run start
```
## 打包  
```
npm run build
```
## 效果  
首先我们要有一个二维码生成工具[草料二维码](https://cli.im/)，当然也可以使用chrome扩展插件生成二维码  
然后我们可以通过手机淘宝扫码查看效果

### chrome下效果  

![第一个rax应用程序](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200809212315362-2130680652.png)

## 参考  
- [rax官方文档](https://rax.js.org/docs/guide/getting-start)  
- [rax-helloworld](https://github.com/XingGuoZM/native-module/tree/master/rax-helloworld)  