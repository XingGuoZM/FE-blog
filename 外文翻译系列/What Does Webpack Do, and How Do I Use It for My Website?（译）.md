原文地址：[What Does Webpack Do, and How Do I Use It for My Website?](https://www.cloudsavvyit.com/1183/what-does-webpack-do-and-how-do-i-use-it-for-my-website/)


![](https://www.cloudsavvyit.com/thumbcache/0/0/d8074ecdca076d29d67101de0745ec9f/p/uploads/2019/07/42bf547d.png)

Webpack是一个实用插件，它可以将Javascript文件打包在一起。这样可以使你的应用程序更具有组织性和生产力，这也允许你使用预处理语言，像SASS和TypeScript。

## Webpack的用途什么？
想象一下，你正在使用许许多多自定义Javascript文件为一个网站工作。您参与这个项目已有一段时间了，事情很快就变得一发不可收拾。你的index.html有20个来源不同的&lt;script&gt; 标签。一些是你自己的，一些是引入的依赖资源。管理这些内容很麻烦，特别是由于大多数浏览器处理JavaScript加载的方式。 如何确保在加载jQuery后运行代码？ 通常，您实际上只是将jQuery放在HTML的第一位，但是要处理这许多差异是很痛苦的。

还有性能问题。 每个脚本文件都需要单独加载。 更糟糕的是，大多数JavaScript文件的加载都是阻塞渲染的，这意味着您的网站在下载、解析和运行JavaScript完成之前甚至不会显示。 您可以在Chrome开发人员工具的“Network”标签下看到正在执行的操作，其中显示了已发送的请求。 您提出的请求越多，所有请求完成的时间就越长。

![Chrome's Dev Tools shows requests being sent out](https://www.cloudsavvyit.com/thumbcache/0/0/6ecc3c3f41c257f093f40504e4575e22/p/uploads/2019/08/23e01416.png)

这里的解决方案是打包。 无需链接外部资源，而是将它们全部下载到本地，并将其作为代码的依赖项包含在内。 Webpack将所有内容打包到一个main.js文件中，该文件包含您的站点所需的一切。 然后，您只需添加一个JavaScript文件，摆脱了其他 &lt;script&gt; 标签。

这使您可以将代码拆分为多个文件，而不必担心并发问题，名称空间问题或站点加载时间。 Webpack还压缩并最小化生产代码以节省更多空间。

## Webpack可以帮助你组织你的站点资源
简而言之，[Webpack](https://github.com/webpack/webpack)允许您使用require()函数将一个JavaScript文件包含在另一个JavaScript文件中。 任何浏览器均不支持此功能，因为在发送给客户端之前，它需要由诸如Webpack，[Gulp](https://gulpjs.com/)或[Browserify](http://browserify.org)之类的JavaScript打包插件的帮助。 这很简单，例如从npm导入依赖项：
```
var axios = require('axios') //node_modules/axios/index.js
```
或更复杂的东西，例如在JavaScript中使用图片：

```
<img src={ require('../../assets/logo.png') } />
```
无论哪种情况，require函数中的字符串都将传递到Webpack加载器。 这就是定义Webpack处理文件的方式。 例如，我们可以使用文件加载器来处理图像：
```
{
  test: /\.(png|jpe?g|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {},
    },
  ],
}
```
如果测试中的正则表达式与文件名匹配，则使用加载程序。 在这种情况下，文件加载器会根据您的配置根据文件的最终位置生成URL。 现在，当我们构建文件时，img标签看起来更像：
```
<img src={'https://cdn.yourwebsite.com/img/341234/logo.png'} />
```

这样您就可以拥有一个井井有条的文件结构，因为您不再需要担心文件位置并且也不必担心添加更多&lt;script&gt; and &lt;link&gt;的标签。拥有如下所示的项目并不少见，尤其是在像React这样的框架中：
```
src/
  |_styles/
  |  |_global.css
  |  |_darkTheme.css
  |_components/
  |  |_styles/
  |  |  |_buttonStyles.css
  |  |_button.js
  |_containers/
  |  |_homepage.js
  |  |_users.js
  |_index.js
  |_app.js
  |_package.json
```

与拥有2000行长的index.js相反。 从长远来看，这使开发变得更加容易，并且在开始过渡到基于Webpack的环境时花了一点时间。

## Webpack允许你使用预处理器
因为Webpack所做的只是将文件处理传递给加载程序，所以在这些加载程序中可能发生很多变化。 您最终得到了所谓的预处理器，可以为您使用的语言添加特性。

例如，[SASS](https://sass-lang.com/)是CSS的预处理器，它增加了对变量，嵌套，mix ins，导入和继承以及[其他很多东西](https： //sass-lang.com/guide)。 它很棒，最好的部分是它与常规CSS完全兼容，因此您不必担心浏览器兼容。 最终用户永远不会知道您是使用SASS来创建网站的，因为当您使用Webpack打包的时候，会将SASS代码转换为CSS代码。

另一种有用的预处理语言是Microsoft的[TypeScript](https://www.typescriptlang.org/index.html)。 TypeScript是JavaScript的语法超集（意味着所有JavaScript代码都是有效的TypeScript代码），并且它添加了对严格类型的支持，从而将JavaScript变成了像C变体这样的强类型语言。 它实际上是一种使用tsc实用程序的编译语言，但ts-loader Webpack扩展增加了对该语言的支持。 加载程序会将您的.ts文件编译为.js文件。

如果您已经对香草CSS和JavaScript满意，则不需要使用任何预处理程序，但是对于那些希望使用下一代香草语法的处理器，我们建议您至少安装[Babel](https://babeljs.io/)以支持[ES2015及更高版本](https://www.cloudsavvyit.com/?p=1121)。 这将允许您使用ES2015功能，例如import和箭头函数。

## 如何安装Webpack
首先，您需要安装Node，以便可以在浏览器之外运行JavaScript。 然后，您可以从Node Package Manager（npm）安装Webpack。 从项目文件夹的根目录运行以下命令：
```
npm init -y
npm install webpack --save-dev
npm install webpack-cli --save-dev
```
这将创建一个新的package.json来跟踪您已安装的软件包。 您应该看到一个名为node_modules的新文件夹。

Webpack现在已安装，您可以使用以下命令运行它：
```
npx webpack
```
假设您项目的入口点是./src/index，并且您希望打包的文件进入dist/main.js。 如果您想以其他方式配置设置或配置加载程序，则需要制作一个配置文件。 有很多选项供您使用，并且设置会因您使用Webpack的用途而异，但是大多数情况下，配置文件会以webpack.config.js的形式放置在项目的根目录下。 您需要使用--config标志加载此文件，但可以通过在package.json中指定脚本来自动执行此操作：
```
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```
现在，你可以在任何时候执行
```
npm run build
```
Webpack将运行并打包您的项目。

如果您不想在每次更改后都运行“npm run build”，则应安装webpack-dev-server，该服务器将在进行更改后自动重新构建。

继续阅读

› [What is A/B Testing and How Can You Use It?](https://www.cloudsavvyit.com/1070/what-is-a-b-testing-and-how-can-you-use-it/)

› [What Can Analytics Do for Your Website?](https://www.cloudsavvyit.com/339/what-can-analytics-do-for-your-website/)

› [What is a Log Management Tool, and Should You Use One?](https://www.cloudsavvyit.com/400/what-is-a-log-management-tool-and-should-you-use-one/)

› [A CDN Can Speed Up Your Website. Here’s What You Need to Know!](https://www.cloudsavvyit.com/784/a-cdn-can-speed-up-your-website-heres-what-you-need-to-know/)

› [What is Git Rebase and How Is it Different than Merging?](https://www.cloudsavvyit.com/852/what-is-git-rebase-and-how-is-it-different-than-merging/)