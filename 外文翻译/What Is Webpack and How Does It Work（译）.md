原文地址: [What Is Webpack and How Does It Work](https://www.ma-no.org/en/programming/what-is-webpack-and-how-does-it-work)

WebPack基本上是模块或模块捆绑器的包装器，但是由于其组件之一即插件，可以用作任务执行器，即我们可以执行各种任务，例如移动目录，清理等。

要了解什么是Webpack，让我们分析一下此图。

![](https://www.ma-no.org/cache/galleries/contents-1806/webpack-how-it-works.jpeg)

## Webpack概念
为了理解webpack的概念，我们需要解释阐述一些东西，例如专业术语

- Entry。入口点是模块，webpack使用该模块开始构建其内部依赖关系图。从那里，它确定入口点所依赖的其他模块和库，并将它们包括在图中，直到没有依赖性为止。默认情况下，entry属性设置为./src/index.js，但我们可以在webpack配置文件中指定一个或多个模块。

- Output。 output属性指定webpack在何处发出分发包以及该文件使用的名称。对于主要的打包好的的包，此属性的默认值为./dist/main.js；对于其他生成的文件，此属性的默认值为./dist。我们还可以根据需要在配置中指定不同的值。

- Loaders。 Webpack默认仅理解JavaScript和JSON文件。为了处理其他类型的文件，webpack使用加载程序。加载程序会转换非JavaScript模块的源代码，使我们能够在将这些文件添加到依赖关系图之前对其进行预处理。使用加载程序，我们甚至可以直接从我们的JavaScript模块导入CSS文件。

- Plugins。插件用于执行加载程序无法执行的任务。他们为我们提供了有关资产管理，捆绑包最小化和优化等多种解决方案。

- Mode。通常，在开发应用程序时，我们使用两种类型的源代码-一种用于开发版本，另一种用于生产版本。 Webpack允许我们通过将mode参数更改为development，production或none来设置要生产的产品。这允许webpack使用与每个环境相对应的内置优化。默认值为production。none模式表示将不使用任何默认优化选项。

在Web应用程序中，我们通常有许多具有依赖性的模块。

例如，我们可以有一个JS模块，该模块将依赖于其他.js模块，它们具有不同格式的图像，例如JPG或PNG。 我们可以拥有CSS文件，也可以使用某些CSS预处理器，例如SASS，Less或Stylus。

 
最后，我们有许多这样的模块以及每个模块的一系列依赖关系。

Webpack负责处理所有这些模块，并将它们转换为浏览器可以理解的资源，例如JS文件，CSS，图像，视频等。

Webpack真正完成了整个打包过程。

## 模块系统
在谈论模块时，我们还必须了解使用了哪些模块系统。 在浏览器中，没有预定义的模块系统，您必须使用一些不同的模块规范。

根据所使用的模块，必须使用特定的库将这些模块转换为浏览器最终可以理解的模块。

最常见的是：

#### AMD,  即asynchronous definition of modules.


#### CommonJS, 被使用在NodeJS中的一种.


#### ES2015.

以下是一个在AMD中如何定义一个模块的示例
 ```
// In mymodule.js
define(‘myModule’, [‘dep1’, ‘dep2’], (dep1, dep2) => {
return
function(){}
})
// In app.js
define(‘app’, [‘myModule’], myModule => {
>// stuff…
});
 ```

一些正在定义的模块具有一些依赖关系，这些依赖关系将异步加载，稍后我们将需要刚刚创建的那个模块。

以下是一个在CommonJS中一个模块定义的示例 
An example of how a module is defined in CommonJS is the following:
```
// In mymodule.js  
exports.calc = (a, b) => a + b;  
// In app.js  
const myModule = require(‘/path/to/myModule’);
console.log(myModule.calc(1, 2));
```
在这里，我们导出一系列模块，然后需要它们。 在ES2015中，定义模块的方法如下：
```
// In mymodule.js
exports const calc = (a, b) => a + b;
// In app.js
import { calc } from ‘/path/to/myModule’;
console.log(calc(1, 2));
```

在这里，我们导入一个函数，在这种情况下为calc，然后我们导入它就可以使用它了。 这些模块系统很多，因为在Web应用程序中，每个项目都根据要实现的项目使用了自己的模块，因此Webpack都支持这些模块系统，因此我们可以使用其中的任何一个或混合使用几个来开发应用程序 。